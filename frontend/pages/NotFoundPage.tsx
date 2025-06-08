
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-sky-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-slate-700 mb-6">Page non trouvée</h2>
      <p className="text-slate-500 mb-8">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/">
        <Button variant="primary">Retour à l'accueil</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
