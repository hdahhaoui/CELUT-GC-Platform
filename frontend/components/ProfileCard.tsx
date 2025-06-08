
import React from 'react';
import { UserProfile, UserType } from '../types';
import CardWrapper from './ui/CardWrapper';
import { DEFAULT_USER_PLACEHOLDER_IMAGE, DEFAULT_COMPANY_LOGO_PLACEHOLDER_IMAGE } from '../constants';

interface ProfileCardProps {
  profile: UserProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const isTeacher = profile.userType === UserType.TEACHER;
  const imageSrc = isTeacher 
    ? (profile.photoUrl || DEFAULT_USER_PLACEHOLDER_IMAGE)
    : (profile.logoUrl || DEFAULT_COMPANY_LOGO_PLACEHOLDER_IMAGE);

  return (
    <CardWrapper className="text-center">
      <div className="p-6">
        <img 
          src={imageSrc} 
          alt={profile.name} 
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md"
        />
        <h3 className="text-xl font-semibold text-sky-700 mb-1">{profile.name}</h3>
        <p className="text-sm text-slate-500 mb-2">{isTeacher ? 'Enseignant Chercheur' : 'Entreprise Partenaire'}</p>
        
        {isTeacher && profile.specialty && (
          <p className="text-slate-600 text-sm mb-1"><span className="font-medium">Spécialité:</span> {profile.specialty}</p>
        )}
        {isTeacher && profile.cvSummary && (
          <p className="text-slate-600 text-sm italic mb-3 line-clamp-2">"{profile.cvSummary}"</p>
        )}

        {!isTeacher && profile.sector && (
          <p className="text-slate-600 text-sm mb-1"><span className="font-medium">Secteur:</span> {profile.sector}</p>
        )}
        {!isTeacher && profile.website && (
          <a 
            href={profile.website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sky-600 hover:text-sky-800 hover:underline text-sm break-all"
          >
            {profile.website}
          </a>
        )}
        {!isTeacher && profile.description && (
             <p className="text-slate-600 text-sm mt-2 line-clamp-3">{profile.description}</p>
        )}
         <button className="mt-4 w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded transition-colors text-sm">
          Voir Profil
        </button>
      </div>
    </CardWrapper>
  );
};

export default ProfileCard;
