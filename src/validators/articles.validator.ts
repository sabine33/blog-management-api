import { z } from "zod";
import {
  contentSchema,
  titleSchema,
  numberSchema,
  numericKeySchema,
} from "./generic.validator";

export const articleSchema = z.object({
  body: z.object({
    title: titleSchema,
    content: contentSchema,
    authorId: numericKeySchema("Author ID must be a number"),
  }),
});

export const articleUpdateSchema = z.object({
  body: z.object({
    title: titleSchema.optional(),
    content: contentSchema.optional(),
  }),
});

export const articleIdSchema = z.object({
  params: z.object({
    id: numericKeySchema("Article ID must be a number."),
  }),
});
