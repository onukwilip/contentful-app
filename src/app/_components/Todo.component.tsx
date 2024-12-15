import React, { FC } from "react";
import { TTodoItem } from "../../../types";
import Image from "next/image";

const Todo: FC<{ todo: TTodoItem }> = ({ todo }) => {
  console.log("Todo", todo);
  return (
    <div className="p-4 rounded-md shadow-md flex flex-col w-fit">
      <div className="w-[200px] h-[150px] overflow-hidden rounded-md">
        <Image
          width={200}
          height={150}
          alt={todo.title}
          src={`https:${todo?.coverImage?.fields?.file?.url}`}
          className="w-[200px] h-[150px] object-contain object-top bg-blue-200"
        />
      </div>
      <span>{todo.title}</span>
      <span className="text-wrap mt-2 text-xs block w-[200px]">
        {todo.description}
      </span>
    </div>
  );
};

export default Todo;
