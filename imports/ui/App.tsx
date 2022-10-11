import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, i) => (
          <Route {...route} key={i} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
