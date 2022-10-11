export type TUser = {
  id: string;
  username: string;
  profile: TPerson;
};

export type TPerson = {
  birthDate: string;
  company: string;
  email: string;
  name: string;
  photo: string;
  sex: string;
};

export type TCountTasks = {
  totalTasks: number;
  completed: number;
  inProgress: number;
};

export type TGetTasks = {
  tasks: TTasks;
  // completed: number;
  // inProgress: number;
};

export type TTasks = {
  _id?: string;
  name: string;
  description: string;
  createdAt: string;
  user: {
    _id: string;
    username: string;
  };
  photo: string;
  private: boolean;
  situation: string;
};

export type TAppContext = {
  user: TUser;
  setUser: React.Dispatch<React.SetStateAction<TUser>>;
};
