import type { TinaField } from "tinacms";
export function defaultFields() {
  return [
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
  ] as TinaField[];
}
export function portfolioFields() {
  return [
    {
      type: "object",
      name: "portfolioitems",
      label: "portfolioitems",
      list: true,
      fields: [
        {
          type: "string",
          name: "title",
          label: "title",
        },
        {
          type: "object",
          name: "portfolioitem",
          label: "portfolioitem",
          list: true,
          fields: [
            {
              type: "string",
              name: "name",
              label: "name",
            },
            {
              type: "image",
              name: "image",
              label: "image",
            },
            {
              type: "string",
              name: "link",
              label: "link",
            },
            {
              type: "string",
              name: "linktext",
              label: "linktext",
            },
            {
              type: "string",
              name: "description",
              label: "description",
              ui: {
                component: "textarea",
              },
            },
            {
              type: "string",
              name: "tags",
              label: "tags",
              list: true,
            },
            {
              type: "string",
              name: "status",
              label: "status",
            },
            {
              type: "string",
              name: "start",
              label: "start",
            },
            {
              type: "string",
              name: "end",
              label: "end",
            },
            {
              type: "string",
              name: "authors",
              label: "authors",
              list: true,
            },
          ],
        },
      ],
    },
  ] as TinaField[];
}
