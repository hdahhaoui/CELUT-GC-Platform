
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Input from './ui/Input';
import Button from './ui/Button';
import Select from './ui/Select';
import Textarea from './ui/Textarea';
import { UserType, RegistrationData } from '../types';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSuccess: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSuccess }) => {
  const { login, register, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For registration: person name or company name
  const [userType, setUserType] = useState<UserType>(UserType.TEACHER);
  const [description, setDescription] = useState(''); // Common description
  const [specialty, setSpecialty] = useState(''); // Teacher specific
  const [sector, setSector] = useState(''); // Company specific
  const [website, setWebsite] = useState(''); // Company specific

  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    if (mode === 'login') {
      if (!email || !password) {
        setFormError("Email et mot de passe sont requis.");
        return;
      }
      try {
        await login({ email, pass: password });
        onSuccess();
      } catch (err) {
         // Error is handled by useAuth hook and displayed via its `error` state
      }
    } else { // Register mode
      if (!email || !password || !name || !description) {
        setFormError("Veuillez remplir tous les champs obligatoires (*).");
        return;
      }
      const registrationData: RegistrationData = {
        email,
        password,
        name,
        userType,
        description,
        ...(userType === UserType.TEACHER && { specialty }),
        ...(userType === UserType.COMPANY && { sector, website }),
      };
      try {
        await register(registrationData);
        setSuccessMessage("Inscription soumise avec succès ! Veuillez attendre la validation par l'administration. Vous recevrez un email une fois votre compte approuvé.");
        // Clear form or redirect as needed after success message
        setEmail(''); setPassword(''); setName(''); setDescription(''); setSpecialty(''); setSector(''); setWebsite('');
        // onSuccess(); // Might not redirect immediately, show message instead
      } catch (err) {
        // Error is handled by useAuth hook
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email *"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Mot de passe *"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {mode === 'register' && (
        <>
          <Input
            label="Nom complet (Enseignant) / Nom de l'entreprise *"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Select
            label="Type de compte *"
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value as UserType)}
            options={[
              { value: UserType.TEACHER, label: 'Enseignant' },
              { value: UserType.COMPANY, label: 'Entreprise' },
            ]}
            required
          />
          <Textarea
            label="Description (brève présentation) *"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {userType === UserType.TEACHER && (
            <Input
              label="Spécialité(s)"
              id="specialty"
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              placeholder="Ex: Génie Civil, Structures, Hydraulique"
            />
          )}
          {userType === UserType.COMPANY && (
            <>
              <Input
                label="Secteur d'activité"
                id="sector"
                type="text"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                placeholder="Ex: BTP, Ingénierie, Consulting"
              />
              <Input
                label="Site Web (Optionnel)"
                id="website"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://www.exemple.com"
              />
            </>
          )}
        </>
      )}
      
      {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
      {formError && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{formError}</p>}
      {successMessage && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md">{successMessage}</p>}

      <Button type="submit" variant="primary" className="w-full" isLoading={loading} disabled={loading || !!successMessage}>
        {mode === 'login' ? 'Se connecter' : "S'inscrire"}
      </Button>
    </form>
  );
};

export default AuthForm;
