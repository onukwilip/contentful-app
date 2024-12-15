"use server";
import { TTodoItem } from "../../../types";
import client from "../config/contentful-mgt-client.config";

const toggle_todo_progress = async (todo: TTodoItem) => {
  try {
    // Get the space
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID || ""); // Replace with your space ID

    // Get the environment (usually 'master')
    const environment = await space.getEnvironment("master");

    // Step 1: Fetch the entry by ID
    const entry = await environment.getEntry(todo.id || "");
    console.log("Entry fetched successfully:", entry.sys.id);

    // Step 2: Update the fields
    entry.fields.completed = !todo.completed;

    // Step 3: Save the changes
    const updatedEntry = await entry.update();
    console.log("Entry updated successfully:", updatedEntry.sys.id);

    // Step 4: Publish the entry (if needed)
    const publishedEntry = await updatedEntry.publish();
    console.log("Entry published successfully:", publishedEntry.sys.id);
  } catch (error) {
    console.error("Error updating the entry:", error);
  }
};

export default toggle_todo_progress;
