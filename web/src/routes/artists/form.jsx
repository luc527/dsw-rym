import { useState } from 'react';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { Box, TextField, Autocomplete, Paper, Button, Typography } from '@mui/material';
import { Edit, AddCircle } from '@mui/icons-material';
import { apiFetch, formObject } from '../../api.js';

export async function createAction({ request }) {
  const artist = formObject(await request.formData());
  const response = await apiFetch('POST', 'artists', artist);
  if (response.ok) {
    const artist = response.data;
    return redirect(`/artists/${artist.id}`);
  } else {
    // TODO: error handling
    return redirect(`/artists`);
  }
}

export async function editLoader({ params }) {
  const response = await apiFetch('GET', `/artists/${params.id}`);
  if (response.ok) {
    return {
      artist: response.data,
    };
  } else {
    // TODO: error handling
    return {
      artist: null
    };
  }
}

export async function editAction({ params, request }) {
  const artist = formObject(await request.formData());
  await apiFetch('PUT', `/artists/${params.id}`, artist);
  // TODO error handling (non-ok response)
  // return redirect(`/artists/${params.id}/edit`);
  return redirect(`/artists`);
}

export default function ArtistForm({ edit=false }) {
  const { artist } = useLoaderData();
  const [genres, setGenres] = useState(artist?.genres ?? []);

  function handleGenresChange(e, value) {
    setGenres(value);
  }

  return (
    <Form method='POST'>
      <Box
        component={Paper}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          gap: 2,
          alignItems: 'center'
        }}
      >
        <Typography variant='h6'>
          {edit ? 'Edit artist' : 'Create a new artist'}
        </Typography>
        <TextField
          name='name'
          label='Artist Name'
          defaultValue={artist?.name}
          variant='outlined'
          fullWidth
        />
        {genres.map(g => (
          <input key={g} name='genres[]' type='hidden' value={g} />
        ))}
        <Autocomplete
          fullWidth
          onChange={handleGenresChange}
          multiple
          freeSolo
          filterOptions={(x) => x}
          options={[]}
          value={genres}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='outlined'
              label='Genres'
            />
        )}
        />
        <Box sx={{ml: 'auto'}}>
          <Button
            startIcon={edit ? <Edit /> : <AddCircle />}
            variant='contained'
            color='success'
            type='submit'
          >
            {edit ? 'Save' : 'Create'}
          </Button>
        </Box>
      </Box>
    </Form>
  )
}