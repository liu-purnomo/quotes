'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  Maximize,
  MessageSquareQuote,
  Minimize,
  Palette,
  Pause,
  Play,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AuthorAvatar from '@/components/AuthorAvatar';
import type { AuthorPhoto } from '@/data/authorPhotos';

interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
  photo?: AuthorPhoto;
}

const themes = [
  {
    name: 'Dark Stone',
    gradient: 'bg-gradient-to-b from-neutral-900 via-stone-800 to-neutral-900',
  },
  {
    name: 'Ocean Deep',
    gradient: 'bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900',
  },
  {
    name: 'Forest Night',
    gradient: 'bg-gradient-to-b from-gray-900 via-emerald-900 to-gray-900',
  },
  {
    name: 'Sunset',
    gradient: 'bg-gradient-to-b from-orange-900 via-red-900 to-orange-900',
  },
  {
    name: 'Purple Haze',
    gradient: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900',
  },
];

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [slideshowInterval, setSlideshowInterval] =
    useState<NodeJS.Timeout | null>(null);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/quotes/random');
      const result = await response.json();
      if (result.status === 'SUCCESS') {
        setQuote(result.data);
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      setLoading(false);
    }
  };

  const changeTheme = () => {
    setCurrentTheme((prev) => (prev + 1) % themes.length);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleSlideshow = () => {
    if (isSlideshow) {
      if (slideshowInterval) {
        clearInterval(slideshowInterval);
        setSlideshowInterval(null);
      }
      setIsSlideshow(false);
    } else {
      const interval = setInterval(() => {
        fetchQuote();
      }, 10000); // Change quote every 10 seconds
      setSlideshowInterval(interval);
      setIsSlideshow(true);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(fetchQuote, 0);

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (slideshowInterval) {
        clearInterval(slideshowInterval);
      }
    };
  }, [slideshowInterval]);

  return (
    <div
      className={`h-screen ${themes[currentTheme].gradient} flex items-center justify-center px-6 relative`}
    >
      {/* Desktop Controls - Top Right */}
      <motion.div
        className="hidden md:flex absolute top-6 right-6 gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <motion.button
          onClick={toggleSlideshow}
          className="p-3 bg-white/5 backdrop-blur text-white rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
          title={isSlideshow ? 'Stop Slideshow' : 'Start Slideshow'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSlideshow ? <Pause size={16} /> : <Play size={16} />}
        </motion.button>

        <motion.button
          onClick={toggleFullscreen}
          className="p-3 bg-white/5 backdrop-blur text-white rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </motion.button>

        <motion.button
          onClick={changeTheme}
          className="p-3 bg-white/5 backdrop-blur text-white rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
          title={`Theme: ${themes[currentTheme].name}`}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
        >
          <Palette size={16} />
        </motion.button>
        <Link href="/quotes">
          <motion.button
            className="p-3 bg-white/5 backdrop-blur text-white rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            title="List Quotes"
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquareQuote size={16} />
          </motion.button>
        </Link>
        <Link href="/docs">
          <motion.button
            className="p-3 bg-white/5 backdrop-blur text-white rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            title="API Documentation"
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen size={16} />
          </motion.button>
        </Link>
      </motion.div>

      {/* Mobile Dock - Bottom */}
      <motion.div
        className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 bg-white/10 backdrop-blur-lg rounded-full px-4 py-3 border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <motion.button
          onClick={toggleSlideshow}
          className="p-2 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 transition-all"
          title={isSlideshow ? 'Stop Slideshow' : 'Start Slideshow'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSlideshow ? <Pause size={18} /> : <Play size={18} />}
        </motion.button>

        <motion.button
          onClick={toggleFullscreen}
          className="p-2 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 transition-all"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </motion.button>

        <motion.button
          onClick={changeTheme}
          className="p-2 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 transition-all"
          title={`Theme: ${themes[currentTheme].name}`}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
        >
          <Palette size={18} />
        </motion.button>

        <Link href="/quotes">
          <motion.button
            className="p-2 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 transition-all"
            title="API Documentation"
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquareQuote size={18} />
          </motion.button>
        </Link>
        <Link href="/docs">
          <motion.button
            className="p-2 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 transition-all"
            title="API Documentation"
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen size={18} />
          </motion.button>
        </Link>
      </motion.div>

      <div className="text-center max-w-5xl mb-20 md:mb-0">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-white/60 text-xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="inline-block"
              >
                •••
              </motion.div>
            </motion.div>
          ) : quote ? (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 1.1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.blockquote
                className="text-4xl md:text-6xl font-thin text-white mb-12 leading-tight tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                &ldquo;{quote.text}&rdquo;
              </motion.blockquote>

              <motion.div
                className="flex items-center justify-center gap-3 mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <AuthorAvatar name={quote.author} photo={quote.photo} size={48} />
                <p className="text-2xl text-white/80 font-medium">{quote.author}</p>
              </motion.div>

              <motion.p
                className="text-base text-white/50 uppercase tracking-widest font-medium"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {quote.category}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-white/60"
            >
              Tidak dapat memuat quote
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isSlideshow && (
            <motion.button
              onClick={fetchQuote}
              disabled={loading}
              className="mt-16 px-12 py-4 bg-white/5 backdrop-blur text-white rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-30"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {loading ? '•••' : 'Inspirasi Lainnya'}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
