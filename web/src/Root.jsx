import { AppBar, Toolbar, Container, Box, Button } from "@mui/material";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

export default function Root() {
  const pages = [
    {
      title: 'Artists',
      href: '/artists',
    },
    {
      title: 'Albums',
      href: '/albums',
    },
    {
      title: 'Reviews',
      href: '/reviews',
    },
  ];
  return (
    <>
      <AppBar position='static'>
        <Toolbar disableGutters>
          <Container maxWidth='xl'>
            <Box sx={{ flexGrow: 1, display: 'flex'}}>
              {pages.map(({title, href}) => (
                <Button
                  key={title}
                  sx={{my: 2, color: 'white', display: 'block'}}
                  component={Link}
                  to={href}
                >
                  {title}
                </Button>
              ))}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Container maxWidth='xl' sx={{mt: 2}}>
        <Outlet />
      </Container>
    </>
  )
}