import { useState } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Grid,
  Link,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LockOutlined as LockOutlinedIcon,
} from "@mui/icons-material";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("/user", {
        username,
        email,
        password,
      });
      alert("Rejestracja zakończona sukcesem. Możesz się teraz zalogować.");
    } catch (error) {
      console.error("Failed to register:", error);
      alert("Rejestracja się nie powiodła. Spróbuj ponownie.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "gray" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Zarejestruj się
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            autoComplete="given-name"
            name="username"
            required
            fullWidth
            id="username"
            label="Nazwa użytkownika"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adres e-mail"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl
            margin="normal"
            fullWidth
            required
            autoComplete="current-password"
          >
            <InputLabel htmlFor="password">Hasło</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Hasło"
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Zarejestruj się
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Masz już konto? Zaloguj się
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
