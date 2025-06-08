
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { APP_NAME } from '../constants';
import { UserType } from '../types';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-sky-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-sky-200 transition-colors">
          {APP_NAME}
        </Link>
        <div className="space-x-4 flex items-center">
          <NavLink to="/" className={({isActive}) => isActive ? "font-semibold" : "hover:text-sky-200"}>Accueil</NavLink>
          <NavLink to="/projects" className={({isActive}) => isActive ? "font-semibold" : "hover:text-sky-200"}>Projets</NavLink>
          <NavLink to="/internships" className={({isActive}) => isActive ? "font-semibold" : "hover:text-sky-200"}>Stages</NavLink>
          <NavLink to="/teachers" className={({isActive}) => isActive ? "font-semibold" : "hover:text-sky-200"}>Enseignants</NavLink>
          <NavLink to="/companies" className={({isActive}) => isActive ? "font-semibold" : "hover:text-sky-200"}>Entreprises</NavLink>
          {currentUser ? (
            <>
              <NavLink to="/dashboard" className={({isActive}) => isActive ? "font-semibold" : "hover:text-sky-200"}>Tableau de bord</NavLink>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition-colors">Déconnexion</button>
            </>
          ) : (
            <NavLink to="/auth" className="bg-emerald-500 hover:bg-emerald-600 px-3 py-1 rounded transition-colors">Connexion / Inscription</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 py-8 text-center">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} {APP_NAME} - Université de Tlemcen, Département de Génie Civil.</p>
        <p className="text-sm mt-1">Plateforme de Connexion Entreprises-Laboratoires.</p>
      </div>
    </footer>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
