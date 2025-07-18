// src/components/ContactSection.jsx
import React, { useRef } from 'react'; // useRef import edildi
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { motion, useInView } from 'framer-motion'; // motion və useInView import edildi
// FAQ from './FAQ'; // FAQSection-u bura daxil edirik (Bu sətri silin, artıq App.jsx-də ayrı komponentdir)

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    alert('Mesajınız göndərildi!');
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.3 } },
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.4 } },
  };

  return (
    <div id="contact" className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* FAQ Section is now part of the contact section wrapper */}
        <div className="text-center mt-24 mb-16">
          <motion.h2
            className="text-3xl font-extrabold text-gray-900 mb-4"
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Bizimlə Əlaqə
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ ...textVariants.visible.transition, delay: 0.2 }}
          >
            Suallarınız, təklifləriniz və ya əməkdaşlıq üçün bizimlə əlaqə saxlamaqdan çəkinməyin.
          </motion.p>
        </div>
        <div
          ref={ref} // ref-i bu div-ə əlavə edirik
          className="grid md:grid-cols-2 gap-12"
        >
          <motion.div
            className="bg-white rounded-lg p-8 shadow-xl"
            variants={formVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Bizə Yazın</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Adınız</label>
                <input type="text" name="name" id="name" autoComplete="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Emailiniz</label>
                <input type="email" name="email" id="email" autoComplete="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mesajınız</label>
                <div className="mt-1">
                  <textarea id="message" name="message" rows="4" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required></textarea>
                </div>
              </div>
              <div className="mt-6">
                <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Göndər
                </button>
              </div>
            </form>
          </motion.div>
          <motion.div
            className="text-center md:text-left"
            variants={infoVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Əlaqə Məlumatları</h3>
            <div className="space-y-4 text-gray-600">
              <p className="flex items-center justify-center md:justify-start"><FontAwesomeIcon icon={faPhoneAlt} className="text-indigo-600 mr-3" /><span>+994 50 332 71 03</span></p>
              <p className="flex items-center justify-center md:justify-start"><FontAwesomeIcon icon={faWhatsapp} className="text-green-500 mr-3" /><a href="https://wa.me/994503327103" className="hover:text-indigo-600">WhatsApp ilə əlaqə</a></p>
              <p className="flex items-center justify-center md:justify-start"><FontAwesomeIcon icon={faEnvelope} className="text-indigo-600 mr-3" /><a href="mailto:info@smartsat.az" className="hover:text-indigo-600">info@smartsat.az</a></p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;