import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";

export default function SignIn() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const usernameError = document.querySelector(".username.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/user/login`,
      withCredentials: true,
      data: {
        username,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          console.log(res.data.errors);
          usernameError.innerHTML = res.data.errors.username;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs=8">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Typography component="h1" variant="h5" sx={{ marginTop: 2 }}>
          Veuillez-vous connecter.
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nom d'utilisateur"
            name="username"
            autoFocus
            onChange={(e) => setusername(e.target.value)}
            value={username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
