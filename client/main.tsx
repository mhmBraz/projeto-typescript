import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { App } from "/imports/ui/App";
import { AppContextProvider } from "/imports/ui/context";

Meteor.startup(() => {
  render(
    <AppContextProvider>
      <App />
    </AppContextProvider>,
    document.getElementById("react-target")
  );
});
