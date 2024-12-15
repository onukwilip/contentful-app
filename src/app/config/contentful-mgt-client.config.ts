import * as contentful from "contentful-management";

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MGT_ACCESS_TOKEN || "",
  space: process.env.CONTENTFUL_SPACE_ID || "",
});

export default client;
