import { useState } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Grid,
  Link,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Nazwa użytkownika jest wymagana";
    if (!email) {
      newErrors.email = "Adres e-mail jest wymagany";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Adres e-mail jest nieprawidłowy";
    }
    if (!password) {
      newErrors.password = "Hasło jest wymagane";
    } else {
      if (password.length < 8) {
        newErrors.password = "Hasło musi mieć co najmniej 8 znaków";
      }
      if (/^\d+$/.test(password)) {
        newErrors.password = "Hasło nie może składać się wyłącznie z cyfr";
      }
      if (password.includes(username)) {
        newErrors.password =
          "Hasło jest zbyt podobne do nazwy użytkownika lub adresu e-mail";
      }
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setErrors({});
      await axios.post("/register", {
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
            error={Boolean(errors.username)}
            helperText={errors.username}
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
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <FormControl
            margin="normal"
            fullWidth
            required
            error={Boolean(errors.password)}
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
            {errors.password && (
              <Typography variant="body2" color="error">
                {errors.password}
              </Typography>
            )}
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
