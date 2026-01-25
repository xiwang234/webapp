'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LandingPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: t('landing.carousel.step1.title'),
      description: t('landing.carousel.step1.desc'),
      image: '/screenshots/step1-identity.png',
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      title: t('landing.carousel.step2.title'),
      description: t('landing.carousel.step2.desc'),
      image: '/screenshots/step2-scenario.png',
      color: 'from-purple-500/20 to-pink-500/20',
    },
    {
      title: t('landing.carousel.step3.title'),
      description: t('landing.carousel.step3.desc'),
      image: '/screenshots/step3-results.png',
      color: 'from-emerald-500/20 to-teal-500/20',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/analysis');
    } else {
      router.push('/auth/signin');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                {t('app.title')}
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-display font-bold gradient-text mb-6">
              {t('landing.hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              {t('landing.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg flex items-center justify-center gap-2 glow-effect"
              >
                {t('landing.hero.cta')}
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById('carousel')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-secondary text-foreground rounded-lg font-semibold text-lg hover:bg-secondary/80 transition-all"
              >
                {t('landing.hero.learnMore')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Carousel Section */}
      <div id="carousel" className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center gradient-text mb-16">
            {t('landing.carousel.title')}
          </h2>

          <div className="relative">
            {/* Carousel Container */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].color}`} />

                  {/* Content */}
                  <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12">
                    {/* Text Content */}
                    <div className="flex flex-col justify-center">
                      <div className="text-6xl font-bold text-primary/30 mb-4">
                        {String(currentSlide + 1).padStart(2, '0')}
                      </div>
                      <h3 className="text-3xl font-display font-bold text-foreground mb-4">
                        {slides[currentSlide].title}
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {slides[currentSlide].description}
                      </p>
                    </div>

                    {/* Screenshot */}
                    <div className="flex items-center justify-center">
                      <div className="relative w-full aspect-[4/3] rounded-lg bg-gradient-to-br from-secondary/30 to-secondary/10 border-2 border-border overflow-hidden shadow-2xl">
                        <Image
                          src={slides[currentSlide].image}
                          alt={slides[currentSlide].title}
                          fill
                          className="object-contain p-2"
                          priority={currentSlide === 0}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-secondary/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-secondary transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-secondary/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-secondary transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-secondary hover:bg-secondary/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg flex items-center gap-2 mx-auto glow-effect"
            >
              {t('landing.hero.cta')}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
