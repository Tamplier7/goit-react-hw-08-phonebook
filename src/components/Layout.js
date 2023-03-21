import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Navigation } from 'components/Navigation/Navigation';
import { Container } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Layout = () => {
  return (
    <>
      <Navigation />
      <Container maxW='container.xl' pt={4} pb={5}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        theme="colored"
        hideProgressBar="true"/>
    </>
  );
};