"use client";
import React, { FC, useEffect } from "react";
import { TTodoItem } from "../../../types";
import Todo from "./Todo.component";
import { useModalContext } from "@/contexts/Modal.context";
import { useTodoContext } from "@/contexts/Todos.context";
import { sort_todos } from "@/utils";

const TodoSection: FC<{ todos: TTodoItem[] }> = ({ todos }) => {
  const { openModal } = useModalContext();
  const { fillTodos, todos: todos_state } = useTodoContext();

  useEffect(() => {
    fillTodos(todos);
  }, []);

  return (
    <section className="flex gap-4 justify-center flex-wrap transition">
      {/* Add Todo */}
      <div
        className="p-4 rounded-md shadow-md flex flex-col items-center justify-center gap-4 w-[230px] cursor-pointer transition hover:scale-105"
        onClick={openModal}
      >
        <i className="fas fa-plus text-6xl"></i>
        <span className="text-2xl">Add todo</span>
      </div>
      {todos_state.sort(sort_todos).map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};

export default TodoSection;
