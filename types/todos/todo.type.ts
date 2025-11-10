export type Todo = {
  id: string;
  title: string;
  description: string;
};

export type TodoResponse = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
