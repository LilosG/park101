import type {} from 'zod/v4/core';

declare module 'zod/v4/core' {
  /** Editor hints read by `src/keystatic/from-schema.ts`. `title` and `description` are standard. */
  interface GlobalMeta {
    /** Render a string as a multi-line text area. */
    multiline?: boolean;
    /** `image` and `date` cannot be inferred from the JSON Schema type. */
    contentType?: 'image' | 'date';
    /**
     * Image fields only. When set, the field is a Keystatic upload that stores the file as
     * `<publicPath><field path>.<ext>`. Without it the field is an image *path* the editor
     * picks from the existing library, because the stored value does not match that layout.
     */
    storage?: { directory: string; publicPath: string };
    /** Marks the field Keystatic uses as the entry slug. */
    slug?: boolean;
    /** Sibling key whose value labels an array item. */
    itemLabel?: string;
    /** Message shown when the schema's `pattern` fails. */
    patternMessage?: string;
    /** Editor labels for enum values. */
    optionLabels?: Record<string, string>;
  }
}
export {};
