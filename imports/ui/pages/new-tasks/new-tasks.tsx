import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DropZone } from "../../components/drop-zone/";
import { Meteor } from "meteor/meteor";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";
import { TTasks } from "../../type";

export function NewTask() {
  const navegate = useNavigate();
  const { state } = useLocation();
  const taskEdit: TTasks = state?.task;

  const [checked, setChecked] = useState<boolean>();
  const [name, Setname] = useState<string>("");
  const [description, Setdescription] = useState<string>("");
  const [photo, setPhoto] = React.useState("");
  const [situation, setSituation] = React.useState<string>("0");
  const [taskDate, setTaskDate] = React.useState<Dayjs | null | String>(
    dayjs()
  );

  useEffect(() => {
    if (taskEdit) {
      setChecked(taskEdit?.private);
      Setname(taskEdit?.name);
      Setdescription(taskEdit?.description);
      setTaskDate(taskEdit?.createdAt);
      setSituation(taskEdit.situation || "0");
    }
  }, []);

  function register(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(taskDate, taskEdit.createdAt);

    if (taskEdit) {
      Meteor.call(
        "tasks.update",
        taskEdit._id,
        name,
        description,
        taskDate !== taskEdit.createdAt
          ? taskDate.format("DD/MM/YYYY hh:mm:ss")
          : taskDate,
        photo ? photo : taskEdit.photo,
        checked ?? false,
        situation
      );
    } else {
      Meteor.call(
        "tasks.insert",
        name,
        description,
        taskDate.format("DD/MM/YYYY hh:mm:ss"),
        photo,
        checked ?? false,
        situation
      );
    }
  }

  function back() {
    navegate("/tarefas");
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
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
            <Button onClick={back}>Voltar</Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography component="h1" variant="h5">
              {state ? "Editar tarefa - " + taskEdit.name : "Cadastrar Tarefa"}
            </Typography>
          </Grid>
        </Grid>

        <Box component="form" noValidate onSubmit={register} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                onChange={(e) => Setname(e.target.value)}
                value={name || ""}
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Nome"
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                onChange={(e) => Setdescription(e.target.value)}
                value={description || ""}
                required
                fullWidth
                id="description"
                label="Descrição"
                name="description"
                type={"text"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Data nascimento"
                  value={taskDate || ""}
                  inputFormat="DD/MM/YYYY hh:mm:ss"
                  onChange={(value) => setTaskDate(value)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    checked={checked || false}
                  />
                }
                label="Tarefa pessoal"
              />
            </Grid>
            {taskEdit && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Situação
                  </InputLabel>
                  <Select
                    defaultValue={"0"}
                    labelId="demo-simple-select-label"
                    id="situation"
                    value={situation || ""}
                    label="Selecione"
                    onChange={(event) => setSituation(event.target.value)}
                  >
                    <MenuItem value={"0"}>Cadastrada</MenuItem>
                    <MenuItem value={"1"}>Em andamento</MenuItem>
                    <MenuItem value={"2"}>Concluida</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}

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
            <Button
              type="submit"
              variant="contained"
              disabled={situation === "0" && taskEdit}
              sx={{ mt: 3, mb: 2 }}
            >
              {taskEdit ? "Editar" : "Cadastrar"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
