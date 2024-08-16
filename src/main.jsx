import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import { router } from './Routers/Routers';

import {
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Auth/Provider/AuthProvider';



import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
