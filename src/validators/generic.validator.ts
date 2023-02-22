import { z } from "zod";

export const titleSchema = z
  .string({ required_error: "Title is required." })
  .min(4, "Title must be 10 character long")
  .max(100, "Title must not be larger than 200 character long.")
  .regex(new RegExp(/^[ A-Za-z0-9_@./#&+-]*$/), "Invalid title.");

export const contentSchema = z
  .string({ required_error: "Content is required." })
  .min(4, "Content must be 10 character long")
  .max(100, "Content must not be larger than 5000 character long.");

export const numberSchema = (title) =>
  z
    .number({
      required_error: `${title} is required.`,
    })
    .positive();

export const numericKeySchema = (title) =>
  z
    .string({
      required_error: `${title} is required.`,
    })
    .regex(/^[1-9]\d*$/, `${title} must be a number`);
