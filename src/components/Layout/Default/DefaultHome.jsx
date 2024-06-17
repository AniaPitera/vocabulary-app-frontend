import { Container, Typography, Button, Box } from "@mui/material";
import Features from "./Features";

const DefaultHome = () => {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 20 }}>
      <Typography variant="h2" gutterBottom>
        Witaj w Vocabulary App 
      </Typography>
      <Typography variant="h5" paragraph>
        Popraw swoją znajomość słownictwa dzięki naszym interaktywnym fiszkom.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button href="/register" variant="contained" color="primary" sx={{ mr: 2 }} >
          Zarejestruj się
        </Button>
        <Button href="/login" variant="outlined" color="primary">
          Zaloguj się
        </Button>
      </Box>
      <Features/>
    </Container>
  );
};

export default DefaultHome;
