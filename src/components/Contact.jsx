// src/components/ContactSection.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import FAQ from './FAQ'; // FAQSection-u bura daxil edirik

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    alert('Mesajınız göndərildi!');
  };

  return (
    <div id="contact" className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* FAQ Section is now part of the contact section wrapper */}
        <div className="text-center mt-24 mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Bizimlə Əlaqə</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Suallarınız, təklifləriniz və ya əməkdaşlıq üçün bizimlə əlaqə saxlamaqdan çəkinməyin.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg p-8 shadow-xl">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Ad</label>
                  <div className="mt-1"><input type="text" name="first-name" id="first-name" autoComplete="given-name" className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" /></div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Soyad</label>
                  <div className="mt-1"><input type="text" name="last-name" id="last-name" autoComplete="family-name" className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" /></div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1"><input id="email" name="email" type="email" autoComplete="email" className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" /></div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mesaj</label>
                  <div className="mt-1"><textarea id="message" name="message" rows="4" className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"></textarea></div>
                </div>
              </div>
              <div className="mt-6">
                <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Göndər
                </button>
              </div>
            </form>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Əlaqə Məlumatları</h3>
            <div className="space-y-4 text-gray-600">
              <p className="flex items-center justify-center md:justify-start"><FontAwesomeIcon icon={faPhoneAlt} className="text-indigo-600 mr-3" /><span>+994 50 332 71 03</span></p>
              <p className="flex items-center justify-center md:justify-start"><FontAwesomeIcon icon={faWhatsapp} className="text-green-500 mr-3" /><a href="https://wa.me/994503327103" className="hover:text-indigo-600">WhatsApp ilə əlaqə</a></p>
              <p className="flex items-center justify-center md:justify-start"><FontAwesomeIcon icon={faEnvelope} className="text-indigo-600 mr-3" /><a href="mailto:Smartsat.official@gmail.com" className="hover:text-indigo-600">Smartsat.official@gmail.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;