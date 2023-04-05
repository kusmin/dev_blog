import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "078cac2f-fe1b-4489-aa81-73343f96f35c", // Get this from tina.io
  token: "86f1b62ecf9c2a4aa6c7c8907233d6589d3b0a10", // Get this from tina.io
  client: { skip: true },
  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      {
        label: "portfolio",
        name: "portfolio",
        path: "data",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
        ],
      },
      {
        label: "Paginas ES",
        name: "paginas_es",
        path: "content/es",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
        ],
      },
      {
        label: "Paginas EN",
        name: "paginas_en",
        path: "content/en",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
        ],
      },
      {
        label: "Paginas BR",
        name: "paginas_br",
        path: "content/pt",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          {
            type: "string",
            name: "author",
            label: "author",
          },
          {
            type: "string",
            name: "title",
            label: "title",
          },
          {
            type: "string",
            name: "redirectUrl",
            label: "redirectUrl",
          },
          {
            type: "datetime",
            name: "date",
            label: "date",
          },
          {
            type: "string",
            name: "tags",
            label: "tags",
            list: true,
          },
          {
            type: "string",
            name: "series",
            label: "series",
            list: true,
          },
          {
            type: "boolean",
            name: "math",
            label: "math",
          },
          {
            type: "string",
            name: "categories",
            label: "categories",
            list: true,
          },
          {
            type: "string",
            name: "aliases",
            label: "aliases",
            list: true,
          },
          {
            type: "image",
            name: "thumbnail",
            label: "thumbnail",
          },
        ],
      },
    ],
  },
});
