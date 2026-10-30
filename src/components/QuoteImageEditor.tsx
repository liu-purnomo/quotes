'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Crosshair,
  Download,
  ImagePlus,
  Loader2,
  Search,
  Share2,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent, PointerEvent } from 'react';
import type { Quote } from '@/data/quotes';
import { deleteLocalPhoto, listLocalPhotos, saveLocalPhoto } from '@/lib/localPhotos';
import type { LocalPhoto } from '@/lib/localPhotos';
import {
  IMAGE_FORMATS,
  clampPosition,
  defaultFontSize,
  drawQuoteImage,
} from '@/lib/quoteImage';
import type {
  ImageBackground,
  ImageFormat,
  TextAlign,
  TextBlock,
  TextEffect,
  TextPosition,
} from '@/lib/quoteImage';
import type { StockPhoto } from '@/lib/stockPhotos';

const GRADIENTS = [
  ['#171717', '#292524', '#171717'],
  ['#0f172a', '#1e3a8a', '#0f172a'],
  ['#111827', '#064e3b', '#111827'],
  ['#7c2d12', '#7f1d1d', '#7c2d12'],
  ['#312e81', '#581c87', '#831843'],
] as const;

const TEXT_COLORS = ['#ffffff', '#fef3c7', '#a5f3fc', '#111827'];
const TINT_COLORS = ['#0ea5e9', '#7c3aed', '#db2777', '#dc2626', '#ea580c', '#16a34a'];
const DEFAULT_TINT_STRENGTH = 0.35;

const ALIGNMENTS: { value: TextAlign; label: string; icon: typeof AlignLeft }[] = [
  { value: 'left', label: 'Rata kiri', icon: AlignLeft },
  { value: 'center', label: 'Rata tengah', icon: AlignCenter },
  { value: 'right', label: 'Rata kanan', icon: AlignRight },
];

const FONTS = [
  { value: 'sans', label: 'Sans' },
  { value: 'serif', label: 'Serif' },
] as const;

type FontChoice = (typeof FONTS)[number]['value'];

const TEXT_EFFECTS: { value: TextEffect; label: string }[] = [
  { value: 'none', label: 'Tanpa' },
  { value: 'shadow', label: 'Bayangan' },
  { value: 'outline', label: 'Garis tepi' },
  { value: 'box', label: 'Kotak' },
];

const SERIF_STACK = 'Georgia, "Times New Roman", serif';
const KEYBOARD_STEP = 0.01;

const chipClass = (active: boolean) =>
  `px-3 py-2 rounded-lg border text-sm transition-all ${
    active
      ? 'bg-white/20 border-white/50 text-white'
      : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
  }`;

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    // Without this a cross-origin photo taints the canvas and blocks the export
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    image.src = url;
  });
}

function resolveFontFamily(font: FontChoice): string {
  if (font === 'serif') return SERIF_STACK;
  const geist = getComputedStyle(document.body).getPropertyValue('--font-geist-sans');
  return geist ? `${geist}, sans-serif` : 'sans-serif';
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}

function Slider({ label, value, min, max, step, display, onChange }: SliderProps) {
  return (
    <label className="block">
      <span className="flex justify-between text-sm text-white/80 mb-1">
        <span>{label}</span>
        <span className="text-white/50">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-cyan-400"
      />
    </label>
  );
}

interface QuoteImageEditorProps {
  quote: Pick<Quote, 'id' | 'text' | 'author'>;
  onClose: () => void;
}

export default function QuoteImageEditor({ quote, onClose }: QuoteImageEditorProps) {
  const [format, setFormat] = useState<ImageFormat>('feed');
  const [background, setBackground] = useState<ImageBackground>({
    kind: 'gradient',
    colors: GRADIENTS[0],
  });
  const [photo, setPhoto] = useState<StockPhoto | null>(null);
  const [localPhotos, setLocalPhotos] = useState<{ id: number; url: string }[]>([]);
  const [brightness, setBrightness] = useState(-0.35);
  const [tintColor, setTintColor] = useState(TINT_COLORS[0]);
  const [tintStrength, setTintStrength] = useState(0);
  const [font, setFont] = useState<FontChoice>('sans');
  const [fontSize, setFontSize] = useState(() => defaultFontSize(quote.text));
  const [textWidth, setTextWidth] = useState(0.8);
  const [textColor, setTextColor] = useState(TEXT_COLORS[0]);
  const [textEffect, setTextEffect] = useState<TextEffect>('shadow');
  const [effectStrength, setEffectStrength] = useState(0.5);
  const [align, setAlign] = useState<TextAlign>('center');
  const [position, setPosition] = useState<TextPosition>({ x: 0.5, y: 0.5 });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<StockPhoto[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const [imageLoading, setImageLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');

  // Kept in state because the dialog portal mounts the canvas after the first effect run
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const blockRef = useRef<TextBlock>({ width: 0, height: 0 });
  const dragRef = useRef<{ pointerX: number; pointerY: number; origin: TextPosition } | null>(null);
  const imageRequestRef = useRef(0);
  const localUrlsRef = useRef<string[]>([]);

  const { width: canvasWidth, height: canvasHeight } = IMAGE_FORMATS[format];
  const canShareFiles = typeof navigator.canShare === 'function';

  useEffect(() => {
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const fontFamily = resolveFontFamily(font);
    let cancelled = false;

    const draw = () => {
      if (cancelled) return;
      blockRef.current = drawQuoteImage(ctx, {
        text: quote.text,
        author: quote.author,
        background,
        brightness,
        tintColor,
        tintStrength,
        fontFamily,
        fontSize,
        textWidth,
        textColor,
        textEffect,
        effectStrength,
        align,
        position,
      });
    };

    draw();
    // Web fonts load on demand, so redraw once the one we picked is ready
    document.fonts.load(`500 ${fontSize}px ${fontFamily}`).then(draw, draw);

    return () => {
      cancelled = true;
    };
  }, [
    canvas,
    quote,
    background,
    brightness,
    tintColor,
    tintStrength,
    font,
    fontSize,
    textWidth,
    textColor,
    textEffect,
    effectStrength,
    align,
    position,
    format,
  ]);

  const showLocalPhotos = (photos: LocalPhoto[]) => {
    localUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));

    const entries = photos.map(({ id, blob }) => ({ id, url: URL.createObjectURL(blob) }));
    localUrlsRef.current = entries.map((entry) => entry.url);
    setLocalPhotos(entries);
  };

  const refreshLocalPhotos = async () => {
    showLocalPhotos(await listLocalPhotos());
  };

  useEffect(() => {
    // Saved photos are a convenience, so a browser without IndexedDB just shows none
    listLocalPhotos()
      .then(showLocalPhotos)
      .catch((err) => console.error('Failed to read saved photos:', err));

    return () => {
      localUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const applyImage = async (url: string, stockPhoto: StockPhoto | null): Promise<boolean> => {
    const request = ++imageRequestRef.current;
    setImageLoading(true);
    setError('');

    try {
      const image = await loadImage(url);
      if (request !== imageRequestRef.current) return false;
      setBackground({ kind: 'image', image });
      setPhoto(stockPhoto);
      return true;
    } catch {
      if (request === imageRequestRef.current) {
        setError('Gambar gagal dimuat. Coba gambar lain.');
      }
      return false;
    } finally {
      if (request === imageRequestRef.current) {
        setImageLoading(false);
      }
    }
  };

  const selectTint = (color: string) => {
    setTintColor(color);
    // Picking a color should visibly do something even while the strength is 0
    setTintStrength((strength) => strength || DEFAULT_TINT_STRENGTH);
  };

  const selectGradient = (colors: readonly string[]) => {
    imageRequestRef.current++;
    setImageLoading(false);
    setError('');
    setBackground({ kind: 'gradient', colors });
    setPhoto(null);
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar.');
      return;
    }

    const url = URL.createObjectURL(file);
    const loaded = await applyImage(url, null);
    URL.revokeObjectURL(url);
    if (!loaded) return;

    try {
      await saveLocalPhoto(file);
      await refreshLocalPhotos();
    } catch (err) {
      // The photo is already on the canvas, only reusing it later is lost
      console.error('Failed to save photo locally:', err);
      setError('Foto tetap dipakai, tapi tidak bisa disimpan di browser ini.');
    }
  };

  const handleDeleteLocalPhoto = async (id: number) => {
    try {
      await deleteLocalPhoto(id);
      await refreshLocalPhotos();
    } catch (err) {
      console.error('Failed to delete saved photo:', err);
      setError('Foto gagal dihapus.');
    }
  };

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setSearching(true);
    setSearchError('');

    try {
      const response = await fetch(`/api/images/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.status === 'SUCCESS') {
        setSearchResults(data.data);
      } else {
        setSearchResults(null);
        setSearchError(data.message);
      }
    } catch {
      setSearchResults(null);
      setSearchError('Gagal mencari foto');
    } finally {
      setSearching(false);
    }
  };

  const moveText = (next: TextPosition) => {
    setPosition(
      clampPosition(next, blockRef.current, { width: canvasWidth, height: canvasHeight })
    );
  };

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      origin: clampPosition(position, blockRef.current, {
        width: canvasWidth,
        height: canvasHeight,
      }),
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    if (!drag) return;

    const rect = event.currentTarget.getBoundingClientRect();
    moveText({
      x: drag.origin.x + (event.clientX - drag.pointerX) / rect.width,
      y: drag.origin.y + (event.clientY - drag.pointerY) / rect.height,
    });
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  const handleCanvasKeyDown = (event: KeyboardEvent<HTMLCanvasElement>) => {
    const offsets: Record<string, [number, number]> = {
      ArrowLeft: [-KEYBOARD_STEP, 0],
      ArrowRight: [KEYBOARD_STEP, 0],
      ArrowUp: [0, -KEYBOARD_STEP],
      ArrowDown: [0, KEYBOARD_STEP],
    };
    const offset = offsets[event.key];
    if (!offset) return;

    event.preventDefault();
    moveText({ x: position.x + offset[0], y: position.y + offset[1] });
  };

  const createImageFile = async (): Promise<File> => {
    if (!canvas) throw new Error('Canvas is not ready');

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', 0.92);
    });
    if (!blob) throw new Error('Canvas export returned no data');

    return new File([blob], `kutipan-${quote.id}-${format}.jpg`, { type: 'image/jpeg' });
  };

  const trackPhotoUse = () => {
    if (photo?.source !== 'unsplash') return;

    fetch('/api/images/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photoId: photo.id }),
    }).catch((err) => console.error('Failed to track photo download:', err));
  };

  const downloadFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownload = async () => {
    setExporting(true);
    setError('');

    try {
      downloadFile(await createImageFile());
      trackPhotoUse();
    } catch (err) {
      console.error('Failed to export image:', err);
      setError('Gagal membuat gambar. Coba latar belakang lain.');
    } finally {
      setExporting(false);
    }
  };

  const handleShare = async () => {
    setExporting(true);
    setError('');

    try {
      const file = await createImageFile();

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Kutipan Inspiratif' });
      } else {
        downloadFile(file);
      }
      trackPhotoUse();
    } catch (err) {
      // AbortError only means the user closed the share sheet
      if (!(err instanceof DOMException && err.name === 'AbortError')) {
        console.error('Failed to share image:', err);
        setError('Gagal membagikan gambar.');
      }
    } finally {
      setExporting(false);
    }
  };

  return (
    <Dialog open onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
          <DialogPanel className="w-full max-w-5xl rounded-2xl border border-white/20 bg-neutral-900 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
              <DialogTitle className="text-lg font-semibold">Buat Gambar Kutipan</DialogTitle>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Tutup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
              {/* Preview */}
              <div className="flex flex-col items-center gap-3 lg:sticky lg:top-6 lg:self-start">
                <div className="relative">
                  <canvas
                    ref={setCanvas}
                    width={canvasWidth}
                    height={canvasHeight}
                    tabIndex={0}
                    role="img"
                    aria-label={`Pratinjau gambar kutipan. Geser teks dengan tombol panah. ${quote.text}`}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    onKeyDown={handleCanvasKeyDown}
                    className="block h-auto max-h-[70vh] w-auto max-w-full cursor-move touch-none rounded-lg"
                  />
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  )}
                </div>

                <p className="text-sm text-white/50">Geser teks langsung di gambar</p>

                {photo && (
                  <p className="text-xs text-white/60">
                    Foto oleh{' '}
                    <a href={photo.authorUrl} target="_blank" rel="noreferrer" className="underline">
                      {photo.author}
                    </a>{' '}
                    di{' '}
                    <a href={photo.sourceUrl} target="_blank" rel="noreferrer" className="underline">
                      {photo.source === 'unsplash' ? 'Unsplash' : 'Pixabay'}
                    </a>
                  </p>
                )}
              </div>

              {/* Controls */}
              <div className="space-y-6">
                <section>
                  <h3 className="text-sm font-medium text-white/80 mb-2">Ukuran</h3>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(IMAGE_FORMATS) as ImageFormat[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => setFormat(key)}
                        aria-pressed={format === key}
                        className={chipClass(format === key)}
                      >
                        {IMAGE_FORMATS[key].label}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-sm font-medium text-white/80">Latar belakang</h3>

                  <div className="flex gap-2">
                    {GRADIENTS.map((colors) => (
                      <button
                        key={colors.join()}
                        onClick={() => selectGradient(colors)}
                        aria-label="Pilih gradien"
                        aria-pressed={background.kind === 'gradient' && background.colors === colors}
                        className="h-9 w-9 rounded-lg border border-white/30 aria-pressed:ring-2 aria-pressed:ring-cyan-400"
                        style={{ background: `linear-gradient(135deg, ${colors.join(', ')})` }}
                      />
                    ))}
                  </div>

                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-white/30 px-3 py-3 text-sm text-white/80 hover:bg-white/5 transition-all">
                    <ImagePlus className="h-4 w-4" />
                    Upload foto sendiri
                    <input type="file" accept="image/*" onChange={handleUpload} className="sr-only" />
                  </label>

                  {localPhotos.length > 0 && (
                    <div>
                      <p className="mb-2 text-xs text-white/50">
                        Foto kamu, hanya tersimpan di browser ini
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {localPhotos.map(({ id, url }) => (
                          <div key={id} className="relative aspect-square">
                            <button
                              onClick={() => applyImage(url, null)}
                              aria-label="Pakai foto tersimpan"
                              className="relative block h-full w-full overflow-hidden rounded-lg border border-white/20 hover:border-cyan-400 transition-all"
                            >
                              <Image src={url} alt="" fill unoptimized className="object-cover" />
                            </button>
                            <button
                              onClick={() => handleDeleteLocalPhoto(id)}
                              aria-label="Hapus foto tersimpan"
                              className="absolute right-0.5 top-0.5 rounded-full bg-black/70 p-0.5 text-white/80 hover:text-white"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Cari foto: gunung, laut, kota..."
                      aria-label="Cari foto dari Unsplash dan Pixabay"
                      className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={searching}
                      aria-label="Cari"
                      className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 hover:bg-white/20 transition-all disabled:opacity-40"
                    >
                      {searching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </button>
                  </form>

                  {searchError && <p className="text-sm text-amber-300">{searchError}</p>}

                  {searchResults?.length === 0 && (
                    <p className="text-sm text-white/60">Foto tidak ditemukan.</p>
                  )}

                  {searchResults && searchResults.length > 0 && (
                    <div className="grid max-h-56 grid-cols-3 gap-2 overflow-y-auto pr-1">
                      {searchResults.map((result) => (
                        <button
                          key={`${result.source}-${result.id}`}
                          onClick={() => applyImage(result.imageUrl, result)}
                          title={`${result.author} · ${result.source === 'unsplash' ? 'Unsplash' : 'Pixabay'}`}
                          className="relative aspect-square overflow-hidden rounded-lg border border-white/20 hover:border-cyan-400 transition-all"
                        >
                          <Image
                            src={result.thumbUrl}
                            alt={result.alt}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                          <span className="absolute inset-x-0 bottom-0 truncate bg-black/60 px-1 py-0.5 text-[10px] text-white/90">
                            {result.author} · {result.source === 'unsplash' ? 'Unsplash' : 'Pixabay'}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  <Slider
                    label="Gelap / terang"
                    value={brightness}
                    min={-0.8}
                    max={0.8}
                    step={0.05}
                    display={
                      brightness === 0
                        ? 'Normal'
                        : `${brightness < 0 ? 'Gelap' : 'Terang'} ${Math.round(Math.abs(brightness) * 100)}%`
                    }
                    onChange={setBrightness}
                  />

                  <div>
                    <p className="text-sm text-white/80 mb-2">Overlay warna</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {TINT_COLORS.map((color) => (
                        <button
                          key={color}
                          onClick={() => selectTint(color)}
                          aria-label={`Warna overlay ${color}`}
                          aria-pressed={tintStrength > 0 && tintColor === color}
                          className="h-9 w-9 rounded-full border border-white/30 aria-pressed:ring-2 aria-pressed:ring-cyan-400"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      <input
                        type="color"
                        value={tintColor}
                        onChange={(event) => selectTint(event.target.value)}
                        aria-label="Pilih warna overlay sendiri"
                        className="h-9 w-9 cursor-pointer rounded-full border border-white/30 bg-transparent"
                      />
                    </div>
                  </div>

                  <Slider
                    label="Kekuatan overlay"
                    value={tintStrength}
                    min={0}
                    max={0.8}
                    step={0.05}
                    display={tintStrength === 0 ? 'Mati' : `${Math.round(tintStrength * 100)}%`}
                    onChange={setTintStrength}
                  />
                </section>

                <section className="space-y-3">
                  <h3 className="text-sm font-medium text-white/80">Teks</h3>

                  <div className="flex flex-wrap gap-2">
                    {FONTS.map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setFont(value)}
                        aria-pressed={font === value}
                        className={chipClass(font === value)}
                      >
                        {label}
                      </button>
                    ))}
                    {ALIGNMENTS.map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => setAlign(value)}
                        aria-pressed={align === value}
                        aria-label={label}
                        className={chipClass(align === value)}
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    ))}
                    <button
                      onClick={() => setPosition({ x: 0.5, y: 0.5 })}
                      aria-label="Tengahkan teks"
                      title="Tengahkan teks"
                      className={chipClass(false)}
                    >
                      <Crosshair className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    {TEXT_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => setTextColor(color)}
                        aria-label={`Warna teks ${color}`}
                        aria-pressed={textColor === color}
                        className="h-9 w-9 rounded-full border border-white/30 aria-pressed:ring-2 aria-pressed:ring-cyan-400"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {TEXT_EFFECTS.map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setTextEffect(value)}
                        aria-pressed={textEffect === value}
                        className={chipClass(textEffect === value)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {textEffect !== 'none' && (
                    <Slider
                      label="Kekuatan efek"
                      value={effectStrength}
                      min={0.1}
                      max={1}
                      step={0.05}
                      display={`${Math.round(effectStrength * 100)}%`}
                      onChange={setEffectStrength}
                    />
                  )}

                  <Slider
                    label="Ukuran teks"
                    value={fontSize}
                    min={28}
                    max={110}
                    step={2}
                    display={`${fontSize}px`}
                    onChange={setFontSize}
                  />
                  <Slider
                    label="Lebar teks"
                    value={textWidth}
                    min={0.4}
                    max={0.9}
                    step={0.05}
                    display={`${Math.round(textWidth * 100)}%`}
                    onChange={setTextWidth}
                  />
                </section>

                {error && <p className="text-sm text-amber-300">{error}</p>}

                <div className="flex gap-2">
                  <button
                    onClick={handleDownload}
                    disabled={exporting || imageLoading}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-purple-400/40 bg-gradient-to-r from-purple-500/30 to-pink-500/30 px-4 py-3 font-medium hover:from-purple-500/40 hover:to-pink-500/40 transition-all disabled:opacity-40"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>

                  {canShareFiles && (
                    <button
                      onClick={handleShare}
                      disabled={exporting || imageLoading}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 px-4 py-3 font-medium hover:from-cyan-500/40 hover:to-blue-500/40 transition-all disabled:opacity-40"
                    >
                      <Share2 className="h-4 w-4" />
                      Bagikan
                    </button>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
