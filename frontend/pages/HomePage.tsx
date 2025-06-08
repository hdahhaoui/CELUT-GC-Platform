
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { APP_NAME } from '../constants';

const HomePage: React.FC = () => {
  return (
    <div className="text-center py-12">
      <header className="mb-12">
        <h1 className="text-5xl font-bold text-sky-700 mb-4">Bienvenue sur {APP_NAME}</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          La plateforme de collaboration entre le Département de Génie Civil de l'Université de Tlemcen et le monde socio-économique.
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold text-sky-600 mb-3">Projets Innovants</h2>
          <p className="text-slate-600 mb-4">Découvrez ou proposez des projets de recherche, développement et études techniques.</p>
          <Link to="/projects">
            <Button variant="primary">Voir les Projets</Button>
          </Link>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold text-sky-600 mb-3">Opportunités de Stage</h2>
          <p className="text-slate-600 mb-4">Entreprises, publiez vos offres. Étudiants (via enseignants), trouvez des stages formateurs.</p>
          <Link to="/internships">
            <Button variant="primary">Voir les Stages</Button>
          </Link>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold text-sky-600 mb-3">Réseau d'Experts</h2>
          <p className="text-slate-600 mb-4">Connectez-vous avec des enseignants chercheurs et des entreprises leaders du secteur.</p>
          <Link to="/teachers">
             <Button variant="secondary" className="mr-2">Nos Enseignants</Button>
          </Link>
           <Link to="/companies">
            <Button variant="secondary">Nos Entreprises</Button>
          </Link>
        </div>
      </section>

      <section className="bg-sky-50 p-10 rounded-lg shadow">
        <h2 className="text-3xl font-semibold text-sky-700 mb-6">Comment ça marche ?</h2>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div>
            <h3 className="text-xl font-medium text-sky-600 mb-2">Pour les Enseignants</h3>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>Inscrivez-vous et complétez votre profil.</li>
              <li>Proposez des sujets de projets innovants.</li>
              <li>Consultez les projets et besoins des entreprises.</li>
              <li>Encadrez des étudiants pour des stages et projets.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium text-sky-600 mb-2">Pour les Entreprises</h3>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>Créez le profil de votre entreprise.</li>
              <li>Publiez vos offres de projets et de stages.</li>
              <li>Sollicitez l'expertise des enseignants chercheurs.</li>
              <li>Identifiez de futurs talents parmi les étudiants.</li>
            </ul>
          </div>
        </div>
         <Link to="/auth" className="mt-8 inline-block">
            <Button variant="success" className="text-lg px-8 py-3">Rejoignez la plateforme</Button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
