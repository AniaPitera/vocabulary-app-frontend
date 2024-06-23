import { Container, Typography, Box } from "@mui/material";
import Features from "../Default/Features";
import CategoryList from "../../Category/CategoryList";

const UserHome = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h3">
          Popraw swoją znajomość słownictwa dzięki naszym interaktywnym fiszkom.
        </Typography>
      </Box>
      <Features />
      <CategoryList />
    </Container>
  );
};

export default UserHome;
