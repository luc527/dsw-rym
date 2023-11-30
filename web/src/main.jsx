import React from 'react'
import ReactDOM from 'react-dom/client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import CssBaseline from '@mui/material/CssBaseline'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Root from './Root.jsx';

import ErrorPage from './ErrorPage.jsx';

import Index from './routes/index.jsx';

import Artists from './routes/artists/index.jsx'
import SearchArtists from './routes/artists/search.jsx'

import Albums from './routes/Albums/index.jsx'

import Reviews from './routes/Reviews/index.jsx'
import ArtistForm from './routes/artists/form.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: '/artists',
        children: [
          {
            index: true,
            element: <Artists />,
          },
          {
            path: 'new',
            element: <ArtistForm />
          }
        ]
      },
      {
        path: '/albums',
        children: [
          {
            index: true,
            element: <Albums />
          }
        ]
      },
      {
        path: '/reviews',
        children: [
          {
            index: true,
            element: <Reviews />
          }
        ]
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
