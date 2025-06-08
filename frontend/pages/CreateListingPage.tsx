
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListingForm from '../components/ListingForm';
import { ListingType } from '../types';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

interface CreateListingPageProps {
  listingType: ListingType;
}

const CreateListingPage: React.FC<CreateListingPageProps> = ({ listingType }) => {
  const navigate = useNavigate();
  const { currentUser, loading: authLoading } = useAuth();

  const handleSuccess = () => {
    // Navigate to the relevant listings page after successful creation
    navigate(listingType === ListingType.PROJECT ? '/projects' : '/internships');
  };

  if (authLoading) {
    return <LoadingSpinner message="Chargement utilisateur..." />;
  }

  if (!currentUser) {
    // This should ideally be caught by ProtectedRoute, but as a fallback:
    navigate('/auth');
    return <p>Veuillez vous connecter pour créer une publication.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <ListingForm 
        listingType={listingType} 
        currentUser={currentUser} 
        onSuccess={handleSuccess} 
      />
    </div>
  );
};

export default CreateListingPage;
