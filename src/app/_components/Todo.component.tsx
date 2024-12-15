"use client";
import React, { FC } from "react";
import { TTodoItem } from "../../../types";
import Image from "next/image";
import { useTodoContext } from "@/contexts/Todos.context";
import useFetch from "@/hooks/useFetch.hook";
import toggle_todo_progress from "../actions/UpdateTodo.action";
import { CircularProgress } from "@mui/material";
import delete_todo from "../actions/DeleteTodo.action";

const Todo: FC<{ todo: TTodoItem }> = ({ todo }) => {
  const { completeTodo, removeTodo } = useTodoContext();
  const {
    display_loading: display_toggle_loading,
    display_error: display_toggle_error,
    display_success: display_toggle_success,
    ...toogle_state
  } = useFetch();
  const {
    display_loading: display_delete_loading,
    display_error: display_delete_error,
    display_success: display_delete_success,
    ...delete_state
  } = useFetch();

  const handle_check_change = async () => {
    try {
      display_toggle_loading();

      await toggle_todo_progress(todo);

      completeTodo(todo.id || "");

      display_toggle_success("");
    } catch (error) {
      console.error("Error completing todo:", error);
      display_toggle_error("");
    }
  };

  const handle_delete = async () => {
    try {
      display_delete_loading();

      await delete_todo(todo);

      removeTodo(todo.id || "");

      display_delete_success("");
    } catch (error) {
      console.error("Error deleting todo:", error);
      display_toggle_error("");
    }
  };

  console.log("Todo", todo);

  return (
    <div className="relative p-4 rounded-md shadow-md flex flex-col w-fit">
      <div className="absolute right-3 top-1 flex gap-2 rounded-full p-2 bg-white shadow-md">
        {/* Delete icon */}
        {delete_state.loading ? (
          <>
            <CircularProgress size={"1rem"} />
          </>
        ) : (
          <i
            className="fas fa-trash transition text-xl hover:text-red-600 cursor-pointer"
            onClick={handle_delete}
          ></i>
        )}
        {/* Complete checkbox */}
        {toogle_state.loading ? (
          <>
            <CircularProgress size={"1rem"} />
          </>
        ) : (
          <label className="radio">
            <input
              type="checkbox"
              name={"Completed"}
              onChange={handle_check_change}
              defaultChecked={todo.completed}
            />
            <span className="checkmark"></span>
          </label>
        )}
      </div>
      {todo?.coverImage && (
        <div className="w-[200px] h-[150px] overflow-hidden rounded-md">
          <Image
            width={200}
            height={150}
            alt={todo.title}
            src={
              typeof todo?.coverImage === "string"
                ? todo?.coverImage
                : `https:${todo?.coverImage?.fields?.file?.url}`
            }
            className="w-[200px] h-[150px] object-contain object-top bg-blue-200"
          />
        </div>
      )}
      <span className={todo.completed ? `line-through` : ""}>{todo.title}</span>
      <span
        className={`text-wrap mt-2 text-xs block w-[200px] ${
          todo.completed ? `line-through` : ""
        }`}
      >
        {todo.description}
      </span>
    </div>
  );
};

export default Todo;
