import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  ListItemAvatar,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DropZone } from "../drop-zone";
import { Meteor } from "meteor/meteor";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { TUser } from "../../type";
import { Mongo } from "meteor/mongo";
import { Tracker } from "meteor/tracker";
import { useTracker } from "meteor/react-meteor-data";

export function FormRegisterUser() {
  let userEdit!: TUser;
  const navigate = useNavigate();
  let params: string = useParams().userId as string;

  if (params) {
    useTracker(() => {
      const user = Meteor.users.findOne({
        _id: Meteor.userId() as
          | string
          | RegExp
          | Mongo.FieldExpression<string>
          | undefined,
      });

      if (user) {
        userEdit = {
          id: (user?._id ?? "") as string,
          username: (user?.username ?? "") as string,
          profile: {
            birthDate: (user?.profile.birthDate ?? "") as string,
            company: (user?.profile.company ?? "") as string,
            email: (user?.profile.email ?? "") as string,
            name: (user?.profile.nam ?? "") as string,
            photo: (user?.profile.photo ?? "") as string,
            sex: (user?.profile.sex ?? "") as string,
          },
        };
      }
    });
  }

  const [username, setUsername] = useState(
    (userEdit?.username || "") as string
  );
  const [password, setPassword] = useState("" as string);
  const [passwordOld, setPasswordOld] = useState("" as string);
  const [email, setEmail] = useState(
    (userEdit?.profile?.email || "") as string
  );
  const [sex, setSex] = useState((userEdit?.profile?.sex || "") as string);
  const [photo, setPhoto] = useState(
    (userEdit?.profile?.photo || "") as string
  );
  const [company, setCompany] = useState(
    (userEdit?.profile?.company || "") as string
  );
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

    if (userEdit.id) {
      Meteor.call(
        "user.update",
        username,
        password,
        passwordOld,
        email,
        sex,
        photo,
        company,
        birthDate?.format("YYYY/MM/DD")
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
        birthDate?.format("YYYY/MM/DD")
      );
    }
  }

  function login() {
    if (userEdit.id) {
      navigate("/dashboard");
    } else {
      navigate("/");
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
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={userEdit.profile.photo || ""} />
            </ListItemAvatar>
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
            {userEdit.id && (
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
                label={userEdit.id ? "Nova senha" : "Senha"}
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
              {userEdit.id ? "Editar" : "Cadastrar"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
