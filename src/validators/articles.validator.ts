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
    userId: numericKeySchema("User ID must be a string or number"),
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
    id: z.string({
      required_error: "Article ID must be a number or a string.",
    }),
  }),
});
