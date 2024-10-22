import { z } from "zod";

export const groupSchema = z
  .object({
    name: z.string().min(1, "Group name is required"),
    members: z.preprocess(
      (value) => (value as string).split(",").map((v) => v.trim()),
      z
        .array(z.string())
        .min(2, "Two or more members are required")
        .refine((value) => value.length === new Set(value).size, {
          message: "Duplicate member name",
        })
    ),
  })
  .strict();

export type GroupSchema = z.infer<typeof groupSchema>;
