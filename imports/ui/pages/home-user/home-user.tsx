import React from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import { TemporaryDrawer } from "../../components/drawer/drawer";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../../../api/collection/taskscollection";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

type TUser = {
  id: string;
  username: string;
  profile: {
    birthDate: string;
    company: string;
    email: string;
    name: string;
    photo: string;
    sex: number;
  };
};

export function HomeUser() {
  let dataUser;
  const navegate = useNavigate();
  const { user } = useTracker(() => {
    const user = Meteor.users.findOne({ _id: Meteor.userId() });

    return { user };
  });

  const { totalTasks, completed, inProgress } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("taskCount");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const totalTasks = TasksCollection.find().count();
    const completed = TasksCollection.find({ situation: "2" }).count();
    const inProgress = TasksCollection.find({ situation: "1" }).count();

    return { totalTasks, completed, inProgress };
  });

  dataUser = user;

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: 8,
      }}
    >
      <TemporaryDrawer dataUser={dataUser} />
      <Typography
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        component="h1"
        variant="h5"
      >
        Olá {dataUser.username}, seja Bem vindo ao todo list
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Total de tarefas cadastradas
              </Typography>
              <Typography variant="h1">{totalTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Total de tarefas concluidas
              </Typography>
              <Typography variant="h1">{completed}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Total de tarefas em andamento
              </Typography>
              <Typography variant="h1">{inProgress}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card sx={{ cursor: "pointer" }} onClick={() => navegate("/tarefas")}>
            <CardContent>
              <Typography variant="h2" component="div">
                Visualizar tarefas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
