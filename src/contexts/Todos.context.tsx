"use client";
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { TTodoContext, TTodoItem } from "../../types";

const TodoContext = createContext<TTodoContext>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  completeTodo: () => {},
  fillTodos: () => {},
});

const TodoContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<TTodoItem[]>([]);

  return (
    <TodoContext.Provider
      value={{
        todos: todos,
        fillTodos: (todos) => {
          setTodos([...todos]);
        },
        addTodo: (todo) => {
          setTodos((prev) => [...prev, todo as any]);
        },
        removeTodo: (id) => {
          setTodos((prev) => prev.filter((each) => each.id !== id));
        },
        completeTodo: (id) => {
          const old_todos = [...todos];

          const i = old_todos.findIndex((each) => each.id === id);

          if (i < 0) return;

          old_todos[i].completed = !old_todos[i].completed;

          setTodos([...old_todos]);
        },
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoContextProvider");
  }
  return context;
};

export default TodoContextProvider;
