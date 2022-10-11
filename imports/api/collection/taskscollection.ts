import { Mongo } from "meteor/mongo";

export interface tasks {
  _id?: string;
  name: string;
  description: string;
  createdAt: Date;
  user: {
    _id: string;
    username: string;
  };
  photo: string;
  private: boolean;
  situation: string;
}

export const TasksCollection = new Mongo.Collection<tasks>("tasks");
