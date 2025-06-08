
import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserProfile, UserTypeFilter } from '../types';
import { apiService } from '../services/apiService';

interface ProfilesPageProps {
  userTypeFilter: UserTypeFilter.TEACHER | UserTypeFilter.COMPANY;
}

const ProfilesPage: React.FC<ProfilesPageProps> = ({ userTypeFilter }) => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await apiService.getUsers(userTypeFilter);
        setProfiles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch profiles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [userTypeFilter]);

  const pageTitle = userTypeFilter === UserTypeFilter.TEACHER ? 'Nos Enseignants Chercheurs' : 'Nos Entreprises Partenaires';

  if (isLoading) return <LoadingSpinner message={`Chargement des ${userTypeFilter === UserTypeFilter.TEACHER ? 'enseignants' : 'entreprises'}...`} />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="space-y-8">
      <header className="bg-white shadow-sm p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-sky-700">{pageTitle}</h1>
      </header>

      {profiles.length === 0 ? (
        <p className="text-center text-slate-500 py-10">
          Aucun profil {userTypeFilter === UserTypeFilter.TEACHER ? 'd\'enseignant' : 'd\'entreprise'} trouvé pour le moment.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {profiles.map(profile => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilesPage;
