
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Listing, ListingType } from '../types';
import { apiService } from '../services/apiService';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

interface ListingsPageProps {
  listingType: ListingType;
}

const ListingsPage: React.FC<ListingsPageProps> = ({ listingType }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = listingType === ListingType.PROJECT 
          ? await apiService.getProjects() 
          : await apiService.getInternships();
        setListings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch listings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [listingType]);

  const pageTitle = listingType === ListingType.PROJECT ? 'Projets' : 'Offres de Stage';
  const createLink = listingType === ListingType.PROJECT ? '/projects/new' : '/internships/new';
  const createButtonText = listingType === ListingType.PROJECT ? 'Proposer/Publier un Projet' : 'Publier une Offre de Stage';

  if (isLoading) return <LoadingSpinner message={`Chargement des ${pageTitle.toLowerCase()}...`} />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white shadow-sm p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-sky-700">{pageTitle}</h1>
        {currentUser && (
          <Link to={createLink}>
            <Button variant="primary">{createButtonText}</Button>
          </Link>
        )}
      </header>

      {listings.length === 0 ? (
        <p className="text-center text-slate-500 py-10">
          Aucun {listingType === ListingType.PROJECT ? 'projet' : 'stage'} disponible pour le moment.
          {currentUser && ` Vous pouvez en créer un !`}
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingsPage;
