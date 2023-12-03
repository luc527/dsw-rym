import { Container } from "@mui/material";
import { Outlet } from "react-router";

export default function Root() {
  return (
    <Container sx={{mt: 2}}>
      <Outlet />
    </Container>
  )
}