import TodoSection from "./_components/TodoSection.component";
import client from "./config/contentful-client.config";
import { TTodoItem } from "../../types";
import { EntrySkeletonType } from "contentful";

export const dynamic = "force-dynamic";
export const revalidate = false;

export default async function Home() {
  try {
    const todo_response = await client.getEntries<
      EntrySkeletonType<TTodoItem>
    >();

    const items = todo_response.items.map((item) => ({
      ...item.fields,
      id: item.sys.id,
    }));

    return <TodoSection todos={items} />;
  } catch (error) {
    console.error("Error retrieving todos:", error);

    <div>Error retrieving todos...</div>;
  }
}
