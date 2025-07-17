// src/components/FeaturesSection.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faRobot, faMapMarkedAlt, faChartLine, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const FeatureCard = ({ icon, colorClass, title, children }) => (
  <div className="bg-white p-8 rounded-xl shadow-md feature-card transition duration-300">
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
  </div>
);

const Features = () => {
  return (
    <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Müştəri Təcrübənizi Yüksəltmək Üçün Əsas Xüsusiyyətlər</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Müştərilərinizi Anlamaq və Onlarla Bağlantı Qurmaq Üçün Güclü Vasitələr</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        <FeatureCard icon={faHeartbeat} colorClass="bg-purple-100 text-purple-600" title="Real Vaxt Əhval Analiz Etmə">
          <p className="text-gray-600 mb-4">Qabaqcıl duyğu təhlili mühərrikimiz sayəsində, müştərilərinizin məyusluqdan məmnuniyyətə qədər bütün emosiyalarını ani olaraq müəyyən edin.</p>
          <div className="sentiment-visualization mb-2"><div className="sentiment-marker" style={{ left: '70%' }}></div></div>
          <div className="flex justify-between text-xs text-gray-600"><span>Negative</span><span>Neutral</span><span>Positive</span></div>
        </FeatureCard>

        <FeatureCard icon={faRobot} colorClass="bg-blue-100 text-blue-600" title="Süni İntellektlə Gücləndirilmiş Cavab Verən Assistant">
          <p className="text-gray-600 mb-4">Artıq dəqiqələr yox, saniyələr içində mükəmməl, empatik cavablar hazırlayın. Süni intellektimiz hər bir müştərinin emosional vəziyyətinə uyğun cavablar təklif edir.</p>
          <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500"><p className="text-gray-800 text-sm">"Mən sizin məyusluğunuzu tamamilə başa düşürəm. İcazə verin bu məsələni şəxsən araşdırım..."</p></div>
        </FeatureCard>

        <FeatureCard icon={faMapMarkedAlt} colorClass="bg-green-100 text-green-600" title="Customer Journey Mapping">
          <p className="text-gray-600 mb-4">Müştəri ömrü dövrü boyunca duyğu dəyişikliklərini anlayın ki, əsas problemləri və inkişaf imkanlarını müəyyən edə biləsiniz.</p>
          <div className="flex justify-center"><div className="w-full bg-gray-100 rounded-lg p-2"><div className="flex justify-between text-xs text-gray-600 mb-1"><span>Purchase</span><span>Onboarding</span><span>Support</span><span>Renewal</span></div><div className="h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full"></div></div></div>
        </FeatureCard>

        <FeatureCard icon={faChartLine} colorClass="bg-yellow-100 text-yellow-600" title="Komandanın Performans Göstəriciləri">
           <p className="text-gray-600 mb-4">Bütün dəstək komandanızın müştəri məmnuniyyəti və cavab keyfiyyətindəki inkişafları izləyin.</p>
           <div className="flex items-center"><div className="w-1/2"><div className="text-3xl font-bold text-indigo-600">4.8<span className="text-xl">/5</span></div><div className="text-sm text-gray-500">Ortalama Məmnuniyyət</div></div><div className="w-1/2"><div className="text-3xl font-bold text-green-600">+25%</div><div className="text-sm text-gray-500">Müştəri Artımı</div></div></div>
        </FeatureCard>
      </div>

      <div className="mt-12 text-center">
        <a href="#" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          Bütün Funksiyanallığı Kəşf Edin <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </a>
      </div>
    </div>
  );
};

export default Features;