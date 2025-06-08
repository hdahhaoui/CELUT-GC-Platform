
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ListingsPage from './pages/ListingsPage';
import CreateListingPage from './pages/CreateListingPage';
import ProfilesPage from './pages/ProfilesPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import { ListingType, UserTypeFilter } from './types';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          
          <Route path="/projects" element={<ListingsPage listingType={ListingType.PROJECT} />} />
          <Route path="/internships" element={<ListingsPage listingType={ListingType.INTERNSHIP} />} />
          
          <Route path="/teachers" element={<ProfilesPage userTypeFilter={UserTypeFilter.TEACHER} />} />
          <Route path="/companies" element={<ProfilesPage userTypeFilter={UserTypeFilter.COMPANY} />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/projects/new" element={<CreateListingPage listingType={ListingType.PROJECT} />} />
            <Route path="/internships/new" element={<CreateListingPage listingType={ListingType.INTERNSHIP} />} />
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
