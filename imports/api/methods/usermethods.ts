import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  "user.insert"(name, password, email, sex, photo, company, birthDate) {
    Accounts.createUser({
      username: name,
      password: password,
      profile: {
        name: name,
        email: email,
        birthDate: birthDate,
        sex: sex,
        company: company,
        photo: photo,
      },
    });
  },

  "user.update"(
    name,
    password,
    passwordOld,
    email,
    sex,
    photo,
    company,
    birthDate
  ) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("Not authorized.");
    }

    Meteor.users.update(
      { _id: Meteor.user()._id },
      {
        $set: {
          username: name,
          "profile.name": name,
          "profile.email": email,
          "profile.sex": sex,
          "profile.photo": photo,
          "profile.company": company,
          "profile.birthDate": birthDate,
        },
      }
    );

    if (passwordOld && password) {
      Accounts.changePassword(passwordOld, password);
    }
  },
});
