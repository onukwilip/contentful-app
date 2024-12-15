import { TTodoItem } from "../types";

export const sort_todos: (
  a: TTodoItem<"get">,
  b: TTodoItem<"get">
) => number = (a, b) => {
  // Sort by 'completed' field (false comes before true)
  if (a.completed === b.completed) return 0; // If both are the same, keep their order
  return a.completed ? 1 : -1; // Move `true` (completed) to the end
};
