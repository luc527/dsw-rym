import { useState } from 'react';
import { useLoaderData, redirect, Link } from "react-router-dom";
import { apiFetch, formObject } from "../../api";
import { Paper, TextField, Box, Typography, Rating, Button, Breadcrumbs, Link as MuiLink } from "@mui/material";
import { AddCircle, Edit } from "@mui/icons-material";
import { Form } from "react-router-dom";

export default function WriteReview({ edit }) {
  const { album, review } = useLoaderData();

  const [rating, setRating] = useState((review?.rating || 0) / 2);

  function handleRatingChange(e, v) {
    setRating(v);
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
      <Breadcrumbs sx={{marginRight: 'auto'}}>
        <MuiLink underline='hover' color='inherit' component={Link} to='/artists/'>
          Artists
        </MuiLink>
        <MuiLink underline='hover' color='inherit' component={Link} to={`/artists/${album.artist.id}`}>
          {album.artist.name}
        </MuiLink>
        <MuiLink underline='hover' color='inherit' component={Link} to={`/albums/${album.id}`}>
          {album.title}
        </MuiLink>
        <Typography color='text.primary'>
          {edit ? 'Edit review' : 'Write review'}
        </Typography>
      </Breadcrumbs>

      <Form method='POST'>
        <Paper sx={{display: 'flex', flexDirection: 'column', gap: 2, padding: 2, alignItems: 'center'}}>

          <Typography variant='h6'>
            {edit ? 'Edit your review' : 'Write a review'}
          </Typography>

          <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, width: '100%'}}>
            <input type='hidden' name='id' value={review?.id} />
            <input type='hidden' name='albumId' value={album.id} />
            <TextField
              fullWidth
              disabled
              label='Artist'
              value={album.artist.name}
              variant='outlined'
            />
            <TextField
              fullWidth
              disabled
              label='Album'
              value={album.title}
              variant='outlined'
            />
          </Box>

          <Box sx={{display: 'flex', flexDirection: 'row', gap: 2, width: '100%'}}>
            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center'}}>
              <TextField
                fullWidth
                label='Author'
                name='author'
                defaultValue={review?.author}
                variant='outlined'
                required
              />
              <input type='hidden' name='rating' value={rating*2} />
              <Rating
                onChange={handleRatingChange}
                value={rating}
                precision={0.5}
              />
            </Box>
            <TextField
              sx={{flex: 3}}
              fullWidth
              multiline
              label='Review'
              name='content'
              defaultValue={review?.content}
              rows={4}
              variant='outlined'
              required
            />
          </Box>

          <Box sx={{marginLeft: 'auto'}}>
            <Button
              type='submit'
              variant='contained'
              color='success'
              startIcon={edit ? <Edit /> : <AddCircle />}
            >
              Send
            </Button>
          </Box>

        </Paper>
      </Form>
    </Box>
  )
}

export async function writeLoader({ request }) {
  const albumId = new URL(request.url).searchParams.get('album');
  const response = await apiFetch('GET', `/albums/${albumId}`);
  if (response.ok) {
    const album = response.data;
    return { album };
  } else {
    // TODO error handling
    return null;
  }
}


export async function editLoader({ params }) {
  const response = await apiFetch('GET', `/reviews/${params.id}`);
  if (response.ok) {
    return {
      review: response.data,
      album: response.data.album,
    };
  }
  // TODO error handling
  return null;
}

export async function saveAction({ request }) {
  const fd = await request.formData();
  const review = formObject(fd);

  const response = await apiFetch('POST', `/albums/${review.albumId}/reviews`, review);
  if (!response.ok) {
    // TODO error handling
  }
  return redirect(`/albums/${review.albumId}`);
}


export async function editAction({ request }) {
  const fd = await request.formData();
  const review = formObject(fd);

  console.log({review})

  const response = await apiFetch('PUT', `/reviews/${review.id}`, review);
  if (!response.ok) {
    // TODO error handling
  }
  return redirect(`/albums/${review.albumId}`);
}
