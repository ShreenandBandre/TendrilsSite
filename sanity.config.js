import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "tendrils",
  title: "Tendrils CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
  
  // Navbar aur footer ko clean/hide karne ke liye component override
  studio: {
    components: {
      navbar: (props) => {
        // Return null to hide the top navbar header completely, 
        // while keeping all core studio tools and functionality intact.
        return null;
      },
    },
  },
});