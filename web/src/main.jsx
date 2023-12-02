import React from 'react'
import ReactDOM from 'react-dom/client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import CssBaseline from '@mui/material/CssBaseline'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Root from './Root.jsx';

import ErrorPage from './ErrorPage.jsx';

import Index from './routes/index.jsx';

import Artists, {
  loader as artistsLoader,
} from './routes/artists/index.jsx'

import Albums from './routes/Albums/index.jsx'

import Reviews from './routes/Reviews/index.jsx'
import ArtistForm, {
  createAction as createArtistAction,
  editAction as editArtistAction,
  editLoader as editAristLoader,
} from './routes/artists/form.jsx';

import {
  action as deleteArtistAction
} from './routes/artists/delete.jsx';

import ArtistDetails, {
  loader as artistDetailsLoader
} from './routes/artists/details.jsx';

import AlbumForm, {
  createLoader as createAlbumLoader,
  createAction as createAlbumAction,
  editAction as editAlbumAction,
  editLoader as editAlbumLoader,
} from './routes/albums/form.jsx';

import { action as deleteAlbumAction } from './routes/albums/delete.jsx';

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
            loader: artistsLoader,
          },
          {
            path: 'new',
            element: <ArtistForm />,
            action: createArtistAction,
            loader: () => ({}),
          },
          {
            path: ':id/edit',
            element: <ArtistForm edit />,
            action: editArtistAction,
            loader: editAristLoader,
          },
          {
            path: ':id/delete',
            action: deleteArtistAction,
          },
          {
            path: ':id',
            element: <ArtistDetails />,
            loader: artistDetailsLoader,
          }
        ]
      },
      {
        path: '/albums',
        children: [
          {
            index: true,
            element: <Albums />
          },
          {
            path: 'new',
            element: <AlbumForm />,
            loader: createAlbumLoader,
            action: createAlbumAction,
          },
          {
            path: ':id/delete',
            action: deleteAlbumAction,
          },
          {
            path: ':id/edit',
            loader: editAlbumLoader,
            action: editAlbumAction,
            element: <AlbumForm edit />
          }
        ]
      },
      {
        path: '/reviews',
        children: [
          {
            index: true,
            element: <Reviews />
          },
        ]
      },
    ]
  }
])

// FIXME mesmo com adapterLocale='pt-br' ou 'pt-BR' ou 'pt' ou 'br',
// ele mostra data no formato MM/DD/YYYY
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
      <RouterProvider router={router} />
    </LocalizationProvider>
  </React.StrictMode>,
)
