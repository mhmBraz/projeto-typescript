import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../collection/taskscollection";

Meteor.publish("tasks", function publishTasks(statusCheck) {
  const userId = Meteor.user()._id;

  const filter = [{ private: true }, { "user.id": userId }];

  if (statusCheck) {
    filter.push({ situation: { $eq: "2" } });
  } else {
    filter.push({ situation: { $ne: "-1" } });
  }

  return TasksCollection.find({
    $or: [{ $and: filter }, { private: false }],
  });
});

Meteor.publish("taskCount", function publishTasks() {
  return TasksCollection.find({});
});
