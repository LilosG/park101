import { z } from 'astro/zod';
import { blogCategories } from '../data/blog-categories';
import { relatedPageKeys, relatedPages } from '../data/related-pages';
import { altText, assetImage, label, text } from './common';

const categoryKeys = Object.keys(blogCategories) as [string, ...string[]];

/**
 * Non-strict on purpose: a new frontmatter key from the content pipeline must
 * not block a deploy. Every key currently in use is declared.
 */
export const blogSchema = z.looseObject({
  title: text.meta({
    ...label('Post Title', 'Headline shown at the top of the article and in the blog list.'),
    slug: true,
  }),
  seoTitle: text.optional().meta(
    label('Search Result Title', 'Optional title shown in Google search results. Keep it concise and specific.'),
  ),
  description: text.meta({
    ...label('Search Result Description', 'Summary shown in search results and blog cards. Aim for one clear sentence.'),
    multiline: true,
  }),
  publishDate: z.coerce
    .date()
    .meta({ ...label('Publication Date', 'Date this post is first shown as published.'), contentType: 'date' }),
  updatedDate: z.coerce
    .date()
    .optional()
    .meta({
      ...label('Last Updated Date', 'Optional date shown when the post has been meaningfully updated.'),
      contentType: 'date',
    }),
  author: text
    .default('Park 101')
    .meta(label('Author Name', 'Name credited as the author of this post.')),
  image: assetImage(
    'Main Post Image',
    'Large image shown near the top of the article. Path of an existing site image, e.g. /src/assets/venue/photo.jpg.',
  ).optional(),
  imageAlt: altText.optional(),
  category: z.enum(categoryKeys).meta({
    ...label('Post Category', 'Choose the main topic used to organize this post.'),
    optionLabels: Object.fromEntries(Object.entries(blogCategories).map(([key, { label: name }]) => [key, name])),
  }),
  tags: z
    .array(text.meta(label('Topic', 'A short search topic or phrase.')))
    .default([])
    .meta(label('Post Topics', 'Optional topics that help classify the article.')),
  draft: z
    .boolean()
    .default(false)
    .meta(label('Save as Draft', 'Turn this on to keep the post off the live website.')),
  answerTarget: text.optional().meta(
    label('Answer Target', 'Optional search question or phrase this article is designed to answer.'),
  ),
  answerSummary: text.optional().meta({
    ...label('Answer Summary', 'Optional concise answer used by search and answer engines.'),
    multiline: true,
  }),
  relatedServices: z
    .array(
      z.enum(relatedPageKeys).meta({
        ...label('Related Page', 'A page to feature below the article.'),
        optionLabels: Object.fromEntries(Object.entries(relatedPages).map(([key, { label: name }]) => [key, name])),
      }),
    )
    .max(3)
    .refine((keys) => new Set(keys).size === keys.length, 'Choose each related page once')
    .optional()
    .meta(label('Related Pages', 'Optional pages featured below the article. Choose up to three.')),
  serviceAreas: z
    .array(text.meta(label('Service Area')))
    .optional()
    .meta(label('Service Areas', 'Optional places this article covers, e.g. Carlsbad Village.')),
  faqs: z
    .array(
      z.strictObject({
        question: text.meta(label('Question', 'Question displayed in the frequently asked questions section.')),
        answer: text.meta({ ...label('Answer', 'Answer displayed with this question.'), multiline: true }),
      }),
    )
    .optional()
    .meta(label('Frequently Asked Questions', 'Add, edit, remove, or reorder the questions for this post.')),
});
