import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Fab,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TasksCollection } from "../../../api/collection/taskscollection";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import { LongMenu } from "../../components/long-menu/long-menu";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export function Tasks() {
  const navigate = useNavigate();

  const [checked, setChecked] = useState<boolean>();
  const [filterName, setFilterName] = useState("" as string);
  const [pagination, setPagination] = useState({ skip: 0 });

  useEffect(() => {
    const check = localStorage.getItem("Meteor.userId");
    if (!check) {
      navigate("/");
    }
  }, []);

  const { tasks } = useTracker(() => {
    const handler = Meteor.subscribe("tasks", checked, filterName, pagination);

    if (!handler.ready()) {
      return { tasks: [] };
    }

    const tasks = TasksCollection.find({}).fetch();

    return { tasks };
  });

  function back() {
    navigate("/dashboard");
  }

  function newTask() {
    navigate("/criarTarefa");
  }

  function paginationChange(event: React.MouseEvent<HTMLElement>) {
    if (event.currentTarget.id === "nextPagination") {
      setPagination((prev) => ({
        ...prev,
        ["skip"]: prev.skip + 4,
      }));
    } else {
      setPagination((prev) => ({
        ...prev,
        ["skip"]: prev.skip - 4,
      }));
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
  }

  function situationChange(
    event: React.MouseEvent<HTMLElement>,
    taskId: string
  ) {
    Meteor.call(
      "tasks.updateSituation",
      taskId,
      event.currentTarget.id === "completed" ? "2" : "1"
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: 8,
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
            Tarefas cadastradas
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <TextField
            onChange={(e) => setFilterName(e.target.value)}
            value={filterName || ""}
            autoComplete="given-name"
            name="name"
            required
            fullWidth
            id="name"
            label="Pesquisar"
            autoFocus
          />
          <FormControlLabel
            control={
              <Checkbox onChange={handleChange} checked={checked || false} />
            }
            label="Exibir somentes as concluidas"
          />

          <Box sx={{ minHeight: 450 }}>
            {tasks.map((task, index) => {
              return (
                <ListItem sx={{ marginBottom: 2 }} key={index} disablePadding>
                  <Box sx={{ display: "flex", minWidth: 400 }}>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={task.photo} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ marginRight: 4 }}
                      primary={task.name}
                      secondary={
                        <React.Fragment>
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Criado por: {task.user.username}
                            </Typography>
                          </>
                        </React.Fragment>
                      }
                    />
                    <ListItemText
                      primary={task.description}
                      secondary={
                        <React.Fragment>
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {task.createdAt}
                            </Typography>
                          </>
                        </React.Fragment>
                      }
                    />
                  </Box>

                  {task.user.id === Meteor.userId() && (
                    <Box>
                      {" "}
                      <LongMenu task={task} />
                    </Box>
                  )}

                  {task.user.id === Meteor.userId() && (
                    <Box sx={{ display: "flex" }}>
                      <Button
                        sx={{ marginRight: 2 }}
                        variant="contained"
                        color="warning"
                        disabled={true}
                      >
                        Cadastrada
                      </Button>
                      <Button
                        disabled={task.situation === "1"}
                        onClick={(e) => situationChange(e, task._id)}
                        id="progress"
                        sx={{ marginRight: 2 }}
                        variant="contained"
                        color="info"
                      >
                        Andamento
                      </Button>
                      <Button
                        disabled={task.situation === "2"}
                        onClick={(e) => situationChange(e, task._id)}
                        id="completed"
                        variant="contained"
                        color="success"
                      >
                        Concluída
                      </Button>
                    </Box>
                  )}
                </ListItem>
              );
            })}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Fab
              disabled={pagination.skip === 0}
              sx={{ marginRight: 1 }}
              onClick={paginationChange}
              id="backPagination"
              color="primary"
              aria-label="add"
            >
              <ArrowBackIosIcon id="backPagination" />
            </Fab>
            <Fab
              disabled={tasks.length < 4}
              onClick={paginationChange}
              id="nextPagination"
              color="primary"
              aria-label="add"
            >
              <ArrowForwardIosIcon id="nextPagination" />
            </Fab>
          </Box>
        </List>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Fab onClick={newTask} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </Container>
  );
}
