import { useState } from 'react';
import { useLoaderData, Form, redirect } from 'react-router-dom';
import { Box, TextField, Autocomplete, Typography, Paper, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Edit, AddCircle } from '@mui/icons-material';
import { apiFetch, formObject } from '../../api';

import dayjs from 'dayjs';

export default function AlbumForm({ edit }) {
  const { album, artist } = useLoaderData();

  const [genres, setGenres]           = useState(album?.genres ?? []);
  const [releaseDate, setReleaseDate] = useState(dayjs(album?.releaseDate));

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
          {edit ? 'Edit album' : 'Create a new album'}
        </Typography>
        <input type="hidden" name="artistId" value={artist?.id} />
        <input type="hidden" name="id" value={album?.id} />
        <input type="hidden" name="releaseDate" value={releaseDate?.format('YYYY-MM-DD')} />
        <TextField
          label='Artist'
          value={artist?.name}
          disabled
          variant='outlined'
          fullWidth
        />
        <TextField
          name='title'
          label='Album Title'
          defaultValue={album?.title}
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
        <DatePicker
          label='Release date'
          sx={{width: '100%'}}
          onChange={v => setReleaseDate(v)}
          value={releaseDate}
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


export async function createLoader({ request }) {
  const artistId = new URL(request.url).searchParams.get('artist');
  const response = await apiFetch('GET', `/artists/${artistId}`);
  if (response.ok) {
    return {
      artist: response.data,
      album: null,
    };
  }
  // TODO error handling
  return null;
}


export async function editLoader({ params }) {
  const response = await apiFetch('GET', `/albums/${params.id}`);
  if (response.ok) {
    const album = response.data;
    const artist = album.artist;
    return {
      artist,
      album,
    };
  }
  // TODO error handling
  return null;
}



export async function createAction({ request }) {
  const album    = formObject(await request.formData());
  console.log('creating', album)
  const response = await apiFetch('POST', `/artists/${album.artist}/albums`, album);
  if (response.ok) {
    return redirect(`/artists/${album.artist}`);
  }
  return null;
}



export async function editAction({ request, params }) {
  const id    = params.id;
  const album = formObject(await request.formData());

  console.log('editing album', album);

  const response = await apiFetch('PUT', `/albums/${id}`, album);
  if (response.ok) {
    return redirect(`/artists/${album.artistId}`);
  }
  // TODO error handling
  return null;
}