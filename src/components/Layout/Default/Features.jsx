import { Container, Grid, Paper, Typography } from "@mui/material";
import { Star, Build, Code } from "@mui/icons-material";

const features = [
  { icon: <Star fontSize="large" />, title: 'Łatwość użycia', description: 'Aplikacja jest prosta i łatwa w użyciu.' },
  { icon: <Build fontSize="large" />, title: 'Możliwość dostosowania', description: 'Twórz i zarządzaj własnymi fiszkami.' },
  { icon: <Code fontSize="large" />, title: 'Interaktywność', description: 'Interaktywne doświadczenie nauki.' },
];

const Features = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
  
      <Grid container spacing={1}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              {feature.icon}
              <Typography variant="h6" sx={{ mt: 2 }}>
                {feature.title}
              </Typography>
              <Typography variant="body1">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Features;
