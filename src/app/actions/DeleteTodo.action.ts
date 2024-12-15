"use server";
import { TTodoItem } from "../../../types";
import client from "../config/contentful-mgt-client.config";

const delete_todo = async (todo: TTodoItem) => {
  try {
    // Get the space
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID || ""); // Replace with your space ID

    // Get the environment (usually 'master')
    const environment = await space.getEnvironment("master");

    // Step 1: Fetch the entry by ID
    const entry = await environment.getEntry(todo.id || "");
    console.log("Entry fetched successfully:", entry.sys.id);

    // Step 2: Unpublish the entry (if it's published)
    if (entry.isPublished()) {
      await entry.unpublish();
      console.log("Entry unpublished successfully:", entry.sys.id);
    }

    // Step 3: Delete the entry
    await entry.delete();
    console.log("Entry deleted successfully:");
  } catch (error: any) {
    console.error("Error deleting the entry:", error);
    throw new Error(error.message);
  }
};

export default delete_todo;
