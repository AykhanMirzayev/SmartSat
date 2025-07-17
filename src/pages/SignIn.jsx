import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // Make sure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();

  // This function sets up the reCAPTCHA verifier required by Firebase
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved
        }
      });
    }
  };

  // Step 1: Send the verification code to the user's phone
  async function handleSendCode(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      setShowOtpInput(true); // Show the OTP input field
      setLoading(false);
    } catch (err) {
      setError('Kod göndərilə bilmədi. Nömrəni yoxlayın və ya sonra yenidən cəhd edin.');
      console.error(err);
      setLoading(false);
    }
  }

  // Step 2: Verify the code and sign the user in
  async function handleVerifyOtp(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!confirmationResult) {
        setError("Doğrulama prosesi tapılmadı. Zəhmət olmasa, yenidən başlayın.");
        setLoading(false);
        return;
    }

    try {
      await confirmationResult.confirm(otp);
      navigate('/'); // On success, redirect to the homepage
    } catch (err) {
      setError('Kod səhvdir. Zəhmət olmasa, yenidən cəhd edin.');
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* This empty div is required for the invisible reCAPTCHA */}
      <div id="recaptcha-container"></div>
      
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/" className="flex justify-center items-center">
            <FontAwesomeIcon icon={faBrain} className="text-white text-4xl mr-2" />
            <span className="text-4xl font-extrabold text-white">SmartSat</span>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Telefon nömrəsi ilə daxil olun
          </h2>
        </div>
        <div className="bg-white rounded-xl shadow-xl p-8 space-y-6">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
          
          {!showOtpInput ? (
            // Form for entering phone number
            <form className="space-y-6" onSubmit={handleSendCode}>
              <div>
                <label htmlFor="phone-number" className="sr-only">Telefon Nömrəsi</label>
                <input
                  id="phone-number"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Telefon Nömrəsi (nümunə: +994501234567)"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div>
                <button
                  disabled={loading}
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Göndərilir...' : 'Doğrulama Kodu Göndər'}
                </button>
              </div>
            </form>
          ) : (
            // Form for entering the OTP
            <form className="space-y-6" onSubmit={handleVerifyOtp}>
              <div className="text-center text-sm text-gray-600">
                <p>{phoneNumber} nömrəsinə göndərilən kodu daxil edin.</p>
              </div>
              <div>
                <label htmlFor="otp" className="sr-only">Doğrulama Kodu</label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="6 rəqəmli kod"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div>
                <button
                  disabled={loading}
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Doğrulanır...' : 'Təsdiq Et və Giriş'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;