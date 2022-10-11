import React from "react";
import { FormRegisterUser } from "../components/form-register-user";
import { Home } from "../pages/home";
import { HomeUser } from "../pages/home-user";
import { NewTask } from "../pages/new-tasks/new-tasks";
import { Tasks } from "../pages/tasks";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/registrar", element: <FormRegisterUser /> },
  { path: "/dashboard", element: <HomeUser /> },
  { path: "/tarefas", element: <Tasks /> },
  { path: "/editarTarefa", element: <NewTask /> },
  { path: "/criarTarefa", element: <NewTask /> },
  { path: "/editar", element: <FormRegisterUser /> },
];
