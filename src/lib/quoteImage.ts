export const IMAGE_FORMATS = {
  feed: { label: 'Feed 1:1', width: 1080, height: 1080 },
  portrait: { label: 'Portrait 4:5', width: 1080, height: 1350 },
  story: { label: 'Story 9:16', width: 1080, height: 1920 },
} as const;

export type ImageFormat = keyof typeof IMAGE_FORMATS;
export type TextAlign = 'left' | 'center' | 'right';
export type TextEffect = 'none' | 'shadow' | 'outline' | 'box';

export type ImageBackground =
  | { kind: 'gradient'; colors: readonly string[] }
  | { kind: 'image'; image: HTMLImageElement };

export interface TextPosition {
  x: number;
  y: number;
}

export interface TextBlock {
  width: number;
  height: number;
}

export interface QuoteImageOptions {
  text: string;
  author: string;
  background: ImageBackground;
  brightness: number;
  tintColor: string;
  tintStrength: number;
  fontFamily: string;
  fontSize: number;
  textWidth: number;
  textColor: string;
  textEffect: TextEffect;
  effectStrength: number;
  align: TextAlign;
  position: TextPosition;
}

const SAFE_MARGIN = 60;
const LINE_HEIGHT = 1.35;

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let line = '';

  for (const word of text.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function drawBackground(ctx: CanvasRenderingContext2D, background: ImageBackground) {
  const { width, height } = ctx.canvas;

  if (background.kind === 'gradient') {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    background.colors.forEach((color, index) => {
      gradient.addColorStop(index / (background.colors.length - 1), color);
    });
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    return;
  }

  // Scale the photo to cover the canvas and crop the overflow evenly
  const { image } = background;
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  ctx.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
}

// Layers instead of ctx.filter, which Safari does not reliably support.
// Negative brightness darkens with black, positive lightens with white.
function drawOverlays(
  ctx: CanvasRenderingContext2D,
  { brightness, tintColor, tintStrength }: QuoteImageOptions
) {
  const { width, height } = ctx.canvas;

  ctx.save();

  if (tintStrength > 0) {
    ctx.globalAlpha = tintStrength;
    ctx.fillStyle = tintColor;
    ctx.fillRect(0, 0, width, height);
  }

  if (brightness !== 0) {
    ctx.globalAlpha = Math.abs(brightness);
    ctx.fillStyle = brightness < 0 ? '#000000' : '#ffffff';
    ctx.fillRect(0, 0, width, height);
  }

  ctx.restore();
}

// Effects need to contrast with the text, so dark text gets a light effect
function effectRgb(textColor: string): string {
  const value = parseInt(textColor.slice(1), 16);
  const luminance = 0.299 * (value >> 16) + 0.587 * ((value >> 8) & 255) + 0.114 * (value & 255);
  return luminance < 128 ? '255, 255, 255' : '0, 0, 0';
}

function clampAxis(value: number, blockSize: number, canvasSize: number): number {
  const min = (blockSize / 2 + SAFE_MARGIN) / canvasSize;
  const max = 1 - min;
  return min > max ? 0.5 : Math.min(max, Math.max(min, value));
}

// Keeps the text block inside the canvas, away from the edges
export function clampPosition(
  position: TextPosition,
  block: TextBlock,
  canvas: { width: number; height: number }
): TextPosition {
  return {
    x: clampAxis(position.x, block.width, canvas.width),
    y: clampAxis(position.y, block.height, canvas.height),
  };
}

// Draws the full image and returns the size of the text block for drag handling
export function drawQuoteImage(ctx: CanvasRenderingContext2D, options: QuoteImageOptions): TextBlock {
  const { width, height } = ctx.canvas;
  const { fontFamily, fontSize, align, textColor, textEffect, effectStrength } = options;

  drawBackground(ctx, options.background);
  drawOverlays(ctx, options);

  const blockWidth = width * options.textWidth;
  const authorSize = Math.max(26, Math.round(fontSize * 0.55));
  const authorGap = fontSize * 0.8;
  const quoteFont = `500 ${fontSize}px ${fontFamily}`;

  ctx.font = quoteFont;
  const lines = wrapText(ctx, `“${options.text}”`, blockWidth);
  const lineHeight = fontSize * LINE_HEIGHT;
  const block = {
    width: blockWidth,
    height: lines.length * lineHeight + authorGap + authorSize * LINE_HEIGHT,
  };

  const position = clampPosition(options.position, block, ctx.canvas);
  const centerX = position.x * width;
  const top = position.y * height - block.height / 2;
  const anchorX =
    align === 'left'
      ? centerX - blockWidth / 2
      : align === 'right'
        ? centerX + blockWidth / 2
        : centerX;

  const authorText = `— ${options.author}`;
  const authorFont = `400 ${authorSize}px ${fontFamily}`;
  const effectColor = `rgba(${effectRgb(textColor)}, ${effectStrength})`;

  ctx.save();
  ctx.textAlign = align;
  ctx.textBaseline = 'top';
  ctx.lineJoin = 'round';

  if (textEffect === 'box') {
    // Hug the widest line rather than the full text box
    const widestQuote = Math.max(...lines.map((line) => ctx.measureText(line).width));
    ctx.font = authorFont;
    const contentWidth = Math.max(widestQuote, ctx.measureText(authorText).width);
    const padding = fontSize * 0.6;
    const contentLeft =
      align === 'left'
        ? anchorX
        : align === 'right'
          ? anchorX - contentWidth
          : anchorX - contentWidth / 2;

    ctx.fillStyle = effectColor;
    ctx.beginPath();
    ctx.roundRect(
      contentLeft - padding,
      top - padding,
      contentWidth + padding * 2,
      block.height + padding * 2,
      padding / 2
    );
    ctx.fill();
  }

  if (textEffect === 'shadow') {
    ctx.shadowColor = effectColor;
    ctx.shadowBlur = 8 + 32 * effectStrength;
    ctx.shadowOffsetY = 2 + 6 * effectStrength;
  }

  const paintText = (text: string, y: number, size: number) => {
    if (textEffect === 'outline') {
      ctx.strokeStyle = effectColor;
      ctx.lineWidth = Math.max(2, size * 0.2 * effectStrength);
      ctx.strokeText(text, anchorX, y);
    }
    ctx.fillStyle = textColor;
    ctx.fillText(text, anchorX, y);
  };

  ctx.font = quoteFont;
  lines.forEach((line, index) => {
    paintText(line, top + index * lineHeight, fontSize);
  });

  ctx.font = authorFont;
  paintText(authorText, top + lines.length * lineHeight + authorGap, authorSize);
  ctx.restore();

  return block;
}

export function defaultFontSize(text: string): number {
  if (text.length < 80) return 72;
  if (text.length < 160) return 60;
  if (text.length < 280) return 48;
  return 38;
}
