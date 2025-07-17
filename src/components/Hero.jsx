// src/components/Hero.jsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faMeh, faFrown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false); // State to track hover

  const slides = [
    // ... (Your slides array remains unchanged)
    {
      customerInput: "Mənim sifarişim yenə də gecikib! Müştəri keyfiyyəti sıfırdır!",
      sentiment: "Məyusluq: Yüksək",
      sentimentPosition: "20%",
      aiResponse: "Hörmətli [Müştərinin adı], Sifarişinizdəki gecikmə ilə bağlı şirkətimiz adıyla üzr istəyirik. Bunun necə bir xoşagəlməz hal olduğunu başa düşürük. Biz dərhal sifarişinizin statusunu yoxlayıb sizə çatdıracıyıq.",
      loyalty: "Artdı",
      loyaltyIcon: faSmile,
      loyaltyColor: "text-green-500",
      iconColor: "text-yellow-500"
    },
    {
      customerInput: "Bu məhsulu necə istifadə edəcəyimi bilmirəm, heç bir təlimat yoxdur.",
      sentiment: "Qarışıqlıq: Orta",
      sentimentPosition: "45%",
      aiResponse: "Salam [Müştərinin adı], Məhsulla bağlı yaşadığınız çətinliyi anlayırıq. Sizə addım-addım təlimatları və faydalı bir video linki göndəririk ki, məhsuldan tam şəkildə yararlana biləsiniz.",
      loyalty: "Sabitdir",
      loyaltyIcon: faMeh,
      loyaltyColor: "text-gray-500",
      iconColor: "text-gray-400"
    },
    {
      customerInput: "Tətbiqiniz davamlı olaraq donur. Buna dözə bilmirəm artıq!",
      sentiment: "Qəzəb: Kritik",
      sentimentPosition: "5%",
      aiResponse: "Dərin təəssüf hissi ilə üzr istəyirik. Yaşadığınız texniki nasazlıq qəbuledilməzdir. Texniki komandamız problemi araşdırır və həll olunan kimi sizə xəbər verəcəyik. Səbriniz üçün təşəkkür edirik.",
      loyalty: "Azaldı",
      loyaltyIcon: faFrown,
      loyaltyColor: "text-red-500",
      iconColor: "text-red-400"
    }
  ];

  // Using a functional update to prevent stale state issues in setInterval
  const nextSlide = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // --- NEW: useEffect for automatic sliding ---
  useEffect(() => {
    // Only run the interval if the user is NOT hovering over the carousel
    if (!isHovering) {
      const intervalId = setInterval(() => {
        nextSlide();
      }, 3000); // Change slide every 5 seconds

      // Cleanup function to clear the interval when the component unmounts
      // or when the effect re-runs (e.g., when isHovering changes)
      return () => clearInterval(intervalId);
    }
  }, [currentSlide, isHovering]); // Re-run the effect if the slide changes or hover state changes

  return (
    <div className="gradient-bg text-white hero-clip-path">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-12 lg:mb-0">
             {/* Left side text content remains the same */}
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Müştərinizi Daha Yaxşı Anlayın</h1>
            <p className="text-xl md:text-2xl mb-8">
              Süni intellektimiz müştəri duyğularını real vaxt rejimində təhlil edir. Bu sizə mükəmməl, insanabənzər cavablar hazırlamağa və müştərilərinizin sarsılmaz sədaqətini qurmağa imkan verir.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#pricing" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-bold text-center">Pulsuz Sınaq</a>
              <a href="#demo" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-lg text-lg font-bold text-center">
                Süni İntellektimizi İş Başında Görün
              </a>
            </div>
          </div>

          {/* Carousel */}
          {/* --- NEW: Added onMouseEnter and onMouseLeave to pause/resume auto-slide --- */}
          <div
            className="relative h-[480px]"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Carousel slides */}
            <div className="overflow-hidden relative h-full w-full rounded-xl shadow-xl">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                  <div className="bg-white p-4 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 mb-4">
                      <p className="text-gray-800 font-medium">"{slide.customerInput}"</p>
                    </div>
                    <div className="mb-4">
                      <div className="sentiment-visualization mb-2">
                        <div className="sentiment-marker" style={{ left: slide.sentimentPosition }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Neqativ</span>
                        <span>Neytral</span>
                        <span>Pozitiv</span>
                      </div>
                      <div className="mt-2 text-sm font-medium text-indigo-600">{slide.sentiment}</div>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500 flex-grow">
                      <p className="text-gray-800">"{slide.aiResponse}"</p>
                    </div>
                    <div className="mt-4 flex justify-end items-center">
                      <div className="text-sm text-gray-500 mr-2">Etibarlılıq:</div>
                      <div className={`${slide.loyaltyColor} font-bold`}>{slide.loyalty}</div>
                      <FontAwesomeIcon icon={slide.loyaltyIcon} className={`${slide.iconColor} ml-2`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons remain the same */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-white/50 hover:bg-white text-indigo-600 p-2 rounded-full shadow-md z-10"
              aria-label="Previous Slide"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5 " />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-white/50 hover:bg-white text-indigo-600 p-2 rounded-full shadow-md z-10"
              aria-label="Next Slide"
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" />
            </button>

             {/* Indicator Dots remain the same */}
            <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                 <button
                   key={index}
                   onClick={() => setCurrentSlide(index)}
                   className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white'}`}
                   aria-label={`Go to slide ${index + 1}`}
                 ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;