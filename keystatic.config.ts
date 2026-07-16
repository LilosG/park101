import { createElement } from "react";
import { collection, config, fields, singleton } from "@keystatic/core";

import siteSettingsData from "./src/content/siteSettings/site-settings.json";
import navigationData from "./src/content/navigation/navigation.json";
import homeData from "./src/content/home/home.json";
import menuPageData from "./src/content/menuPage/menuPage.json";
import brunchPageData from "./src/content/brunchPage/brunchPage.json";
import eventsPageData from "./src/content/eventsPage/eventsPage.json";
import venuePageData from "./src/content/venuePage/venuePage.json";
import contactPageData from "./src/content/contactPage/contactPage.json";
import privateEventsIndexData from "./src/content/privateEventsIndex/privateEventsIndex.json";
import eventTypeData from "./src/content/eventTypes/nfl-sundays.json";
import upcomingEventData from "./src/content/upcomingEvents/world-cup-quarterfinals-argentina-switzerland.json";
import privateEventData from "./src/content/privateEvents/birthday-parties.json";

type EditorKind =
  "page" | "settings" | "navigation" | "menuItem" | "event" | "privateEvent";

type SchemaContext = {
  editor: EditorKind;
  path?: string[];
};

const humanize = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

const labels: Record<string, string> = {
  seo: "Search Engine Settings",
  title: "Title",
  description: "Description",
  ogImage: "Social Sharing Image",
  hero: "Hero Section",
  eyebrow: "Small Section Label",
  heading: "Section Heading",
  subheading: "Supporting Heading",
  body: "Section Text",
  intro: "Introduction Section",
  sections: "Page Sections",
  howItWorks: "How It Works Steps",
  faqs: "Frequently Asked Questions",
  q: "Question",
  a: "Answer",
  step: "Step Number",
  name: "Name",
  brandName: "Display Brand Name",
  tagline: "Brand Tagline",
  shortDescription: "Short Business Description",
  url: "Website Address",
  logo: "Primary Logo",
  logoLight: "Light Logo",
  contact: "Contact Information",
  phone: "Display Phone Number",
  phoneDial: "Phone Number for Links",
  email: "Email Address",
  address: "Street Address",
  street: "Street",
  city: "City",
  state: "State",
  zip: "ZIP Code",
  full: "Full Address",
  coordinates: "Map Coordinates",
  lat: "Latitude",
  lng: "Longitude",
  neighborhood: "Neighborhood",
  googleMapsUrl: "Google Maps Link",
  hours: "Hours by Day",
  hoursDisplay: "Displayed Hours",
  days: "Day Label",
  open: "Opening Time",
  close: "Closing Time",
  social: "Social Media Links",
  instagram: "Instagram Link",
  facebook: "Facebook Link",
  yelp: "Yelp Link",
  tiktok: "TikTok Link",
  ordering: "Ordering and Booking Links",
  toastUrl: "Online Ordering Link",
  reservationsUrl: "Reservations Link",
  inquiryFormUrl: "Private Event Inquiry Link",
  stats: "Venue Statistics",
  label: "Label",
  value: "Displayed Value",
  features: "Features",
  cuisine: "Cuisine Types",
  priceRange: "Price Range",
  venue: "Venue Details",
  rooftop: "Rooftop",
  courtyard: "Courtyard",
  sports: "Game Day",
  indoorBar: "Indoor Bar and Dining Room",
  familiesPets: "Families and Pets",
  liveEvents: "Live Music and Events",
  defaultTitle: "Default Search Result Title",
  titleTemplate: "Search Result Title Template",
  defaultDescription: "Default Search Result Description",
  keywords: "Search Keywords",
  schema: "Structured Business Data",
  type: "Business Types",
  servesCuisine: "Cuisines Served",
  currenciesAccepted: "Accepted Currencies",
  paymentAccepted: "Accepted Payment Methods",
  amenityFeature: "Venue Amenities",
  mainLinks: "Main Navigation Links",
  footerLinks: "Footer Navigation Links",
  href: "Link Destination",
  labels: "Interface Labels",
  links: "Website Links",
  menu: "Menu",
  section: "Menu Section",
  image: "Image",
  imageAlt: "Image Description for Accessibility",
  order: "Display Order",
  slug: "Page URL",
  recurring: "Recurring Event",
  category: "Event Category",
  sideA: "First Team",
  sideB: "Second Team",
  date: "Event Date",
  time: "Event Time",
  headline: "Headline",
  capacity: "Guest Capacity",
};

const arrayItemLabels: Record<string, string> = {
  features: "Feature",
  cuisine: "Cuisine",
  keywords: "Keyword",
  type: "Business Type",
  servesCuisine: "Cuisine",
  amenityFeature: "Amenity",
};

function labelFor(key: string, context: SchemaContext) {
  const path = [...(context.path ?? []), key].join(".");
  if (path === "seo.title") return "Search Result Title";
  if (path === "seo.description") return "Search Result Description";
  if (path === "hero.heading") return "Main Page Heading";
  if (path === "hero.body") return "Introductory Text";
  if (path.endsWith(".imageAlt")) return "Image Description for Accessibility";
  if (key === "name" && context.editor === "menuItem") return "Menu Item Name";
  if (key === "name" && context.editor === "event") return "Event Name";
  if (key === "name" && context.editor === "privateEvent")
    return "Event Type Name";
  return labels[key] ?? humanize(key);
}

function descriptionFor(key: string, context: SchemaContext, value: unknown) {
  const label = labelFor(key, context).toLowerCase();
  const path = [...(context.path ?? []), key].join(".");
  if (path === "seo.title")
    return "Title shown in Google search results. Keep it concise and specific.";
  if (path === "seo.description")
    return "Summary shown in search results. Aim for one clear sentence about this page.";
  if (path === "hero.heading")
    return "Large heading shown at the top of this page.";
  if (path === "hero.body")
    return "Introductory text shown near the top of the page. Keep it clear and concise.";
  if (key === "imageAlt" || path.endsWith(".imageAlt")) {
    return "Describe what is visible in the image for screen readers and search engines.";
  }
  if (key === "slug")
    return "Controls the page identifier. Do not change after publishing unless instructed.";
  if (key === "href")
    return "Enter an internal path such as /contact or a complete external web address.";
  if (key.toLowerCase().includes("url"))
    return `Enter the complete web address used for the ${label}.`;
  if (key === "faqs")
    return "Add, edit, remove, or reorder the questions shown on this page.";
  if (key === "q")
    return "Question displayed in the frequently asked questions section.";
  if (key === "a") return "Answer displayed with this question.";
  if (key === "order")
    return "Controls the display order. Lower numbers appear first.";
  if (key === "recurring")
    return "Turn this on when this event type happens on an ongoing basis.";
  if (Array.isArray(value))
    return `Add, edit, remove, or reorder the ${label}.`;
  if (typeof value === "object" && value !== null)
    return `Edit the ${label} used across the website.`;
  if (typeof value === "boolean")
    return `Controls whether the ${label} setting is enabled.`;
  if (typeof value === "number") return `Numeric value used for the ${label}.`;
  return `Controls the ${label} shown on the website.`;
}

const multilineKeys = new Set([
  "description",
  "shortDescription",
  "body",
  "answerSummary",
  "headline",
]);

function isImageField(key: string, value: unknown) {
  return (
    typeof value === "string" &&
    key !== "imageAlt" &&
    (key.toLowerCase().includes("image") || key.toLowerCase().includes("logo"))
  );
}

function schemaForObject(
  value: Record<string, unknown>,
  context: SchemaContext,
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [
      key,
      fieldForValue(key, child, context),
    ]),
  );
}

function fieldForValue(
  key: string,
  value: unknown,
  context: SchemaContext,
): any {
  const label = labelFor(key, context);
  const description = descriptionFor(key, context, value);
  const childContext = { ...context, path: [...(context.path ?? []), key] };

  if (isImageField(key, value)) {
    const sourceAsset = String(value).startsWith("/src/assets/");
    return fields.image({
      label,
      description,
      directory: sourceAsset ? "src/assets" : "public/images",
      publicPath: sourceAsset ? "/src/assets" : "/images",
      validation: { isRequired: true },
    });
  }

  if (Array.isArray(value)) {
    const sample = value[0];
    const element =
      typeof sample === "object" && sample !== null
        ? fields.object(
            schemaForObject(sample as Record<string, unknown>, childContext),
            {
              label: humanize(key.replace(/s$/, "")),
              description: `Edit one item in the ${label.toLowerCase()} list.`,
            },
          )
        : typeof sample === "number"
          ? fields.number({
              label: "Value",
              description: "Numeric value displayed for this item.",
              validation: { isRequired: true },
            })
          : fields.text({
              label: arrayItemLabels[key] ?? humanize(key.replace(/s$/, "")),
              description: `Text displayed for one item in the ${label.toLowerCase()} list.`,
              validation: { isRequired: true },
            });
    return fields.array(element, {
      label,
      description,
      itemLabel: (props) => {
        const item = props as any;
        return (
          item.fields?.title?.value ||
          item.fields?.heading?.value ||
          item.fields?.label?.value ||
          item.fields?.name?.value ||
          item.fields?.q?.value ||
          item.value ||
          humanize(key.replace(/s$/, ""))
        );
      },
    });
  }

  if (typeof value === "object" && value !== null) {
    return fields.object(
      schemaForObject(value as Record<string, unknown>, childContext),
      {
        label,
        description,
      },
    );
  }

  if (typeof value === "number") {
    return fields.number({
      label,
      description,
      validation: { isRequired: true },
    });
  }
  if (typeof value === "boolean") {
    return fields.checkbox({ label, description, defaultValue: value });
  }
  return fields.text({
    label,
    description,
    multiline: multilineKeys.has(key),
    validation: { isRequired: true },
  });
}

const jsonSingleton = (
  label: string,
  path: string,
  sample: Record<string, unknown>,
  editor: EditorKind,
) =>
  singleton({
    label,
    path,
    format: { data: "json" },
    schema: schemaForObject(sample, { editor }),
  });

const jsonCollection = (
  label: string,
  path: `${string}/*`,
  sample: Record<string, unknown>,
  editor: EditorKind,
  columns: string[],
) => {
  const { slug: _slug, ...schemaData } = sample;
  return collection({
    label,
    path,
    slugField: "slug",
    format: { data: "json" },
    columns: columns as any,
    schema: {
      slug: fields.slug({
        name: {
          label: "Page URL",
          description:
            "Controls the item identifier. Do not change after publishing unless instructed.",
        },
      }),
      ...schemaForObject(schemaData, { editor }),
    },
  });
};

const markdownContent = {
  ...fields.mdx({
    label: "Post Content",
    description: "Main article content. Use headings to organize longer posts.",
  }),
  contentExtension: ".md",
};

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
      Blog: ["blog"],
      "Site Settings": ["siteSettings", "navigation"],
    },
  },
  singletons: {
    siteSettings: jsonSingleton(
      "Site Settings",
      "src/content/siteSettings/site-settings",
      siteSettingsData,
      "settings",
    ),
    navigation: jsonSingleton(
      "Navigation",
      "src/content/navigation/navigation",
      navigationData,
      "navigation",
    ),
    home: jsonSingleton("Home", "src/content/home/home", homeData, "page"),
    menuPage: jsonSingleton(
      "Menu Page",
      "src/content/menuPage/menuPage",
      menuPageData,
      "page",
    ),
    brunchPage: jsonSingleton(
      "Brunch Page",
      "src/content/brunchPage/brunchPage",
      brunchPageData,
      "page",
    ),
    eventsPage: jsonSingleton(
      "Events Page",
      "src/content/eventsPage/eventsPage",
      eventsPageData,
      "page",
    ),
    venuePage: jsonSingleton(
      "Venue Page",
      "src/content/venuePage/venuePage",
      venuePageData,
      "page",
    ),
    contactPage: jsonSingleton(
      "Contact",
      "src/content/contactPage/contactPage",
      contactPageData,
      "page",
    ),
    privateEventsIndex: jsonSingleton(
      "Private Events Index",
      "src/content/privateEventsIndex/privateEventsIndex",
      privateEventsIndexData,
      "page",
    ),
  },
  collections: {
    brunchFoodItems: collection({
      label: "Brunch — Food Items",
      path: "src/content/brunchFoodItems/*",
      slugField: "name",
      format: { data: "json" },
      columns: ["name", "order"],
      schema: {
        name: fields.slug({
          name: {
            label: "Menu Item Name",
            description: "Name displayed for this menu item.",
            validation: { isRequired: true },
          },
        }),
        description: fields.text({
          label: "Item Description",
          description: "Short description displayed with this menu item.",
          multiline: true,
        }),
        image: fields.image({
          label: "Menu Item Image",
          description: "Photo displayed with this menu item.",
          directory: "src/assets/brunchFoodItems",
          publicPath: "/src/assets/brunchFoodItems/",
          validation: { isRequired: true },
        }),
        imageAlt: fields.text({
          label: "Image Description for Accessibility",
          description:
            "Describe what is visible in the image for screen readers and search engines.",
          validation: { isRequired: true },
        }),
        order: fields.number({
          label: "Display Order",
          description:
            "Controls the display order. Lower numbers appear first.",
          validation: { isRequired: true, min: 0 },
        }),
      },
    }),
    brunchDrinkItems: collection({
      label: "Brunch — Drink Items",
      path: "src/content/brunchDrinkItems/*",
      slugField: "name",
      format: { data: "json" },
      columns: ["name", "order"],
      schema: {
        name: fields.slug({
          name: {
            label: "Menu Item Name",
            description: "Name displayed for this menu item.",
            validation: { isRequired: true },
          },
        }),
        description: fields.text({
          label: "Item Description",
          description: "Short description displayed with this menu item.",
          multiline: true,
        }),
        image: fields.image({
          label: "Menu Item Image",
          description: "Photo displayed with this menu item.",
          directory: "src/assets/brunchDrinkItems",
          publicPath: "/src/assets/brunchDrinkItems/",
          validation: { isRequired: true },
        }),
        imageAlt: fields.text({
          label: "Image Description for Accessibility",
          description:
            "Describe what is visible in the image for screen readers and search engines.",
          validation: { isRequired: true },
        }),
        order: fields.number({
          label: "Display Order",
          description:
            "Controls the display order. Lower numbers appear first.",
          validation: { isRequired: true, min: 0 },
        }),
      },
    }),
    dinnerFoodItems: collection({
      label: "Dinner — Food Items",
      path: "src/content/dinnerFoodItems/*",
      slugField: "name",
      format: { data: "json" },
      columns: ["name", "order"],
      schema: {
        name: fields.slug({
          name: {
            label: "Menu Item Name",
            description: "Name displayed for this menu item.",
            validation: { isRequired: true },
          },
        }),
        description: fields.text({
          label: "Item Description",
          description: "Short description displayed with this menu item.",
          multiline: true,
        }),
        image: fields.image({
          label: "Menu Item Image",
          description: "Photo displayed with this menu item.",
          directory: "src/assets/dinnerFoodItems",
          publicPath: "/src/assets/dinnerFoodItems/",
          validation: { isRequired: true },
        }),
        imageAlt: fields.text({
          label: "Image Description for Accessibility",
          description:
            "Describe what is visible in the image for screen readers and search engines.",
          validation: { isRequired: true },
        }),
        order: fields.number({
          label: "Display Order",
          description:
            "Controls the display order. Lower numbers appear first.",
          validation: { isRequired: true, min: 0 },
        }),
      },
    }),
    dinnerDrinkItems: collection({
      label: "Dinner — Drink Items",
      path: "src/content/dinnerDrinkItems/*",
      slugField: "name",
      format: { data: "json" },
      columns: ["name", "order"],
      schema: {
        name: fields.slug({
          name: {
            label: "Menu Item Name",
            description: "Name displayed for this menu item.",
            validation: { isRequired: true },
          },
        }),
        description: fields.text({
          label: "Item Description",
          description: "Short description displayed with this menu item.",
          multiline: true,
        }),
        image: fields.image({
          label: "Menu Item Image",
          description: "Photo displayed with this menu item.",
          directory: "src/assets/dinnerDrinkItems",
          publicPath: "/src/assets/dinnerDrinkItems/",
          validation: { isRequired: true },
        }),
        imageAlt: fields.text({
          label: "Image Description for Accessibility",
          description:
            "Describe what is visible in the image for screen readers and search engines.",
          validation: { isRequired: true },
        }),
        order: fields.number({
          label: "Display Order",
          description:
            "Controls the display order. Lower numbers appear first.",
          validation: { isRequired: true, min: 0 },
        }),
      },
    }),
    eventTypes: jsonCollection(
      "Event Types",
      "src/content/eventTypes/*",
      eventTypeData,
      "event",
      ["name", "recurring"],
    ),
    upcomingEvents: collection({
      label: "Upcoming Events",
      path: "src/content/upcomingEvents/*",
      slugField: "category",
      format: { data: "json" },
      columns: ["category", "date", "time"] as any,
      schema: {
        category: fields.slug({
          name: {
            label: "Event Category",
            description:
              "Event category displayed above the team or event names.",
            validation: { isRequired: true },
          },
        }),
        ...schemaForObject(
          Object.fromEntries(
            Object.entries(upcomingEventData).filter(
              ([key]) => key !== "category",
            ),
          ),
          { editor: "event" },
        ),
      },
    }),
    privateEvents: jsonCollection(
      "Private Events",
      "src/content/privateEvents/*",
      privateEventData,
      "privateEvent",
      ["name", "capacity"],
    ),
    blog: collection({
      label: "Blog Posts",
      path: "src/content/blog/*",
      slugField: "title",
      format: { contentField: "content" },
      entryLayout: "content",
      previewUrl: "/blog/{slug}",
      columns: ["title", "category", "publishDate", "draft"],
      schema: {
        title: fields.slug({
          name: {
            label: "Post Title",
            description:
              "Headline shown at the top of the article and in the blog list.",
            validation: { isRequired: true },
          },
        }),
        seoTitle: fields.text({
          label: "Search Result Title",
          description:
            "Optional title shown in Google search results. Keep it concise and specific.",
        }),
        description: fields.text({
          label: "Search Result Description",
          description:
            "Summary shown in search results and blog cards. Aim for one clear sentence.",
          multiline: true,
          validation: { isRequired: true },
        }),
        publishDate: fields.date({
          label: "Publication Date",
          description: "Date this post is first shown as published.",
          validation: { isRequired: true },
        }),
        updatedDate: fields.date({
          label: "Last Updated Date",
          description:
            "Optional date shown when the post has been meaningfully updated.",
        }),
        author: fields.text({
          label: "Author Name",
          description: "Name credited as the author of this post.",
          defaultValue: "Park 101",
          validation: { isRequired: true },
        }),
        image: fields.image({
          label: "Main Post Image",
          description:
            "Large image shown near the top of the article. Use a clear landscape image.",
          directory: "public/images",
          publicPath: "/images",
        }),
        imageAlt: fields.text({
          label: "Image Description for Accessibility",
          description:
            "Describe what is visible in the image for screen readers and search engines.",
        }),
        category: fields.select({
          label: "Post Category",
          description: "Choose the main topic used to organize this post.",
          options: [
            { label: "Game Day", value: "game-day" },
            { label: "Food and Drink", value: "food-drink" },
            { label: "Events", value: "events" },
            { label: "Weekly Specials", value: "weekly-specials" },
            { label: "Venue", value: "venue" },
            { label: "Community", value: "community" },
            { label: "Private Events", value: "private-events" },
          ],
          defaultValue: "game-day",
        }),
        tags: fields.array(
          fields.text({
            label: "Topic",
            description: "A short search topic or phrase.",
            validation: { isRequired: true },
          }),
          {
            label: "Post Topics",
            description: "Optional topics that help classify the article.",
            itemLabel: (props) => props.value,
          },
        ),
        draft: fields.checkbox({
          label: "Save as Draft",
          description: "Turn this on to keep the post off the live website.",
          defaultValue: false,
        }),
        answerTarget: fields.text({
          label: "Answer Target",
          description:
            "Optional search question or phrase this article is designed to answer.",
        }),
        answerSummary: fields.text({
          label: "Answer Summary",
          description:
            "Optional concise answer used by search and answer engines.",
          multiline: true,
        }),
        relatedServices: fields.array(
          fields.text({
            label: "Related Page",
            description: "Page identifier linked to this article.",
            validation: { isRequired: true },
          }),
          {
            label: "Related Services",
            description:
              "Optional related page identifiers. Add no more than three.",
            itemLabel: (props) => props.value,
            validation: { length: { max: 3 } },
          },
        ),
        content: markdownContent,
      },
    }),
  },
});
