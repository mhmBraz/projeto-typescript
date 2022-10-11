import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../collection/taskscollection";

Meteor.publish("tasks", function publishTasks() {
  const userId = Meteor.user()._id;
  // se a tarefa tiver private == true, eu tenho que perguntar se o id e igual ao id do meteor
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
