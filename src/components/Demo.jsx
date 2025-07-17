import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
    const [error, setError] = useState('');

    const translate = (category, value) => {
        if (!value) return 'N/A';
        const lowerCaseValue = value.toLowerCase();
        return translations[category]?.[lowerCaseValue] || value;
    };

    const getSentimentColor = (sentiment) => {
        if (!sentiment) return 'text-gray-600';
        const lowerSentiment = sentiment.toLowerCase();
        if (lowerSentiment.includes('negative') || lowerSentiment.includes('neqativ')) return 'text-red-600';
        if (lowerSentiment.includes('positive') || lowerSentiment.includes('pozitiv')) return 'text-green-600';
        return 'text-gray-600';
    };

    const handleAnalyze = async () => {
        // ... handleAnalyze funksiyasının məzmununda dəyişiklik yoxdur ...
        if (!message.trim()) {
            setError("Zəhmət olmasa, analiz etmək üçün bir mesaj daxil edin.");
            return;
        }
        if (!API_KEY) {
            setError("Gemini API açarı konfiqurasiya edilməyib. .env faylını və VITE_ prefiksini yoxlayın.");
            console.error("Gemini API key is missing.");
            return;
        }

        setIsLoading(true);
        setResults(null);
        setError('');

        try {
            const analysisPrompt = `Analyze the sentiment, tone, and urgency of the following customer message. Return ONLY a valid JSON object with keys "sentiment", "tone", and "urgency". Do not include any other text outside the JSON. Message: "${message}"`;
            const analysisPayload = {
                contents: [{ parts: [{ text: analysisPrompt }] }],
                generationConfig: { responseMimeType: "application/json" },
            };
            const analysisRes = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(analysisPayload) });
            
            if (!analysisRes.ok) {
                const errorBody = await analysisRes.text();
                console.error("API Error Body:", errorBody);
                throw new Error(`Analiz sorğusu uğursuz oldu: ${analysisRes.status} ${analysisRes.statusText}`);
            }

            const analysisData = await analysisRes.json();
            const analysisText = analysisData?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!analysisText) {
                console.error("API analiz üçün etibarlı cavab qaytarmadı:", analysisData);
                throw new Error("API analiz üçün məzmun qaytarmadı. Təhlükəsizlik filtrləri aktiv ola bilər.");
            }
            const cleanedText = analysisText.replace(/^```json\s*/, '').replace(/```$/, '');
            const analysisJson = JSON.parse(cleanedText);

            const responsePrompt = `You are Sentimental AI, an expert in customer support in Azerbaijani. A customer wrote: "${message}". Draft a warm, helpful, and human-like response in Azerbaijani that acknowledges their feelings and clearly states the next steps. Do not sound like a robot. Ensure the response is clear and actionable.`;
            const responsePayload = { contents: [{ parts: [{ text: responsePrompt }] }] };
            const responseRes = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(responsePayload) });
            if (!responseRes.ok) throw new Error(`Cavab təklifi sorğusu uğursuz oldu: ${responseRes.statusText}`);
            
            const responseData = await responseRes.json();
            const suggestedResponse = responseData?.candidates?.[0]?.content?.parts?.[0]?.text;
            
            setResults({ ...analysisJson, suggestedResponse });
        } catch (err) {
            console.error("API sorğusu zamanı xəta baş verdi:", err);
            setError("Analiz zamanı xəta baş verdi. Detallar üçün brauzer konsoluna baxın.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // JSX Məzmunu (heç bir dəyişiklik yoxdur)
        <div id="demo" className="bg-gray-50 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-start">
                    
                    <div className="mb-12 lg:mb-0">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
                            Asistantı İş Üzərində Görün
                        </h2>
                        <p className="text-xl text-gray-600">
                            Asistantımızın müştəri duyğularını necə təhlil etdiyini və empatik cavablar təklif etdiyini görmək üçün interaktiv demomuzu sınaqdan keçirin.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-xl">
                        <div className="mb-4">
                            <label htmlFor="demo-message" className="block text-sm font-medium text-gray-700 mb-2">
                                Bir Müştəri Cavabını Yapışdırın...
                            </label>
                            <textarea 
                                id="demo-message" 
                                rows="3"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 border"
                                placeholder="Məsələn: Mən sizin xidmətlərinizdən məmnun deyiləm..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <button 
                            onClick={handleAnalyze}
                            disabled={isLoading || !message}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <><FontAwesomeIcon icon={faSpinner} className="fa-spin mr-2" /> Analiz edilir...</> : "Mesajı Analiz Et"}
                        </button>
                        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                        
                        {results && (
                            <div id="demo-results" className="mt-6 border-t pt-4">
                                <h3 className="font-bold text-gray-900 mb-4">Analizin Nəticəsi:</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4 text-center">
                                    <div className="bg-gray-100 p-2 rounded">
                                        <div className="text-xs text-gray-500">Emosiya</div>
                                        <div className={`font-bold ${getSentimentColor(results.sentiment)}`}>
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
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Demo;