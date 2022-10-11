import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Fab,
  Grid,
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

  const user = useTracker(() => Meteor.user());

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("tasks");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find().fetch();
    // const tasks = TasksCollection.find(
    //   checked ? pendingOnlyFilter : userFilter,
    //   {
    //     sort: { createdAt: -1 },
    //   }
    // ).fetch();
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
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
            console.log(Meteor.user()._id, task.user.id);

            const labelId = `checkbox-list-secondary-label-${task}`;
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
                {task.user.id === Meteor.user()._id && <LongMenu task={task} />}
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
