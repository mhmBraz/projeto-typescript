import React, { Fragment, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import { Avatar, CardMedia, ListItemAvatar, Typography } from "@mui/material";

type Anchor = string;

export function TemporaryDrawer(props: any) {
  const navegate = useNavigate();
  const [state, setState] = React.useState({
    left: false,
  });

  function drawerNavegateUser(event) {
    console.log(event.nativeEvent);

    ///// if (title === "Inicio") {
    //   navegate("/dashboard");
    // } else if (title === "Perfil") {
    //   navegate("/editar", { state: { user: props.dataUser } });
    // } else if (title === "Tarefas") {
    //   navegate("/tarefas");
    // }
  }

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={props.dataUser?.profile?.photo} />
        </ListItemAvatar>
        <h4>Nome: {props.dataUser?.username}</h4>
        <h5>Email: {props.dataUser?.profile?.email}</h5>
      </>
      <Divider />
      <List>
        {["Inicio", "Perfil", "Tarefas"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={(valeu) => drawerNavegateUser(valeu)}>
              <ListItemIcon>
                {index % 2 === 0 ? <HomeIcon /> : <PersonIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Menu</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
