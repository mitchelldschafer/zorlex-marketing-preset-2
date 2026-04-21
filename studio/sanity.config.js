import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schema";

export default defineConfig({
  name: "default",
  title: "Zorlex Studio",

  projectId: process.env.VITE_SANITY_PROJECT_ID, 
  dataset: process.env.VITE_SANITY_DATASET || "production",

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
