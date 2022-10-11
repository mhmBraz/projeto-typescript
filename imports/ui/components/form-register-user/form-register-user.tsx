import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation, useNavigate } from "react-router-dom";
import { DropZone } from "../drop-zone";
import { Meteor } from "meteor/meteor";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

export function FormRegisterUser() {
  const navegate = useNavigate();
  const { state } = useLocation();
  const userEdit = state?.user;

  const [username, setUsername] = useState<string>(
    userEdit?.profile?.name || ""
  );
  const [password, setPassword] = useState<string>("");
  const [passwordOld, setPasswordOld] = useState<string>("");
  const [email, setEmail] = useState<string>(userEdit?.profile?.email);
  const [sex, setSex] = useState<string>(userEdit?.profile?.sex);
  const [photo, setPhoto] = useState<string>("");
  const [company, setCompany] = useState<string>(userEdit?.profile?.company);
  const [birthDate, setBirthDate] = useState<Dayjs | null>(
    dayjs(userEdit?.profile?.birthDate || "")
  );

  function changeSex(event: SelectChangeEvent) {
    setSex(event.target.value);
  }

  function changeBirthDate(newValue: Dayjs | null) {
    setBirthDate(newValue);
  }

  function register(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    if (!userEdit === undefined) {
      Meteor.call(
        "user.update",
        username,
        password,
        passwordOld,
        email,
        sex,
        photo,
        company,
        birthDate
      );
    } else {
      Meteor.call(
        "user.insert",
        username,
        passwordOld,
        email,
        sex,
        photo,
        company,
        birthDate
      );
    }
  }

  function login() {
    if (!userEdit === undefined) {
      navegate("/dashboard");
    } else {
      navegate("/");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} sm={5}>
            <Button onClick={login}>Voltar</Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PersonIcon />
            </Avatar>
          </Grid>
        </Grid>

        <Box component="form" onSubmit={register} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username || ""}
                autoComplete="given-name"
                name="name"
                fullWidth
                id="name"
                label="Nome"
                autoFocus
              />
            </Grid>
            {userEdit && (
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  value={password || ""}
                  fullWidth
                  id="old_password"
                  label="Senha atual"
                  type={"password"}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => setPasswordOld(e.target.value)}
                value={passwordOld || ""}
                fullWidth
                id="password"
                label="Senha"
                type={"password"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sex || ""}
                  label="Selecione"
                  onChange={changeSex}
                >
                  <MenuItem value={"10"}>Masculino</MenuItem>
                  <MenuItem value={"20"}>Feminino</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Data nascimento"
                  inputFormat="DD/MM/YYYY"
                  value={birthDate || ""}
                  onChange={changeBirthDate}
                  renderInput={(params) => <TextField {...params} required />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                value={email || ""}
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setCompany(e.target.value)}
                value={company || ""}
                required
                fullWidth
                name="company"
                label="Empresa"
                type="type"
                id="company"
              />
            </Grid>
            <Grid item xs={12}>
              <DropZone setPhoto={setPhoto} />
            </Grid>
          </Grid>

          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              {userEdit ? "Editar" : "Cadastrar"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
