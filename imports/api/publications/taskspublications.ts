import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../collection/taskscollection";

Meteor.publish(
  "tasks",
  function publishTasks(
    statusCheck: boolean,
    filterName: string,
    pagination: { skip: number }
  ) {
    const userId = Meteor.user()._id;
    const filter = [];

    if (statusCheck) {
      filter.push({ situation: { $eq: "2" } });
    } else {
      filter.push({ situation: { $ne: "-1" } });
    }

    if (filterName) {
      filter.push({ name: { $regex: filterName } });
    }

    return TasksCollection.find(
      {
        $and: [
          {
            $or: [
              { $and: [{ private: true }, { "user.id": userId }] },
              { private: false },
            ],
          },
          {
            $or: [{ $and: filter }],
          },
        ],
      },
      { skip: pagination.skip, limit: 4 }
    );
  }
);

Meteor.publish("taskCount", function publishTasks() {
  return TasksCollection.find({});
});
