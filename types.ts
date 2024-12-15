export type TTodoItemCoverImage = {
  fields: {
    file: { url: string };
  };
};

export type TTodoItem<T extends "get" | "post" = "get"> = {
  id?: string;
  title: string;
  description: string;
  coverImage?: T extends "get" ? TTodoItemCoverImage : File;
  completed: boolean;
};

export type TModalContext = {
  openModal: () => void;
  closeModal: () => void;
  open: boolean;
};

export type TTodoContext = {
  addTodo: (todo: TTodoItem<"post">) => void;
  completeTodo: (id: string) => void;
  fillTodos: (todos: TTodoItem<"get">[]) => void;
  removeTodo: (id: string) => void;
  todos: TTodoItem<"get">[];
};
