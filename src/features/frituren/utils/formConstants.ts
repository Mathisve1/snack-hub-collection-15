
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

import * as z from "zod";

export const frituurFormSchema = z.object({
  "Business Name": z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  Provincie: z.string().min(1, {
    message: "Please select a province.",
  }),
  Gemeente: z.string().min(1, {
    message: "City name is required.",
  }),
  Straat: z.string().min(1, {
    message: "Street name is required.",
  }),
  Number: z.string().optional(),
  Postcode: z.string()
    .min(4, { message: "Postal code must be at least 4 digits." })
    .refine((val) => !isNaN(Number(val)), {
      message: "Postal code must be a number.",
    }),
  PhoneNumber: z.string()
    .min(11, { message: "Phone number must be at least 11 digits including the '32' prefix." })
    .max(11, { message: "Phone number cannot be longer than 11 digits including the '32' prefix." })
    .regex(/^32\d{9}$/, { message: "Phone number must start with '32' followed by 9 digits" })
    .optional()
    .or(z.literal("")),
  Website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  Email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal("")),
  "Facebook Link": z.string().url({ message: "Please enter a valid Facebook URL." }).optional().or(z.literal("")),
  "Instagram link": z.string().url({ message: "Please enter a valid Instagram URL." }).optional().or(z.literal("")),
  "Linkedin Link": z.string().url({ message: "Please enter a valid LinkedIn URL." }).optional().or(z.literal("")),
  "Open & Close Time": z.string().optional(),
  Rating: z.string()
    .refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 5), {
      message: "Rating must be a number between 0 and 5.",
    })
    .optional()
    .transform(val => val === "" ? null : Number(val)),
  Category: z.string().optional(),
  Review: z.string().optional(),
});

export type FrituurFormValues = z.infer<typeof frituurFormSchema>;
