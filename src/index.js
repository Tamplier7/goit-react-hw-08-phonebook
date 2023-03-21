import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import { BrowserRouter } from 'react-router-dom';

import { ChakraProvider, theme, ColorModeProvider } from '@chakra-ui/react'
import './index.css';

import { Provider } from 'react-redux';
import { store, persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <ColorModeProvider>
            <BrowserRouter  basename="/goit-react-hw-08-phonebook">
              <App />
            </BrowserRouter>
          </ColorModeProvider>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
