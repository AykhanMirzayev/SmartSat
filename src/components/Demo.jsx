import React, { useState, useRef } from 'react'; // useRef import edildi
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { motion, useInView } from 'framer-motion'; // motion və useInView import edildi

// API açarını .env faylından oxuyun
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

// Tərcümə lüğəti
const translations = {
    sentiment: {
        positive: 'Pozitiv',
        negative: 'Neqativ',
        neutral: 'Neytral'
    },
    urgency: {
        high: 'Yüksək',
        medium: 'Orta',
        low: 'Aşağı',
        'not urgent': 'Təcili deyil' 
    },
    tone: {
        frustrated: 'Məyus',
        happy: 'Xoşbəxt',
        inquisitive: 'Maraqlanan',
        angry: 'Əsəbi',
        sad: 'Qəmgin',
        appreciative: 'Minətdar',
        complaining: 'Şikayətçi',
        criticial: 'Tənqidi',
        satisfied: 'Məmnun'
    }
};

const Demo = () => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const translate = (category, value) => {
        return translations[category]?.[value.toLowerCase()] || value;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResults(null);
        setError(null);

        try {
            const prompt = `Aşağıdakı müştəri mesajını təhlil edin və cavab olaraq bir JSON obyekti qaytarın. JSON obyekti aşağıdakı sahələri ehtiva etməlidir:\n\n1.  **sentiment**: mesajın ümumi duyğusunu ('positive', 'negative', 'neutral').\n2.  **urgency**: mesajın təcililik səviyyəsini ('high', 'medium', 'low', 'not urgent').\n3.  **tone**: müştərinin ifadə etdiyi əsas tonu ('frustrated', 'happy', 'inquisitive', 'angry', 'sad', 'appreciative', 'complaining', 'criticial', 'satisfied').\n4.  **suggestedResponse**: mesajın kontekstinə və duyğusuna uyğun, müştəriyə veriləcək təklif olunan cavab.\n\nMüştəri mesajı: "${message}"\n\nNümunə cavab JSON:\n\`\`\`json\n{\n    "sentiment": "negative",\n    "urgency": "high",\n    "tone": "frustrated",\n    "suggestedResponse": "Hörmətli müştəri, narahatlığınız üçün üzr istəyirik. Probleminizi dərhal araşdırıb sizə kömək edəcəyik."\n}\n\`\`\`\n\nQeyd: Cavabı yalnız JSON obyekti kimi qaytarın, əlavə mətn və ya izahlar daxil etməyin. Yalnız JSON formatında cavab verin, heç bir 'json' markdown etiketi istifadə etməyin. JSON cavabınızı birbaşa qaytarın.`;


            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error: ${response.status} - ${errorData.error.message}`);
            }

            const data = await response.json();
            
            // Extract content and attempt to parse JSON
            let responseText = data.candidates[0]?.content?.parts[0]?.text;
            console.log("Raw API Response Text:", responseText);

            // Clean the response text: remove Markdown code blocks if present
            responseText = responseText.replace(/```json\n|```/g, '').trim();

            const parsedResults = JSON.parse(responseText);
            setResults(parsedResults);

        } catch (err) {
            console.error("Error processing message:", err);
            setError("Mesaj işlənərkən bir xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin. Detallar: " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    const formVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut", delay: 0.3 } },
    };

    return (
        <div id="demo" className="bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-3xl font-extrabold text-gray-900 mb-4"
                        variants={textVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        SmartSat-ın Necə İşlədiyini Test Edin
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                        variants={textVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ ...textVariants.visible.transition, delay: 0.2 }}
                    >
                        Bir müştəri mesajı daxil edin və süni intellektimizin onu necə təhlil etdiyini görün.
                    </motion.p>
                </div>

                <motion.div
                    ref={ref} // ref-i bu div-ə əlavə edirik
                    className="max-w-3xl mx-auto bg-gray-50 rounded-xl shadow-xl p-6 md:p-8"
                    variants={formVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                Müştəri Mesajı:
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Məsələn: 'Sifarişim niyə hələ çatdırılmayıb?!'"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                disabled={isLoading}
                            ></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} spin className="mr-3" />
                                        Təhlil Edilir...
                                    </>
                                ) : (
                                    'Mesajı Təhlil Et'
                                )}
                            </button>
                        </div>
                    </form>

                    {error && (
                        <motion.div
                            className="mt-6 p-4 bg-red-100 text-red-700 rounded-md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="font-medium">Xəta:</p>
                            <p>{error}</p>
                        </motion.div>
                    )}

                    {results && (
                        <motion.div
                            className="mt-6 p-6 bg-white rounded-lg shadow-md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Təhlil Nəticələri:</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                <div className="bg-gray-100 p-2 rounded">
                                    <div className="text-xs text-gray-500">Duyğu</div>
                                    <div className="font-bold text-indigo-600">
                                        {translate('sentiment', results.sentiment)}
                                    </div>
                                </div>
                                <div className="bg-gray-100 p-2 rounded">
                                    <div className="text-xs text-gray-500">Ton</div>
                                    <div className="font-bold text-indigo-600">
                                        {translate('tone', results.tone)}
                                    </div>
                                </div>
                                <div className="bg-gray-100 p-2 rounded">
                                    <div className="text-xs text-gray-500">Təcililik</div>
                                    <div className="font-bold text-indigo-600">
                                        {translate('urgency', results.urgency)}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="text-sm font-medium text-gray-900 mb-2">Uyğun Görülən Cavab:</div>
                                <div className="bg-indigo-50 rounded-lg p-3 text-gray-800 text-sm">
                                    <p>{results.suggestedResponse || 'Cavab təklifi yaradıla bilmədi.'}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Demo;