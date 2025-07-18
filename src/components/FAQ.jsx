import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { motion, useInView } from 'framer-motion'; // motion və useInView import edildi

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-4 text-left focus:outline-none accordion-toggle"
        onClick={toggleAccordion}
      >
        <span className="font-medium text-gray-900">{question}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`text-indigo-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        ref={contentRef}
        className="accordion-content transition-all duration-300 ease-out"
        style={{ maxHeight: isOpen ? `${contentRef.current ? contentRef.current.scrollHeight : 0}px` : '0px', overflow: 'hidden' }}
      >
        <div className="p-4 pt-0 text-gray-600">
          <p dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "SmartSat nədir?",
      answer: "SmartSat, süni intellekt (AI) dəstəkli bir platformadır və əsas məqsədi sosial Media üzərindən müştərilərlə daha yaxşı və effektiv ünsiyyət qurmaqdır."
    },
    {
      question: "SmartSat kimlər üçün nəzərdə tutulub?",
      answer: "SmartSat, səviyyəsindən asılı olmayaraq, kiçik, orta və böyük sahibkarlar üçün nəzərdə tutulmuşdur. SmartSat, biznesin ölçüsündən asılı olmayaraq, hər növ sahibkarlıq subyektləri üçün uyğundur."
    },
    {
      question: "SmartSat hansı dilləri dəstəkləyir?",
      answer: "SmartSat-ın bütün applikasiya və göstərdiyi xidmətlər azərbaycan, ingilis və rus dillərini dəstəkləyir."
    },
    {
        question: "SmartSat-ı istifadə etmək üçün texniki biliklərə ehtiyacım var?",
        answer: "Xeyr! SmartSat istifadəçi dostu interfeysə malikdir və onu istifadə etmək üçün heç bir xüsusi texniki bilik tələb olunmur. Platformamızı qurmaq və inteqrasiya etmək üçün asan addım-addım təlimatlar təqdim edirik."
    },
    {
        question: "SmartSatın üstün cəhətləri nələrdir?",
        answer: "SmartSat-ın üstün cəhətləri onun inteqrasiyasının asan, interfeysinin istifadəçi dostu olması və 7/24 müştəri dəstəyinin olmasıdır."
    },
    {
        question: "SmartSat müştəri məlumatlarının təhlükəsizliyini necə təmin edir?",
        answer: "Müştəri məlumatlarınızın təhlükəsizliyi bizim üçün prioritetdir. SmartSat məlumatlarınızı qorumaq üçün ən yüksək təhlükəsizlik standartlarından və şifrələmə protokollarından istifadə edir. Məlumatlarınız heç vaxt üçüncü tərəflərlə paylaşılmır."
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div id="faq" className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-extrabold text-gray-900 mb-4"
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Tez-Tez Verilən Suallar
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ ...textVariants.visible.transition, delay: 0.2 }}
          >
            SmartSat haqqında ən çox verilən suallara cavablar
          </motion.p>
        </div>

        <div
          ref={ref} // ref-i bu div-ə əlavə edirik
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ duration: 0.6, delay: index * 0.1 }} // Hər FAQ elementi üçün gecikmə
            >
              <FAQItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;