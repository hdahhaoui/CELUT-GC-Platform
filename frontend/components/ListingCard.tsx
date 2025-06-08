
import React from 'react';
import { Listing, ListingType, Project, Internship, UserType } from '../types';
import CardWrapper from './ui/CardWrapper';
import { DEFAULT_LISTING_IMAGE }
 from '../constants';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const isProject = listing.listingType === ListingType.PROJECT;
  const project = isProject ? listing as Project : null;
  const internship = !isProject ? listing as Internship : null;

  const postedByPrefix = listing.postedBy.userType === UserType.TEACHER ? "Prof." : "Ent.";

  return (
    <CardWrapper className="flex flex-col h-full">
      <img src={DEFAULT_LISTING_IMAGE} alt={listing.title} className="w-full h-48 object-cover"/>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-sky-700 mb-2">{listing.title}</h3>
        <p className="text-xs text-slate-500 mb-1">Publié par: <span className="font-medium">{postedByPrefix} {listing.postedBy.name}</span></p>
        <p className="text-xs text-slate-500 mb-3">Le: {new Date(listing.datePosted).toLocaleDateString()}</p>
        
        <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">{listing.description}</p>

        {isProject && project && (
          <div className="text-xs space-y-1 mb-3">
            <p><span className="font-semibold">Type:</span> {project.projectType === 'proposal' ? 'Proposition' : 'Offre'}</p>
            <p><span className="font-semibold">Statut:</span> <span className={`px-2 py-0.5 rounded-full text-white text-xs ${project.status === 'open' ? 'bg-green-500' : project.status === 'in_progress' ? 'bg-yellow-500' : 'bg-red-500'}`}>{project.status}</span></p>
            {project.category && <p><span className="font-semibold">Catégorie:</span> {project.category}</p>}
          </div>
        )}

        {!isProject && internship && (
          <div className="text-xs space-y-1 mb-3">
             <p><span className="font-semibold">Entreprise:</span> {internship.companyName}</p>
            {internship.level && <p><span className="font-semibold">Niveau:</span> {internship.level}</p>}
            {internship.location && <p><span className="font-semibold">Lieu:</span> {internship.location}</p>}
            {internship.startDate && <p><span className="font-semibold">Début:</span> {new Date(internship.startDate).toLocaleDateString()}</p>}
          </div>
        )}
        
        {listing.tags && listing.tags.length > 0 && (
          <div className="mb-4">
            {listing.tags.map(tag => (
              <span key={tag} className="inline-block bg-sky-100 text-sky-700 text-xs font-semibold mr-2 mb-1 px-2.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        <button className="mt-auto w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded transition-colors text-sm">
          Voir Détails
        </button>
      </div>
    </CardWrapper>
  );
};

export default ListingCard;
