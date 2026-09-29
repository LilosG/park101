import { collection, fields, singleton } from '@keystatic/core';
import type { ComponentSchema } from '@keystatic/core';
import { z } from 'astro/zod';

/**
 * Builds Keystatic fields from Zod schemas so `src/schemas/*` is the single source of
 * truth for what an entry may contain. Labels, help text and editor hints come from
 * `.meta()` on the schema; required-ness, limits and patterns come from the schema itself.
 */

type Json = {
  type?: string;
  format?: string;
  enum?: string[];
  default?: unknown;
  properties?: Record<string, Json>;
  required?: string[];
  items?: Json;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  minItems?: number;
  maxItems?: number;
  pattern?: string;
  title?: string;
  description?: string;
  multiline?: boolean;
  contentType?: 'image' | 'date';
  storage?: { directory: string; publicPath: string };
  slug?: boolean;
  itemLabel?: string;
  patternMessage?: string;
  optionLabels?: Record<string, string>;
};

const MAX_SAFE = Number.MAX_SAFE_INTEGER;

/** Keystatic tests a pattern against blank input too, so an optional field must accept "". */
const patternFor = (pattern: string, required: boolean, message: string) => ({
  regex: new RegExp(required ? pattern : `(?:${pattern})|^$`),
  message,
});

const humanize = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());

/** Help text for fields whose schema has no `description`. */
function fallbackDescription(key: string, label: string, node: Json) {
  const name = label.toLowerCase();
  if (node.contentType === 'image') return 'Path of an image in the site library.';
  if (node.type === 'array') return `Add, edit, remove, or reorder the ${name}.`;
  if (node.type === 'object') return `Edit the ${name} used across the website.`;
  if (node.type === 'boolean') return `Controls whether the ${name} setting is enabled.`;
  if (node.type === 'number' || node.type === 'integer') return `Numeric value used for the ${name}.`;
  if (node.format === 'uri') return `Enter the complete web address used for the ${name}.`;
  return `Controls the ${name} shown on the website.`;
}

const arrayItemLabelKeys = ['title', 'heading', 'label', 'name', 'q', 'question'];

function itemLabelFor(node: Json, fallback: string) {
  const key = node.items?.itemLabel;
  return (props: unknown) => {
    const item = props as { value?: string; fields?: Record<string, { value?: string }> };
    if (item.fields) {
      const keys = key ? [key] : arrayItemLabelKeys;
      for (const candidate of keys) {
        const value = item.fields[candidate]?.value;
        if (value) return value;
      }
    }
    return item.value || fallback;
  };
}

function fieldFor(key: string, node: Json, required: boolean): ComponentSchema {
  const label = node.title ?? humanize(key);
  const description = node.description ?? fallbackDescription(key, label, node);

  if (node.contentType === 'date') {
    return fields.date({ label, description, validation: { isRequired: required } });
  }

  if (node.contentType === 'image') {
    if (node.storage) {
      return fields.image({
        label,
        description,
        directory: node.storage.directory,
        publicPath: node.storage.publicPath,
        validation: { isRequired: required },
      });
    }
    return fields.text({
      label,
      description,
      validation: {
        isRequired: required,
        ...(node.pattern && { pattern: patternFor(node.pattern, required, node.patternMessage ?? 'Invalid image path') }),
      },
    });
  }

  switch (node.type) {
    case 'string': {
      if (node.enum) {
        const options = node.enum.map((value) => ({
          label: node.optionLabels?.[value] ?? humanize(value),
          value,
        }));
        return fields.select({
          label,
          description,
          options,
          defaultValue: (node.default as string | undefined) ?? node.enum[0],
        });
      }
      if (node.format === 'uri') {
        return fields.url({ label, description, validation: { isRequired: required } });
      }
      return fields.text({
        label,
        description,
        multiline: node.multiline,
        defaultValue: node.default as string | undefined,
        validation: {
          isRequired: required,
          ...((node.minLength && node.minLength > 1) || node.maxLength
            ? { length: { min: node.minLength && node.minLength > 1 ? node.minLength : undefined, max: node.maxLength } }
            : {}),
          ...(node.pattern && { pattern: patternFor(node.pattern, required, node.patternMessage ?? 'Invalid format') }),
        },
      });
    }
    case 'integer':
    case 'number': {
      const validation = {
        isRequired: required,
        ...(node.minimum !== undefined && { min: node.minimum }),
        ...(node.maximum !== undefined && node.maximum < MAX_SAFE && { max: node.maximum }),
      };
      return node.type === 'integer'
        ? fields.integer({ label, description, validation })
        : fields.number({ label, description, validation });
    }
    case 'boolean':
      return fields.checkbox({ label, description, defaultValue: (node.default as boolean | undefined) ?? false });
    case 'array': {
      const item = node.items!;
      const itemName = humanize(key.replace(/s$/, ''));
      const itemDescription =
        item.type === 'object'
          ? `Edit one item in the ${label.toLowerCase()} list.`
          : `Text displayed for one item in the ${label.toLowerCase()} list.`;
      const element = fieldFor(
        key.replace(/s$/, ''),
        { ...item, title: item.title ?? itemName, description: item.description ?? itemDescription },
        true,
      );
      return fields.array(element as never, {
        label,
        description,
        itemLabel: itemLabelFor(node, humanize(key.replace(/s$/, ''))) as never,
        validation: {
          length: {
            ...(node.minItems !== undefined && { min: node.minItems }),
            ...(node.maxItems !== undefined && { max: node.maxItems }),
          },
        },
      });
    }
    case 'object':
      return fields.object(objectFields(node), { label, description });
    default:
      throw new Error(`No Keystatic field for schema node "${key}" (${JSON.stringify(node)})`);
  }
}

function objectFields(node: Json): Record<string, ComponentSchema> {
  const required = new Set(node.required ?? []);
  return Object.fromEntries(
    Object.entries(node.properties ?? {}).map(([key, child]) => [key, fieldFor(key, child, required.has(key))]),
  );
}

function toJson(schema: z.ZodType): Json {
  return z.toJSONSchema(schema, { io: 'input', unrepresentable: 'any' }) as Json;
}

/** Keystatic fields for every property of a Zod object schema. `slug: true` fields become slug fields. */
export function fieldsFromSchema(schema: z.ZodType): Record<string, ComponentSchema> {
  const json = toJson(schema);
  const built = objectFields(json);
  for (const [key, child] of Object.entries(json.properties ?? {})) {
    if (!child.slug) continue;
    built[key] = fields.slug({
      name: {
        label: child.title ?? humanize(key),
        description: child.description ?? fallbackDescription(key, child.title ?? humanize(key), child),
        validation: { isRequired: true },
      },
    });
  }
  return built;
}

type SingletonOptions = { label: string; path: string; schema: z.ZodType };

export const singletonFromSchema = ({ label, path, schema }: SingletonOptions) =>
  singleton({ label, path, format: { data: 'json' }, schema: fieldsFromSchema(schema) });

type CollectionOptions = {
  label: string;
  path: `${string}/*`;
  schema: z.ZodType;
  slugField: string;
  columns?: string[];
  /** Extra Keystatic-only fields, e.g. the Markdown body. */
  extraFields?: Record<string, ComponentSchema>;
} & Record<string, unknown>;

export function collectionFromSchema({ label, path, schema, slugField, columns, extraFields, ...rest }: CollectionOptions) {
  return collection({
    label,
    path,
    slugField,
    format: { data: 'json' },
    ...(columns && { columns: columns as never }),
    ...rest,
    schema: { ...fieldsFromSchema(schema), ...extraFields },
  } as never);
}
