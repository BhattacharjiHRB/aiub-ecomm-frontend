"use client";

import { useEffect, useState } from "react";

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Stock More. Pay Less.",
      subtitle: "Grow Faster.",
      description: "Form-fresh quality. Convenience at your doorstep.",
      image: "/assets/image/image-34.png",
      cta: "Shop Now",
    },
    {
      id: 2,
      title: "Summer Collection",
      subtitle: "Up to 50% Off",
      description: "Discover amazing deals on all categories.",
      image: "/assets/image/image-59.png",
      cta: "Explore",
    },
    {
      id: 3,
      title: "Grow Your Business",
      subtitle: "Become a Merchant",
      description: "Discover amazing deals on all categories.",
      image: "/assets/image/image-90.png",
      cta: "Join Now",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-100 rounded-xl">
      {/* Slides */}
      <div className="relative h-96">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-center object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />

            {/* Text Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 w-full">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {slide.title}
                </h2>
                <p className="text-2xl text-white mb-4">{slide.subtitle}</p>
                <p className="text-white text-lg mb-6">{slide.description}</p>
                <button className="bg-blue-800 hover:bg-indigo-900 text-white px-6 py-2 rounded-lg font-medium transition">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full transition"
        aria-label="Previous slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full transition"
        aria-label="Next slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
