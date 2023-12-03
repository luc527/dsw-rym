import { useLoaderData } from "react-router";
import { Form, Link } from "react-router-dom";
import { apiFetch } from "../../api";
import { Autocomplete, Box, Paper, Table, TableHead, TableRow, TextField, Typography, TableCell, TableBody, Rating, Button, Breadcrumbs, Link as MuiLink } from "@mui/material";
import { AddCircle } from "@mui/icons-material";

export default function AlbumDetails() {
  const { album } = useLoaderData();

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center'}}>

      <Breadcrumbs sx={{marginRight: 'auto'}}>
        <MuiLink underline='hover' color='inherit' component={Link} to='/artists/'>
          Artists
        </MuiLink>
        <MuiLink underline='hover' color='inherit' component={Link} to={`/artists/${album.artist.id}`}>
          {album.artist.name}
        </MuiLink>
        <Typography color='text.primary'>
          {album.title}
        </Typography>
      </Breadcrumbs>

      <Typography variant='h6'>Album details</Typography>

      <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', gap: 2}}>
        <TextField
          disabled
          fullWidth
          label='Artist'
          value={album.artist.name}
        />

        <TextField
          disabled
          fullWidth
          label='Title'
          value={album.title}
        />
      </Box>


      <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', gap: 2}}>
        <Autocomplete
          disabled
          fullWidth
          label='Genres'
          multiple
          value={album.genres}
          options={[]}
          renderInput={params => (
            <TextField
              {...params}
              variant='outlined'
              label='Genres'
            />
          )}
        />

        <TextField
          disabled
          fullWidth
          label='Release date'
          value={new Date(album.releaseDate).toLocaleString('pt-BR').substring(0, 10)}
        />
      </Box>

      <Paper sx={{width: '100%', padding: 2, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center'}}>
        <Typography variant='h6'>Reviews</Typography>
        <Button
          color='success'
          variant='contained'
          component={Link}
          startIcon={<AddCircle />}
          to={`/reviews/write?album=${album.id}`}
        >
          Write review
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Publication date</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell sx={{width: '50%'}}>Review</TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {album.reviews.map(r => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.author}</TableCell>
                <TableCell>{new Date(r.publicationDate).toLocaleString('pt-BR').substring(0, 10)}</TableCell>
                <TableCell>
                  <Rating disabled value={r.rating / 2}></Rating>
                </TableCell>
                <TableCell>
                  <Typography variant='p'>
                    {r.content}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{display: 'flex', flexDirection: 'row', gap: 2}}>
                    <Button
                      type='button'
                      variant='outlined'
                      component={Link}
                      to={`/reviews/${r.id}/edit`}
                    >
                      Edit
                    </Button>
                    <Form method='POST' action={`/reviews/${r.id}/delete`}>
                      <input type='hidden' name='album' value={album.id} />
                      <Button
                        type='submit'
                        variant='outlined'
                        color='error'
                      >
                        Delete
                      </Button>
                    </Form>
                  </Box>
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
  const [albumResponse, reviewsResponse] = await Promise.all([
    apiFetch('GET', `/albums/${params.id}`),
    apiFetch('GET', `/albums/${params.id}/reviews`),
  ]);

  if (albumResponse.ok && reviewsResponse.ok) {
    const album = {
      ...albumResponse.data,
      reviews: reviewsResponse.data,
    };
    return { album };
  } else {
    // TODO error handling
    return null;
  }
}