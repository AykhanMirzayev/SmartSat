// src/components/PricingSection.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion, useInView } from 'framer-motion'; // framer-motion import

// PricingCard komponentinə motion əlavə edirik
const PricingCard = ({ plan, isPopular = false }) => {
    return (
        <motion.div // motion.div ilə bükülür
            className={`bg-white border ${isPopular ? 'border-2 border-indigo-500 shadow-lg' : 'border-gray-200 shadow-sm'} rounded-xl overflow-hidden pricing-card flex flex-col`}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }} // Hover animasiyası
            transition={{ type: "spring", stiffness: 300, damping: 10 }} // Keçid effekti
        >
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
                                <p className={`ml-3 text-base ${feature.included ? 'text-gray-700' : 'text-gray-500 line-through'}`}>{feature.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="p-6 bg-gray-50">
                <a
                    href={plan.buttonHref}
                    target="_blank" // Yeni səhifədə açmaq üçün
                    rel="noopener noreferrer" // Təhlükəsizlik üçün
                    className={`block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${isPopular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'} transition-colors duration-200`}
                >
                    {plan.buttonText}
                </a>
            </div>
        </motion.div>
    );
};

const Pricing = () => {
    const pricingPlans = [
        { name: 'Başlanğıc', price: '9$', period: '/ay', description: 'Kiçik bizneslər üçün mükəmməl başlanğıc', buttonText: 'İndi Başla', buttonHref: 'https://wa.me/994507726722', features: [{text: '1000 Analiz', included: true}, {text: 'Admin Dashboard', included: true}, {text: 'Yarı Avtomatik AI Asistant', included: true}, {text: 'Əsas İnteqrasiyalar', included: true}, {text: 'Comprehensive analytics', included: false}, {text: 'Avtomatik Səsli Mesaj Göndərmə', included: false}, {text: 'Priority support', included: false}] },
        { name: 'Professional', price: '29$', period: '/ay', description: 'Böyüməkdə olan bizneslər üçün güclü həllər', buttonText: 'İndi Başla', buttonHref: 'https://wa.me/994507726722', isPopular: true, features: [{text: 'Limitsiz Analiz', included: true}, {text: 'Admin Dashboard', included: true}, {text: 'Full Avtomatik AI Asistant', included: true}, {text: 'Bütün İnteqrasiyalar', included: true}, {text: 'Comprehensive analytics', included: true}, {text: 'Avtomatik Səsli Mesaj Göndərmə', included: false}, {text: 'Priority support', included: false}] },
        { name: 'Biznes', price: '49$', period: '/ay', description: 'Geniş miqyaslı əməliyyatlar üçün', buttonText: 'İndi Başla', buttonHref: 'https://wa.me/994507726722', features: [{text: 'Limitsiz Analiz', included: true}, {text: 'Admin Dashboard', included: true}, {text: 'Full Avtomatik AI Asistant', included: true}, {text: 'Bütün İnteqrasiyalar', included: true}, {text: 'Comprehensive analytics', included: true}, {text: 'Avtomatik Səsli Mesaj Göndərmə', included: true}, {text: 'Priority support', included: false}] },
        { name: 'Enterprise', price: 'Xüsusi', period: null, description: 'Böyük şirkətlər və korporasiyalar üçün', buttonText: 'Bizimlə Əlaqə Saxlayın', buttonHref: 'https://wa.me/994507726722', features: [{text: 'Limitsiz Analiz', included: true}, {text: 'Admin Dashboard', included: true}, {text: 'Full Avtomatik AI Asistant', included: true}, {text: 'Bütün İnteqrasiyalar', included: true}, {text: 'Comprehensive analytics', included: true}, {text: 'Avtomatik Səsli Mesaj Göndərmə', included: true}, {text: 'Priority support', included: true}] },
    ];

    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 }); // Saytda göründükdə bir dəfə animasiya etmək üçün

    // Animasiya variantları
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div id="pricing" className="bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Büdcənizə Uyğun Qiymət Paketini Seçin</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">Hər Müştəri üçün Düşünülmüş Şəffaf Qiymətlərdən Birini Seçərək Siz də Öz Biznesinizi Böyüdün.</p>
                </div>

                <div
                    ref={ref} // ref-i bu div-ə əlavə edirik
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch"
                >
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            transition={{ duration: 0.5, delay: index * 0.1 }} // Hər kart üçün kiçik gecikmə
                        >
                            <PricingCard plan={plan} isPopular={plan.isPopular} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pricing;