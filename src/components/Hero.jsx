// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faMeh, faFrown, faChevronLeft, faChevronRight, faUserCircle, faRobot } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(1);
  const slideIntervalTime = 5000; // 5 saniyə

  const slides = [
    {
      customerInput: "Sifarişim yenə gecikir! Müştəri xidməti dəhşətlidir!",
      sentiment: "Məyusluq: Yüksək",
      sentimentColor: "from-red-500/80 to-orange-400/80",
      aiResponse: "Hörmətli [Müştəri Adı], sifarişinizdəki gecikməyə görə səmimi qəlbdən üzr istəyirik. Bunun nə qədər cansıxıcı olduğunu başa düşürük. Dərhal sifarişinizin statusunu yoxlayır və sizə məlumat verəcəyik.",
      loyalty: "Azaldı",
      loyaltyIcon: faFrown,
      loyaltyColor: "text-red-500",
    },
    {
      customerInput: "Bu məhsulu necə istifadə edəcəyimi bilmirəm, təlimat yoxdur.",
      sentiment: "Çaşkınlıq: Orta",
      sentimentColor: "from-yellow-500/80 to-amber-400/80",
      aiResponse: "Hörmətli [Müştəri Adı], yaşadığınız çətinliyə görə təəssüf edirik. Zəhmət olmasa, hansı hissədə çətinlik çəkdiyinizi bildirin ki, sizə ətraflı köməklik göstərək. Həmçinin istifadəçi təlimatına keçid göndərə bilərik.",
      loyalty: "Neytral",
      loyaltyIcon: faMeh,
      loyaltyColor: "text-gray-500",
    },
    {
      customerInput: "Xidmətinizdən çox məmnunam! Hər şey üçün təşəkkür edirəm!",
      sentiment: "Müsbət: Çox Yüksək",
      sentimentColor: "from-green-500/80 to-emerald-400/80",
      aiResponse: "Hörmətli [Müştəri Adı], gözəl rəyiniz üçün təşəkkür edirik! Sizin məmnuniyyətiniz bizim ən böyük motivasiyamızdır. Başqa suallarınız olarsa, çəkinmədən soruşun.",
      loyalty: "Artı",
      loyaltyIcon: faSmile,
      loyaltyColor: "text-green-500",
    },
    {
      customerInput: "Heç kim mənə cavab vermir. Bu nə qədər davam edəcək?",
      sentiment: "Əsəbilik: Yüksək",
      sentimentColor: "from-purple-500/80 to-indigo-400/80",
      aiResponse: "Hörmətli [Müştəri Adı], cavabımızdakı gecikməyə görə üzr istəyirik. Gözləməyin xoş olmadığını anlayırıq. Sorğunuzu dərhal yoxlayıb ən qısa zamanda cavab verəcəyik. Səbriniz üçün təşəkkür edirik.",
      loyalty: "Azaldı",
      loyaltyIcon: faFrown,
      loyaltyColor: "text-red-500",
    },
    {
      customerInput: "Abunəliyim niyə avtomatik yeniləndi? Mən onu ləğv etmişdim!",
      sentiment: "Qəzəb: Yüksək",
      sentimentColor: "from-pink-500/80 to-rose-400/80",
      aiResponse: "Hörmətli [Müştəri Adı], abunəliyinizin avtomatik yenilənməsi ilə bağlı narahatlığa görə təəssüf edirik. Bu məsələni dərhal araşdırıb sizə məlumat verəcəyik. Zəhmət olmasa, hesab məlumatlarınızı təsdiqləyin ki, abunəliyinizi yoxlaya bilək.",
      loyalty: "Azaldı",
      loyaltyIcon: faFrown,
      loyaltyColor: "text-red-500",
    }
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setProgress(0);
  };

  useEffect(() => {
    if (isHovering) return;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          nextSlide();
          return 0;
        }
        return prevProgress + (100 / (slideIntervalTime / 50));
      });
    }, 50);

    return () => clearInterval(timer);
  }, [isHovering, currentSlide]);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const sliderVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    }),
  };

  return (
    <div id="home" className="relative bg-white py-16 md:py-24 overflow-hidden min-h-[800px] flex items-center justify-center text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
        >
          Müştəri Xidmətini <br className="hidden sm:inline" /><span className="text-indigo-600">Süni İntellektlə</span> Transformasiya Edin
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ ...fadeInVariants.visible.transition, delay: 0.2 }}
        >
          SmartSat ilə sosial media mesajlarını anında təhlil edin, müştəri emosiyalarını anlayın və avtomatlaşdırılmış cavab təklifləri ilə loyallığı artırın.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ ...fadeInVariants.visible.transition, delay: 0.4 }}
        >
          <a
            href="#demo"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:px-10 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Demoya Baxın
            <FontAwesomeIcon icon={faChevronRight} className="ml-2 -mr-1 h-4 w-4" />
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-8 py-3 border border-indigo-600 text-base font-medium rounded-full text-indigo-600 hover:bg-indigo-50 md:py-4 md:px-10 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Qiymətlərə Baxın
          </a>
        </motion.div>

        {/* Carousel / AI Response Simulator */}
        <div
          className="relative max-w-4xl mx-auto text-left"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative h-[420px] sm:h-[380px] md:h-[350px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={sliderVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full h-full"
              >
                <div className={`relative w-full h-full bg-gradient-to-br ${slides[currentSlide].sentimentColor} rounded-3xl shadow-2xl p-8 flex flex-col justify-between text-white overflow-hidden`}>
                  <div className="absolute -top-10 -right-10 w-48 h-48 text-white/10">
                      <FontAwesomeIcon icon={faRobot} className="w-full h-full" />
                  </div>

                  {/* Top Section: Customer Input */}
                  <div className="relative">
                      <div className="flex items-center mb-3">
                        <FontAwesomeIcon icon={faUserCircle} className="mr-3 text-2xl text-white/80" />
                        <h3 className="text-xl font-bold">Müştəri Mesajı</h3>
                      </div>
                      <p className="text-white/90 text-lg italic bg-black/10 p-4 rounded-lg">"{slides[currentSlide].customerInput}"</p>
                  </div>

                  {/* Bottom Section: AI Response */}
                  <div className="relative mt-4">
                      <div className="flex items-center mb-3">
                          <FontAwesomeIcon icon={faRobot} className="mr-3 text-2xl text-cyan-300" />
                          <h3 className="text-xl font-bold">SmartSat Cavabı</h3>
                      </div>
                      <p className="text-white/90 text-base bg-black/10 p-4 rounded-lg">{slides[currentSlide].aiResponse}</p>
                  </div>

                  {/* Loyalty & Sentiment Overlay */}
                    <div className="absolute bottom-4 right-6 flex items-center space-x-4 text-sm">
                        <span className="font-semibold bg-black/20 px-3 py-1 rounded-full">{slides[currentSlide].sentiment}</span>
                        <div className={`flex items-center font-semibold ${slides[currentSlide].loyaltyColor}`}>
                            <FontAwesomeIcon icon={slides[currentSlide].loyaltyIcon} className="mr-2" />
                            {slides[currentSlide].loyalty}
                        </div>
                    </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-indigo-600 p-3 rounded-full shadow-lg z-20 transition-all duration-300 hover:scale-110 focus:outline-none"
            aria-label="Əvvəlki Slayd"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-indigo-600 p-3 rounded-full shadow-lg z-20 transition-all duration-300 hover:scale-110 focus:outline-none"
            aria-label="Növbəti Slayd"
          >
            <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" />
          </button>

          {/* Segmented Progress Bar / Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="w-1/5 h-2.5 bg-gray-200 rounded-full overflow-hidden relative"
                aria-label={`${index + 1}-ci slayda keç`}
              >
                {index === currentSlide && (
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-indigo-600"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.05, ease: 'linear' }}
                  />
                )}
                  {index !== currentSlide && (
                    <div className={`h-full rounded-full transition-colors duration-300 ${isHovering ? 'bg-gray-300' : ''}`}></div>
                  )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;