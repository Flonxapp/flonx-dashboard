import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  
  RouterProvider,
} from "react-router-dom";
import { router } from './routes/Router';

import { Provider } from 'react-redux';
import { persistor, store } from './page/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import PageLoader from './components/PageLoader';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<PageLoader fullScreen />}>
          <RouterProvider router={router} />
        </Suspense>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
