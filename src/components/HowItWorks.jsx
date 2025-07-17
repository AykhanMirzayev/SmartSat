// src/components/HowItWorksSection.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faBrain, faCommentDots } from '@fortawesome/free-solid-svg-icons';

const StepCard = ({ number, title, description, icons }) => (
  <div className="bg-white p-8 rounded-xl shadow-md text-center feature-card transition duration-300">
    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-indigo-100 text-indigo-600 mb-6">
      <span className="text-2xl font-bold">{number}</span>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
    <div className="flex justify-center mb-4 min-h-[48px]">
      <div className="flex space-x-2">
        {icons.map((icon, index) => (
          <div key={index} className="h-12 w-12 flex items-center justify-center bg-gray-100 rounded-lg">
            <FontAwesomeIcon icon={icon.icon} className={`text-xl ${icon.color}`} />
          </div>
        ))}
      </div>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "İnteqrasiya",
      description: "Rahat bir şəkildə sosial media hesablarınıza inteqrasiya edin (Instagram, Whatsapp, Tiktok)",
      icons: [
        { icon: faInstagram, color: "text-pink-500" },
        { icon: faWhatsapp, color: "text-green-500" },
        { icon: faTiktok, color: "text-black" },
      ],
    },
    {
      number: 2,
      title: "Analiz",
      description: "Qabaqcıl süni intellektimiz istənilən mesajdan müştərinin duyğusunu, tonunu və niyyətini dərhal anlayır.",
      icons: [{ icon: faBrain, color: "text-indigo-500" }],
    },
    {
      number: 3,
      title: "Cavab",
      description: "Vəziyyətə uyğunlaşdırılmış, təsdiq və ya redaktə etməyə hazır ağıllı, empatik cavab təklifləri əldə edin.",
      icons: [{ icon: faCommentDots, color: "text-green-500" }],
    },
  ];

  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">3 Addımda Əla Nəticə</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Süni İntellekt Dəstəkli Asistantla Müştəri Əlaqələrinizi Dəyişdirin
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => <StepCard key={step.number} {...step} />)}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;