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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validate = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = "Nazwa użytkownika jest wymagana";
    }
    if (!password) {
      newErrors.password = "Hasło jest wymagane";
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
      const response = await axios.post("/login", {
        username,
        password,
      });
      if (response.data.access) {
        login(response.data.access);
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
            id="username"
            label="Nazwa użytkownika"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={Boolean(errors.username)}
            helperText={errors.username}
          />
          <FormControl
            fullWidth
            required
            margin="normal"
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
