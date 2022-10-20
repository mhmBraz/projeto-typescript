import React from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import { TemporaryDrawer } from "../../components/drawer/drawer";
import { TasksCollection } from "../../../api/collection/taskscollection";
import { TCountTasks, TUser } from "../../type/types";
import { useTracker } from "meteor/react-meteor-data";

export function HomeUser() {
  let user: TUser = {
    id: "",
    username: "",
    profile: {
      birthDate: "",
      company: "",
      email: "",
      name: "",
      photo: "",
      sex: "",
    },
  };

  let tasks!: TCountTasks;

  const navigate = useNavigate();

  useTracker(() => {
    const check = localStorage.getItem("Meteor.userId");

    if (!check) {
      navigate("/");
    }

    const meteorUser = Meteor.user();

    if (meteorUser) {
      user = {
        id: meteorUser._id,
        username: meteorUser.username as string,
        profile: {
          birthDate: meteorUser.profile.birthDate as string,
          company: meteorUser.profile.company as string,
          email: meteorUser.profile.email as string,
          name: meteorUser.profile.name as string,
          photo: meteorUser.profile.photo as string,
          sex: meteorUser.profile.sex as string,
        },
      };
    }

    const handler = Meteor.subscribe("taskCount");

    if (!handler.ready()) {
      console.log("error");
    }

    const totalTasks = TasksCollection.find().count();
    const completed = TasksCollection.find({ situation: "2" }).count();
    const inProgress = TasksCollection.find({ situation: "1" }).count();

    tasks = {
      completed: completed,
      inProgress: inProgress,
      totalTasks: totalTasks,
    };
  });

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: 8,
      }}
    >
      {user?.id && <TemporaryDrawer />}
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
        Olá {user?.username}, seja Bem vindo ao todo list
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Total de tarefas cadastradas
              </Typography>
              <Typography variant="h1">{tasks?.totalTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Total de tarefas concluídas
              </Typography>
              <Typography variant="h1">{tasks?.completed}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Total de tarefas em andamento
              </Typography>
              <Typography variant="h1">{tasks?.inProgress}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card sx={{ cursor: "pointer" }} onClick={() => navigate("/tarefas")}>
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
