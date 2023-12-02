import { useLoaderData, Link, Form } from 'react-router-dom';
import { apiFetch } from '../../api.js'
import { Button, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

export async function loader() {
  const response = await apiFetch('GET', 'artists');
  // TODO: error handling
  return {
    artists: response.ok ? response.data : []
  };
}

export default function Artists() {
  const { artists } = useLoaderData();
  // TODO ask user for confirmation before deleting
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
      <div>
        <Button
          variant='contained'
          color='success'
          startIcon={<AddCircle/>}
          component={Link}
          to='new'
        >
          New artist
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Genres</TableCell>
              <TableCell sx={{width: '0.1%'}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {artists.map(a => (
              <TableRow key={a.id}>
                <TableCell>{a.id}</TableCell>
                <TableCell>
                  <Link to={`/artists/${a.id}`}>
                    {a.name}
                  </Link>
                </TableCell>
                <TableCell>{a.genres.join(', ')}</TableCell>
                <TableCell sx={{display: 'flex', flexDirection: 'row', gap: 2}}>
                  <Button
                    variant='outlined'
                    component={Link}
                    to={`${a.id}/edit`}
                  >
                    Edit
                  </Button>
                  <Form action={`${a.id}/delete`} method='POST'>
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
      </TableContainer>
    </Box>
  )
}