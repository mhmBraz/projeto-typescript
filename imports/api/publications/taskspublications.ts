import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../collection/taskscollection";

Meteor.publish("tasks", function publishTasks() {
  const userId = Meteor.user()._id;

  return TasksCollection.find({
    $or: [
      { $and: [{ private: true }, { "user.id": userId }] },
      { private: false },
    ],
  });
});

Meteor.publish("taskCount", function publishTasks() {
  return TasksCollection.find({});
});
