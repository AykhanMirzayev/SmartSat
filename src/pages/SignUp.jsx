// src/components/SignUp.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Şifrələr eyni deyil');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/'); // Redirect to homepage on successful signup
    } catch (e) {
      setError('Hesab yaradıla bilmədi. Zəhmət olmasa, yenidən cəhd edin.');
      console.error(e);
    }

    setLoading(false);
  }

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/" className="flex justify-center items-center">
            <FontAwesomeIcon icon={faBrain} className="text-white text-4xl mr-2" />
            <span className="text-4xl font-extrabold text-white">SmartSat</span>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Pulsuz hesab yaradın
          </h2>
        </div>
        <div className="bg-white rounded-xl shadow-xl p-8 space-y-6">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address" className="sr-only">E-poçt ünvanı</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="E-poçt ünvanı"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Şifrə</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Şifrə"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">Şifrəni təsdiqləyin</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Şifrəni təsdiqləyin"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Yaradılır...' : 'Qeydiyyat'}
              </button>
            </div>
          </form>
          <div className="text-sm text-center">
            <Link to="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
              Artıq hesabınız var? Giriş edin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;