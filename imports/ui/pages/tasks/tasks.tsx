import {
  Alert,
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
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { TasksCollection } from "../../../api/collection/taskscollection";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import { LongMenu } from "../../components/long-menu/long-menu";
import AddIcon from "@mui/icons-material/Add";
import { ReactiveVar } from "meteor/reactive-var";

export function Tasks() {
  const navegate = useNavigate();

  const [checked, setChecked] = useState();

  const { tasks } = useTracker(() => {
    const handler = Meteor.subscribe("tasks", checked);

    if (!handler.ready()) {
      return { tasks: [] };
    }

    const tasks = TasksCollection.find({}).fetch();
    console.log(tasks);

    return { tasks };
  });

  function back() {
    navegate("/dashboard");
  }

  function newTask() {
    navegate("/criarTarefa");
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked.set(event.target.checked);
  };

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
          marginTop: 8,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <FormControlLabel
            control={
              <Checkbox onChange={handleChange} checked={checked || false} />
            }
            label="Exibir somentes as concluidas"
          />
          {tasks.map((task, index) => {
            return (
              <ListItem key={index} disablePadding>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={task.photo} />
                </ListItemAvatar>
                <ListItemText
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
                {task.user.id === Meteor.userId() && <LongMenu task={task} />}
              </ListItem>
            );
          })}
        </List>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {!Object.keys(tasks).length && (
            <Alert severity="error">Nenhuma tarefa cadastrada</Alert>
          )}
        </Box>
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
