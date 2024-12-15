"use client";
import React, { FC } from "react";
import { TTodoItem } from "../../../types";
import Todo from "./Todo.component";
import { useModalContext } from "@/contexts/Modal.context";

const TodoSection: FC<{ todos: TTodoItem[] }> = ({ todos }) => {
  const { openModal } = useModalContext();

  return (
    <section className="flex gap-4 flex-wrap">
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
      {/* Add Todo */}
      <div
        className="p-4 rounded-md shadow-md flex flex-col items-center justify-center gap-4 w-[230px] cursor-pointer transition hover:scale-105"
        onClick={openModal}
      >
        <i className="fas fa-plus text-6xl"></i>
        <span className="text-2xl">Add todo</span>
      </div>
    </section>
  );
};

export default TodoSection;
