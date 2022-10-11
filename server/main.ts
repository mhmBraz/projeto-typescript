import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import "/imports/api/methods/usermethods";
import { TasksCollection } from "/imports/api/collection/taskscollection";
import "/imports/api/methods/tasksmethods";
import "/imports/api/publications/taskspublications";

const SEED_USERNAME = "admin";
const SEED_PASSWORD = "admin";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
      profile: {
        name: "Admin",
        email: "admin@gmail.com",
        birthday: "1996-09-24",
        sex: "m",
        company: "synergia",
        photo: " ",
      },
    });
  }
});
