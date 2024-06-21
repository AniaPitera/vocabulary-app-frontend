import { useState, useContext } from "react";
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
import AuthContext from "./AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/token", {
        email,
        password,
      });
      if (response.data.token) {
        login(response.data.token);
      }
      console.log("Logged in successfully:");
    } catch (error) {
      console.error("Failed to login:", error);
      alert("Logowanie się nie powiodło. Spróbuj ponownie.");
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
          Zaloguj się
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adres e-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl
            fullWidth
            required
            margin="normal"
            type="password"
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
            Zaloguj się
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Nie masz jeszcze konta? Zarejestruj się"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
