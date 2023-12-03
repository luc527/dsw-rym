import { Autocomplete, Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, Button, Breadcrumbs, Link as MuiLink } from "@mui/material";
import { AddCircle } from '@mui/icons-material';
import { Link, Form } from "react-router-dom";
import { useLoaderData } from "react-router";
import { apiFetch } from "../../api";
import { useEffect } from "react";

export default function ArtistDetails() {
  const { artist } = useLoaderData();

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
      <Breadcrumbs>
        <MuiLink underline='hover' color='inherit' component={Link} to='/artists/'>
          Artists
        </MuiLink>
        <Typography color="text.primary">
          {artist.name}
        </Typography>
      </Breadcrumbs>
      <Typography variant='h6' sx={{textAlign: 'center'}}>Artist details</Typography>
      <TextField
        disabled
        fullWidth
        label='Name'
        type='text'
        value={artist.name}
        InputProps={{ readOnly: true }}
      />
      <Autocomplete
        multiple
        value={artist.genres}
        options={[]}
        readOnly
        disabled
        renderInput={params => (
          <TextField
            {...params}
            variant='outlined'
            label='Genres'
          />
        )}
      />
      <Paper sx={{padding: 2, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center'}}>
          <Typography variant='h6'>Albums</Typography>
          <Button
            variant='contained'
            color='success'
            startIcon={<AddCircle/>}
            component={Link}
            to={`/albums/new?artist=${artist.id}`}
          >
            New album
        </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Genres</TableCell>
                <TableCell>Release date</TableCell>
                <TableCell sx={{width: '0.1%'}}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {artist.albums.map(a => (
                <TableRow key={a.id}>
                  <TableCell>{a.id}</TableCell>
                  <TableCell>
                    <Link to={`/albums/${a.id}`}>
                      {a.title}
                    </Link>
                  </TableCell>
                  <TableCell>{a.genres.join(', ')}</TableCell>
                  <TableCell>{new Date(a.releaseDate).toLocaleString('pt-BR').substring(0, 10)}</TableCell>
                  <TableCell sx={{display: 'flex', flexDirection: 'row', gap: 2}}>
                    <Button
                      variant='outlined'
                      component={Link}
                      to={`/albums/${a.id}/edit`}
                    >
                      Edit
                    </Button>
                    <Form action={`/albums/${a.id}/delete`} method='POST'>
                      <input type='hidden' name='artist' value={artist.id} />
                      <Button
                        variant='outlined'
                        color='error'
                        type='submit'
                      >
                        Delete
                      </Button>
                    </Form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </Paper>
    </Box>
  )
}

export async function loader({ params }) {
  const [artistResp, albumsResp] = await Promise.all([
    apiFetch('GET', `artists/${params.id}`),
    apiFetch('GET', `artists/${params.id}/albums`),
  ]);

  if (artistResp.ok && albumsResp.ok) {
    return {
      artist: {
        ...artistResp.data,
        albums: albumsResp.data
      }
    };
  } else {
    return null;
    // TODO error handling
  }
}