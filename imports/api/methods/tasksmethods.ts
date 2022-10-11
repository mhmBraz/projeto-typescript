import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TasksCollection } from "../collection/taskscollection";

Meteor.methods({
  "tasks.insert"(name, description, date, photo, checked, situation) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("Not authorized.");
    }

    const user = Meteor.users.findOne({ _id: Meteor.userId() });
    TasksCollection.insert({
      name: name,
      description: description,
      createdAt: date,
      user: {
        id: user._id,
        username: user.username,
      },
      photo: photo,
      private: checked,
      situation: situation ?? 0,
    });
  },
  "tasks.update"(id, name, description, date, photo, checked, situation) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("Not authorized.");
    }

    TasksCollection.update(
      { _id: id },
      {
        name: name,
        description: description,
        createdAt: date,
        userId: Meteor.userId(),
        photo: photo,
        private: checked,
        situation: situation,
      }
    );
  },
  "tasks.remove"(taskId) {
    check(taskId, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error("Not authorized.");
    }

    TasksCollection.remove(taskId);
  },

  "tasks.setIsChecked"(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!Meteor.userId()) {
      throw new Meteor.Error("Not authorized.");
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});
