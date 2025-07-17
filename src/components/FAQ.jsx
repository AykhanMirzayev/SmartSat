import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
      answer: "Biznes üçün Sosial Media Şəbəkələri üzərindən müştərilərə avtomatlaşdırılmış mesajlar göndərmək kimi xidmətlər təklif edən bir innovativ şirkətdir. SmarSat-ın məqsədi Sosial Media üzərindən müştərilərlə daha yaxşı və effektiv ünsiyyət qurmaqdır."
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
    }
  ];

  return (
    <div id="faq" className="max-w-3xl mx-auto m-16 scroll-mt-16 p-24">
        <h3 className="text-2xl font-bold text-center mb-8">Ən Çox Verilən Suallar</h3>
        <div className="space-y-4">
            {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
        </div>
    </div>
  );
};

export default FAQ;