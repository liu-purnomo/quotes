'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { AuthorPhoto } from '@/data/authorPhotos';

interface AuthorAvatarProps {
  name: string;
  photo?: AuthorPhoto;
  size?: number;
  className?: string;
}

function initialsOf(name: string): string {
  const words = name.split(/\s+/).filter((word) => /^\p{L}/u.test(word));
  return words.slice(0, 2).map((word) => word[0].toUpperCase()).join('');
}

// The same name always lands on the same color
function hueOf(name: string): number {
  return [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 360;
}

export default function AuthorAvatar({ name, photo, size = 40, className = '' }: AuthorAvatarProps) {
  const [failed, setFailed] = useState(false);

  if (photo && !failed) {
    return (
      <Image
        src={photo.url}
        alt={`Foto ${name}`}
        title={`Foto: ${photo.artist} (${photo.license})`}
        width={size}
        height={size}
        unoptimized
        onError={() => setFailed(true)}
        className={`shrink-0 rounded-full object-cover object-top ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        backgroundColor: `hsl(${hueOf(name)} 45% 32%)`,
      }}
    >
      {initialsOf(name)}
    </span>
  );
}
