
import React, { useState } from 'react';
import { ListingType, NewListingData, ProjectType, ProjectStatus, UserProfile } from '../types';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Select from './ui/Select';
import Button from './ui/Button';
import { apiService } from '../services/apiService'; // Assuming you have an apiService for submissions

interface ListingFormProps {
  listingType: ListingType;
  currentUser: UserProfile; // Needed to associate the listing with the user
  onSuccess: () => void; // Callback on successful submission
}

const ListingForm: React.FC<ListingFormProps> = ({ listingType, currentUser, onSuccess }) => {
  const [formData, setFormData] = useState<NewListingData>({
    title: '',
    description: '',
    tags: '', // Comma-separated
    ...(listingType === ListingType.PROJECT && { projectType: ProjectType.PROPOSAL, status: ProjectStatus.OPEN, category: '' }),
    ...(listingType === ListingType.INTERNSHIP && { level: '', startDate: '', endDate: '', location: '' }),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (listingType === ListingType.PROJECT) {
        await apiService.createProject({ ...formData, projectType: formData.projectType!, status: formData.status! }, currentUser);
      } else {
        await apiService.createInternship(formData, currentUser);
      }
      setIsLoading(false);
      onSuccess(); // Call parent's success handler (e.g., navigate or show message)
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    }
  };
  
  const commonFields = (
    <>
      <Input label="Titre *" name="title" value={formData.title} onChange={handleChange} required />
      <Textarea label="Description détaillée *" name="description" value={formData.description} onChange={handleChange} required />
      <Input label="Mots-clés (séparés par des virgules)" name="tags" value={formData.tags} onChange={handleChange} placeholder="Ex: béton armé, modélisation, stage PFE" />
    </>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-sky-700 mb-6">
        {listingType === ListingType.PROJECT ? 'Publier un Nouveau Projet' : 'Publier une Nouvelle Offre de Stage'}
      </h2>
      
      {commonFields}

      {listingType === ListingType.PROJECT && (
        <>
          <Select
            label="Type de Projet *"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            options={[
              { value: ProjectType.PROPOSAL, label: 'Proposition de projet (par Enseignant)' },
              { value: ProjectType.OFFER, label: 'Offre de projet (par Entreprise)' },
            ]}
            required
          />
          <Input label="Catégorie (Optionnel)" name="category" value={formData.category} onChange={handleChange} placeholder="Ex: Recherche, Développement, Étude de cas"/>
           <Select
            label="Statut *"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={[
              { value: ProjectStatus.OPEN, label: 'Ouvert' },
              { value: ProjectStatus.IN_PROGRESS, label: 'En cours' },
              { value: ProjectStatus.CLOSED, label: 'Fermé' },
            ]}
            required
          />
        </>
      )}

      {listingType === ListingType.INTERNSHIP && (
        <>
          <Input label="Niveau d'études requis (Optionnel)" name="level" value={formData.level} onChange={handleChange} placeholder="Ex: Master 2, Licence 3"/>
          <Input label="Date de début (Optionnel)" name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
          <Input label="Date de fin (Optionnel)" name="endDate" type="date" value={formData.endDate} onChange={handleChange} />
          <Input label="Lieu du stage (Optionnel)" name="location" value={formData.location} onChange={handleChange} placeholder="Ex: Tlemcen, À distance"/>
        </>
      )}
      
      {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}

      <Button type="submit" variant="primary" className="w-full" isLoading={isLoading} disabled={isLoading}>
        Publier
      </Button>
    </form>
  );
};

export default ListingForm;
