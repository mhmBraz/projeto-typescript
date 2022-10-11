import React from "react";
import { Link } from "react-router-dom";
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
import { Avatar, ListItemAvatar } from "@mui/material";
import { TUser } from "../../type";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

type Anchor = string;

export function TemporaryDrawer() {
  let user: TUser;

  useTracker(() => {
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
  });

  const [state, setState] = React.useState({
    left: false,
  });

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
          <Avatar alt="Remy Sharp" src={user?.profile?.photo} />
        </ListItemAvatar>
        <h4>Nome: {user?.username}</h4>
        <h5>Email: {user?.profile?.email}</h5>
      </>
      <Divider />
      <List>
        {[
          ["Inicio", "/dashboard"],
          ["Perfil", `/editar/${user?.id}`],
          ["Tarefas", "/tarefas"],
        ].map((text, index) => (
          <ListItem key={text[0]} disablePadding>
            <Link to={text[1]}>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <HomeIcon /> : <PersonIcon />}
                </ListItemIcon>
                <ListItemText primary={text[0]} />
              </ListItemButton>
            </Link>
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
