
import * as z from "zod";

export const provinces = [
  "Antwerpen",
  "Oost-Vlaanderen",
  "West-Vlaanderen",
  "Vlaams-Brabant",
  "Limburg",
  "Brussel",
  "Waals-Brabant",
  "Henegouwen",
  "Luik",
  "Luxemburg",
  "Namen",
];

export const frituurFormSchema = z.object({
  "Business Name": z.string().min(1, {
    message: "Business name is required.",
  }),
  Provincie: z.string().optional(),
  Gemeente: z.string().optional(),
  Straat: z.string().optional(),
  Number: z.string().optional(),
  Postcode: z.string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "Postal code must be a number if provided.",
    }),
  PhoneNumber: z.string().optional(),
  Website: z.string().optional(),
  Email: z.string().optional(),
  "Facebook Link": z.string().optional(),
  "Instagram link": z.string().optional(),
  "Linkedin Link": z.string().optional(),
  "Open & Close Time": z.string().optional(),
  Rating: z.string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 5), {
      message: "Rating must be a number between 0 and 5 if provided.",
    }),
  Category: z.string().optional(),
  Review: z.string().optional(),
});

export type FrituurFormValues = z.infer<typeof frituurFormSchema>;
