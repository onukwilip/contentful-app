"use server";

import { Asset } from "contentful-management";
import { TTodoItem } from "../../../types";
import * as contentfulManagement from "contentful-management";
import client from "../config/contentful-mgt-client.config";
import { buffer } from "stream/consumers";

const add_todo = async (todo: TTodoItem<"post">) => {
  //   Object.entries(todo).map(([key, val]) => console.log(`TODO ${key}`, val));

  try {
    // Get the space
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID || ""); // Replace with your space ID

    // Get the environment (usually 'master')
    const environment = await space.getEnvironment("master");
    let publishedAsset: Asset | undefined = undefined;

    if (todo.coverImage) {
      const array_buffer = await todo.coverImage.arrayBuffer();
      //   const cover_image_buffer = Buffer.from(array_buffer);

      // Step 1: Upload the file
      const upload = await environment.createUpload({
        file: array_buffer,
      });

      console.log("File uploaded successfully:", upload.sys.id);

      // Step 2: Create an asset for the uploaded file
      const asset = await environment.createAsset({
        fields: {
          title: {
            "en-US": todo.coverImage.name.split(".").join(" "),
          },
          description: {
            "en-US": "This is a description of the uploaded file.",
          },
          file: {
            "en-US": {
              contentType: todo.coverImage.type, // Replace with the correct MIME type
              fileName: todo.coverImage.name, // Replace with your file name
              uploadFrom: {
                sys: {
                  type: "Link",
                  linkType: "Upload",
                  id: upload.sys.id, // Use the uploaded file's ID
                },
              },
            },
          },
        },
      });

      // Publish the asset after creating it
      publishedAsset = await asset.publish();

      console.log("Asset published successfully:", publishedAsset.sys.id);
    }

    // Step 3: Create the entry with the uploaded file, boolean field, and other fields
    const entry = await environment.createEntry("todo", {
      // Replace 'contentTypeId' with your Content Type ID
      fields: {
        title: {
          "en-US": todo.title,
        },
        description: {
          "en-US": todo.description,
        },
        ...(todo.coverImage && publishedAsset
          ? {
              coverImage: {
                "en-US": {
                  sys: {
                    type: "Link",
                    linkType: "Asset",
                    id: publishedAsset.sys.id, // Link to the published asset
                  },
                },
              },
            }
          : {}),
        booleanField: {
          "en-US": false, // Set the completed value to false
        },
      },
    });

    console.log("Entry created successfully:", entry.sys.id);
  } catch (error: any) {
    console.error("Error creating entry:", error);
    throw new Error(error.message);
  }
};

export default add_todo;
