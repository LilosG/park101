import { createElement } from "react";
import { config, fields } from "@keystatic/core";

import {
  collectionFromSchema,
  singletonFromSchema,
} from "./src/keystatic/from-schema";
import { blogSchema } from "./src/schemas/blog";
import {
  eventTypeSchema,
  privateEventSchema,
  upcomingEventSchema,
} from "./src/schemas/events";
import { menuItemSchema } from "./src/schemas/menu-items";
import { navigationSchema } from "./src/schemas/navigation";
import {
  brunchPageSchema,
  contactPageSchema,
  eventsPageSchema,
  homePageSchema,
  menuPageSchema,
  privateEventsIndexSchema,
  venuePageSchema,
} from "./src/schemas/pages";
import { siteSettingsSchema } from "./src/schemas/site-settings";
import { sportsGameSchema } from "./src/schemas/sports";

const markdownContent = {
  ...fields.mdx({
    label: "Post Content",
    description: "Main article content. Use headings to organize longer posts.",
  }),
  contentExtension: ".md",
};

const menuItems = (label: string, folder: string) =>
  collectionFromSchema({
    label,
    path: `src/content/${folder}/*`,
    schema: menuItemSchema,
    slugField: "name",
    columns: ["name", "order"],
  });

export default config({
  storage: { kind: "cloud" },
  cloud: { project: "gph-websites/park101" },
  ui: {
    brand: {
      name: "Park 101 Website CMS",
      mark: ({ colorScheme }) =>
        createElement(
          "svg",
          {
            viewBox: "0 0 32 32",
            role: "img",
            "aria-label": "Park 101",
            width: 32,
            height: 32,
          },
          createElement("rect", {
            width: 32,
            height: 32,
            rx: 8,
            fill: colorScheme === "dark" ? "#f4b942" : "#202b22",
          }),
          createElement(
            "text",
            {
              x: 16,
              y: 21,
              textAnchor: "middle",
              fontFamily: "Arial, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              fill: colorScheme === "dark" ? "#202b22" : "#f4b942",
            },
            "P",
          ),
        ),
    },
    navigation: {
      Website: [
        "home",
        "contactPage",
        "menuPage",
        "brunchPage",
        "eventsPage",
        "venuePage",
        "privateEventsIndex",
      ],
      Menu: [
        "brunchFoodItems",
        "brunchDrinkItems",
        "dinnerFoodItems",
        "dinnerDrinkItems",
      ],
      Events: ["eventTypes", "upcomingEvents", "privateEvents"],
      Sports: ["sportsGames"],
      Blog: ["blog"],
      "Site Settings": ["siteSettings", "navigation"],
    },
  },
  singletons: {
    siteSettings: singletonFromSchema({
      label: "Site Settings",
      path: "src/content/siteSettings/site-settings",
      schema: siteSettingsSchema,
    }),
    navigation: singletonFromSchema({
      label: "Navigation",
      path: "src/content/navigation/navigation",
      schema: navigationSchema,
    }),
    home: singletonFromSchema({
      label: "Home",
      path: "src/content/home/home",
      schema: homePageSchema,
    }),
    menuPage: singletonFromSchema({
      label: "Menu Page",
      path: "src/content/menuPage/menuPage",
      schema: menuPageSchema,
    }),
    brunchPage: singletonFromSchema({
      label: "Brunch Page",
      path: "src/content/brunchPage/brunchPage",
      schema: brunchPageSchema,
    }),
    eventsPage: singletonFromSchema({
      label: "Events Page",
      path: "src/content/eventsPage/eventsPage",
      schema: eventsPageSchema,
    }),
    venuePage: singletonFromSchema({
      label: "Venue Page",
      path: "src/content/venuePage/venuePage",
      schema: venuePageSchema,
    }),
    contactPage: singletonFromSchema({
      label: "Contact",
      path: "src/content/contactPage/contactPage",
      schema: contactPageSchema,
    }),
    privateEventsIndex: singletonFromSchema({
      label: "Private Events Index",
      path: "src/content/privateEventsIndex/privateEventsIndex",
      schema: privateEventsIndexSchema,
    }),
  },
  collections: {
    brunchFoodItems: menuItems("Brunch — Food Items", "brunchFoodItems"),
    brunchDrinkItems: menuItems("Brunch — Drink Items", "brunchDrinkItems"),
    dinnerFoodItems: menuItems("Dinner — Food Items", "dinnerFoodItems"),
    dinnerDrinkItems: menuItems("Dinner — Drink Items", "dinnerDrinkItems"),
    eventTypes: collectionFromSchema({
      label: "Event Types",
      path: "src/content/eventTypes/*",
      schema: eventTypeSchema,
      slugField: "slug",
      columns: ["name", "recurring"],
    }),
    upcomingEvents: collectionFromSchema({
      label: "Upcoming Events",
      path: "src/content/upcomingEvents/*",
      schema: upcomingEventSchema,
      slugField: "category",
      columns: ["category", "date", "time"],
    }),
    privateEvents: collectionFromSchema({
      label: "Private Events",
      path: "src/content/privateEvents/*",
      schema: privateEventSchema,
      slugField: "slug",
      columns: ["name", "capacity"],
    }),
    sportsGames: collectionFromSchema({
      label: "Sports Schedule Games",
      path: "src/content/sportsGames/*",
      schema: sportsGameSchema,
      slugField: "slug",
      columns: ["team", "week", "opponent", "date"],
    }),
    blog: collectionFromSchema({
      label: "Blog Posts",
      path: "src/content/blog/*",
      schema: blogSchema,
      slugField: "title",
      columns: ["title", "category", "publishDate", "draft"],
      extraFields: { content: markdownContent },
      format: { contentField: "content" },
      entryLayout: "content",
      previewUrl: "/blog/{slug}",
    }),
  },
});
