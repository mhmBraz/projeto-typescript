import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { TAppContext, TUser } from "../type";

export const AppContext = React.createContext({} as TAppContext);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState({} as TUser);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
