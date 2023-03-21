import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/useAuth';

import { Layout } from './Layout';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { current } from 'redux/auth/authOperations';
import { Preloader } from './Preloader/Preloader';

const RegistrationPage = lazy(() => import('pages/RegistrationPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const ContactsPage = lazy(() => import('pages/ContactsPage'));
const NotFound = lazy(() => import('pages/NotFound'));


export default function App() {

  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  return isRefreshing ? (
    <div
      style={{
        minHeight: 'calc(100vh - 50px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Preloader />
    </div>
  )
    : ( 
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/login" />}></Route>      
        <Route path="/login" element={<RestrictedRoute redirectTo='/contacts' component={<LoginPage />} />} />
        <Route path="/register" element={<RestrictedRoute redirectTo='/contacts' component={<RegistrationPage />} />} />
        <Route path="/contacts" element={<PrivateRoute redirectTo='/login' component={<ContactsPage />} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    );
}