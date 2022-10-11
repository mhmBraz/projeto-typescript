import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import * as React from "react";
import { TasksCollection } from "../../../api/collection/taskscollection";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import { LongMenu } from "../../components/long-menu/long-menu";
import AddIcon from "@mui/icons-material/Add";

export function Tasks() {
  const navegate = useNavigate();

  const { tasks } = useTracker(() => {
    const handler = Meteor.subscribe("tasks");

    if (!handler.ready()) {
      console.log("error");
    }

    const tasks = TasksCollection.find().fetch();
    console.log(tasks);

    return { tasks };
  });

  function back() {
    navegate("/dashboard");
  }

  function newTask() {
    navegate("/criarTarefa");
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
          marginTop: 8,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
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
