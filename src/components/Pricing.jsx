// src/components/PricingSection.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const PricingCard = ({ plan, isPopular = false }) => (
    <div className={`bg-white border ${isPopular ? 'border-2 border-indigo-500 shadow-lg' : 'border-gray-200 shadow-sm'} rounded-xl overflow-hidden pricing-card flex flex-col`}>
        <div className="px-6 py-8 flex-grow">
            <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
            {plan.price && (
                <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="ml-1 text-lg font-medium text-gray-500">{plan.period}</span>}
                </div>
            )}
            <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
            <div className="mt-6">
                <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <div className={`flex-shrink-0 h-5 w-5 ${feature.included ? 'text-green-500' : 'text-gray-400'}`}>
                                <FontAwesomeIcon icon={feature.included ? faCheck : faTimes} />
                            </div>
                            <p className={`ml-3 text-sm ${feature.included ? 'text-gray-700' : 'text-gray-500'}`}>{feature.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 mt-auto">
            <a href={plan.buttonHref} className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                {plan.buttonText}
            </a>
        </div>
    </div>
);

const Pricing = () => {
    // Pricing data moved into an array for easier management
    const pricingPlans = [
        //... (Data from HTML converted to this structure)
        { name: '14 Günlük Pulsuz Versiya', price: '$0', period: '/month', description: 'Experience all features with no commitment', buttonText: 'Start Free Trial', buttonHref: '#', features: [{text: '50 message analyses', included: true}, {text: 'Core sentiment analysis', included: true}, {text: 'Basic response suggestions', included: true}, {text: '2 integrations', included: true}, {text: 'Analytics dashboard', included: false}] },
        { name: 'Founder/Solo', price: '$29', period: '/month', description: 'Perfect for solopreneurs and small businesses', buttonText: 'Get Started', buttonHref: '#', features: [{text: '500 message analyses', included: true}, {text: 'Core sentiment analysis', included: true}, {text: 'Basic response suggestions', included: true}, {text: '2 integrations', included: true}, {text: 'Analytics dashboard', included: false}] },
        { name: 'Team/Growth', price: '$79', period: '/month', description: 'Best for growing teams and SMBs', buttonText: 'Get Started', buttonHref: '#', isPopular: true, features: [{text: '3,000 message analyses', included: true}, {text: 'Advanced sentiment analysis', included: true}, {text: 'Full response assistant', included: true}, {text: '10 integrations', included: true}, {text: 'Basic analytics dashboard', included: true}, {text: 'Up to 5 users', included: true}] },
        { name: 'Biznes/Pro', price: null, description: 'For established businesses and enterprises', buttonText: 'Contact Us', buttonHref: 'https://wa.me/994507726722', features: [{text: 'Limitsiz Analiz', included: true}, {text: 'Admin Dashboard', included: true}, {text: 'Full Avtomatik AI Asistant', included: true}, {text: 'Bütün İnteqrasiyalar', included: true}, {text: 'Comprehensive analytics', included: true}, {text: 'Avtomatik Səsli Mesaj Göndərmə', included: true}, {text: 'Priority support', included: true}] },
    ];

  return (
    <div id="pricing" className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Büdcənizə Uyğun Qiymət Paketini Seçin</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Hər Müştəri üçün Düşünülmüş Şəffaf Qiymətlərdən Birini Seçərək Siz də Öz Biznesinizi Böyüdün.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
             {pricingPlans.map(plan => <PricingCard key={plan.name} plan={plan} isPopular={plan.isPopular} />)}
        </div>
        
        <div className="mt-12 text-center">
            <p className="text-gray-500">Müəssisəniz Üçün Fərdi Həllərə Ehtiyacınız Var? <a href="https://wa.me/994503327103" className="text-indigo-600 font-medium">Komandamızla Əlaqə Saxlayın</a></p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;