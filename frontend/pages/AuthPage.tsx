
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  const from = location.state?.from?.pathname || "/dashboard";

  React.useEffect(() => {
    if (currentUser) {
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, from]);

  const handleSuccess = () => {
    // For login, AuthForm triggers navigation via useAuth context update.
    // For registration, AuthForm shows a success message and user stays on page.
    // If login is successful, this will navigate away due to useEffect above.
    if (mode === 'login') {
        navigate(from, { replace: true });
    }
    // For registration, message is handled in AuthForm. We could clear form or offer to login.
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-sky-700">
            {mode === 'login' ? 'Connectez-vous à votre compte' : 'Créez un nouveau compte'}
          </h2>
        </div>
        
        <div className="flex justify-center border-b border-slate-200">
            <button 
                onClick={() => setMode('login')}
                className={`px-4 py-2 text-sm font-medium ${mode === 'login' ? 'border-b-2 border-sky-600 text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
                Connexion
            </button>
            <button 
                onClick={() => setMode('register')}
                className={`px-4 py-2 text-sm font-medium ${mode === 'register' ? 'border-b-2 border-sky-600 text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
                Inscription
            </button>
        </div>

        <AuthForm mode={mode} onSuccess={handleSuccess} />
        
        <p className="mt-4 text-center text-sm text-slate-600">
          {mode === 'login' ? (
            <>
              Pas encore de compte ?{' '}
              <button onClick={() => setMode('register')} className="font-medium text-sky-600 hover:text-sky-500">
                Inscrivez-vous
              </button>
            </>
          ) : (
            <>
              Déjà un compte ?{' '}
              <button onClick={() => setMode('login')} className="font-medium text-sky-600 hover:text-sky-500">
                Connectez-vous
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
