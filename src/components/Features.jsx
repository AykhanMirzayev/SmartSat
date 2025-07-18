// src/components/FeaturesSection.jsx
import React, { useRef } from 'react'; // useRef import edildi
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faRobot, faMapMarkedAlt, faChartLine, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion, useInView } from 'framer-motion'; // motion və useInView import edildi

const FeatureCard = ({ icon, colorClass, title, children }) => (
  <motion.div // motion.div ilə bükülür
    className="bg-white p-8 rounded-xl shadow-md feature-card flex flex-col" // flex-col əlavə edildi ki, children düzgün yerləşsin
    whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }} // Hover animasiyası
    transition={{ type: "spring", stiffness: 300, damping: 10 }} // Keçid effekti
  >
    <div className="flex items-center mb-4">
      <div className="flex-shrink-0">
        <div className={`flex items-center justify-center h-12 w-12 rounded-md ${colorClass}`}>
          <FontAwesomeIcon icon={icon} className="text-xl" />
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
    </div>
    {children}
  </motion.div>
);

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-16">
        <motion.h2
          className="text-3xl font-extrabold text-gray-900 mb-4"
          variants={textVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Müştəri Təcrübənizi Yüksəltmək Üçün Əsas Xüsusiyyətlər
        </motion.h2>
        <motion.p
          className="text-xl text-gray-600 max-w-3xl mx-auto"
          variants={textVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ ...textVariants.visible.transition, delay: 0.2 }}
        >
          Süni İntellektlə Müştəri Dəstəyinizi Gücləndirin
        </motion.p>
      </div>

      <div
        ref={ref} // ref-i bu div-ə əlavə edirik
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <FeatureCard icon={faHeartbeat} colorClass="bg-indigo-100 text-indigo-600" title="Real Zamanlı Duyğu Analizi">
            <p className="text-gray-600">Süni intellekt dəstək söhbətlərində müştəri duyğularını (məyusluq, sevinc, qəzəb və s.) real vaxt rejimində müəyyən edir.</p>
          </FeatureCard>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FeatureCard icon={faRobot} colorClass="bg-green-100 text-green-600" title="Ağıllı Cavab Təklifləri">
            <p className="text-gray-600">AI müştəri mesajının kontekstinə və duyğusuna əsaslanaraq dəqiq və empatik cavablar təklif edir.</p>
          </FeatureCard>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FeatureCard icon={faMapMarkedAlt} colorClass="bg-red-100 text-red-600" title="Müştəri Səyahəti İzlənməsi">
            <p className="text-gray-600 mb-4">Hər bir müştərinin dəstək səyahətindəki vəziyyətini real vaxt rejimində izləyin ki, onların harada olduğunu dərhal edə biləsiniz.</p>
            <div className="flex justify-center"><div className="w-full bg-gray-100 rounded-lg p-2"><div className="flex justify-between text-xs text-gray-600 mb-1"><span>Purchase</span><span>Onboarding</span><span>Support</span><span>Renewal</span></div><div className="h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full"></div></div></div>
          </FeatureCard>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <FeatureCard icon={faChartLine} colorClass="bg-yellow-100 text-yellow-600" title="Komandanın Performans Göstəriciləri">
            <p className="text-gray-600 mb-4">Bütün dəstək komandanızın müştəri məmnuniyyəti və cavab keyfiyyətindəki inkişafları izləyin.</p>
            <div className="flex items-center"><div className="w-1/2"><div className="text-3xl font-bold text-indigo-600">4.8<span className="text-xl">/5</span></div><div className="text-sm text-gray-500">Ortalama Məmnuniyyət</div></div><div className="w-1/2"><div className="text-3xl font-bold text-green-600">+$25K</div><div className="text-sm text-gray-500">Aylıq Qazanc</div></div></div>
          </FeatureCard>
        </motion.div>
      </div>

      <div className="mt-12 text-center">
        <motion.a
          href="#demo"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:px-10 transition-colors duration-200"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Demo İzlə
          <FontAwesomeIcon icon={faArrowRight} className="ml-2 -mr-1 h-4 w-4" />
        </motion.a>
      </div>
    </div>
  );
};

export default Features;