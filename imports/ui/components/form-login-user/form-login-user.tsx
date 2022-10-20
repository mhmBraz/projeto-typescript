import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Tracker } from "meteor/tracker";

export function FormLoginUser() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("" as string);
  const [userPassword, setUserPassword] = useState("" as string);

  function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    Meteor.loginWithPassword(userName, userPassword);

    const userMeteor = Tracker.autorun(() => {
      return Meteor.user();
    });
    if (userMeteor) {
      navigate("/dashboard");
    }
  }

  function register() {
    navigate("/registrar");
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Bem vindo ao todo list
        </Typography>
        <Box component="form" onSubmit={login} sx={{ mt: 1 }}>
          <TextField
            onChange={(e) => setUserName(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome"
            name="nome"
          />
          <TextField
            onChange={(e) => setUserPassword(e.target.value)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid item xs>
              <Button onClick={register}>Cadastrar</Button>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
