
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserType, ListingType } from '../types';
import Button from '../components/ui/Button';

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <p>Veuillez vous connecter pour accéder au tableau de bord.</p>;
  }

  return (
    <div className="space-y-8">
      <header className="bg-white shadow-md p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-sky-700">Tableau de bord</h1>
        <p className="text-slate-600">Bienvenue, {currentUser.name} ({currentUser.userType === UserType.TEACHER ? 'Enseignant' : 'Entreprise'}) !</p>
        {!currentUser.isValidated && (
            <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                <p className="font-bold">Compte en attente de validation</p>
                <p>Votre inscription est en cours de validation par un administrateur. Certaines fonctionnalités peuvent être limitées.</p>
            </div>
        )}
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-sky-600 mb-3">Mon Profil</h2>
          <p className="text-slate-500 text-sm mb-4">Gérez vos informations personnelles et professionnelles.</p>
          {/* <Link to={`/profile/${currentUser.id}`}> <Button variant="secondary">Voir / Modifier mon profil</Button> </Link> */}
          <Button variant="secondary" disabled>Voir / Modifier mon profil (Bientôt disponible)</Button>
        </div>
        
        {currentUser.userType === UserType.TEACHER && (
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-sky-600 mb-3">Proposer un Projet</h2>
            <p className="text-slate-500 text-sm mb-4">Partagez vos idées de projets avec les entreprises.</p>
            <Link to={`/projects/new`}>
                <Button variant="primary">Proposer un projet</Button>
            </Link>
          </div>
        )}

        {currentUser.userType === UserType.COMPANY && (
           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-sky-600 mb-3">Publier un Projet</h2>
            <p className="text-slate-500 text-sm mb-4">Soumettez des projets et sollicitez l'expertise des enseignants.</p>
            <Link to={`/projects/new`}>
                <Button variant="primary">Publier un projet</Button>
            </Link>
          </div>
        )}
        
        {currentUser.userType === UserType.COMPANY && (
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-sky-600 mb-3">Publier une Offre de Stage</h2>
            <p className="text-slate-500 text-sm mb-4">Trouvez des stagiaires talentueux pour votre entreprise.</p>
            <Link to={`/internships/new`}>
                <Button variant="primary">Publier un stage</Button>
            </Link>
          </div>
        )}

         <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-sky-600 mb-3">Mes Propositions / Offres</h2>
            <p className="text-slate-500 text-sm mb-4">Suivez l'état de vos projets et stages publiés.</p>
            <Button variant="secondary" disabled>Voir mes publications (Bientôt disponible)</Button>
        </div>
      </section>

      {/* Placeholder for future sections like notifications, applications received/sent */}
    </div>
  );
};

export default DashboardPage;
