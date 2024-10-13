/* istanbul ignore file */

import { z } from "zod";

export const countryCode = {
    "UNITED STATES": "+1",
    "US": "+1",
    "USA": "+1",
    "India": "+91"
} as const
export type CountryType = keyof typeof countryCode;
// const countryData = country.map((s) => ({ label: s.country, value: s.abbreviation }));

export const MAX_FILE_SIZE = 20 * 1000 * 1000; //20mb
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];//"image/webp"

// function consecutiveSpaces(str) {
//     if (str?.length < 5) {
//       return true;
//     }

//     const consecutiveSpace = /[\uD83C-\uDBFF\uDC00-\uDFFF]|(\s)\1+/g;
//     return consecutiveSpace.test(str);
//   }
export type ProfileFormType = z.infer<typeof profileFormSchema>
//this schema for profile form validation
export const profileFormSchema = z.object({
    physicianname: z.string()
        // .regex(/^[a-zA-Z ]*$/, { message: "First Name contains invalid characters" })
        .min(2).max(30).trim(),
    // lastname: z.string().regex(/^[a-zA-Z ]*$/, { message: "Last Name contains invalid characters" }).min(2).max(30).trim(),
    email: z.string().email(),
    phonenumber: z.string().length(10, { message: "Phone number must contain exactly 10 character(s)" }),
    // address: z.string().min(2).max(128).trim(),
    // address: z.string().trim(),
    country: z.string().nonempty({ message: "Country required" }),
    // city: z.string().regex(/^[a-zA-Z ]*$/, { message: "City contains invalid characters" }).min(2).max(30),
    // state: z.string().nonempty("State is required").trim(),
    // city: z.string().nonempty("City is required").trim(),
    // zipcode: z.string().length(6, { message: "Zipcode must contain exactly 6 character(s)" }).trim(),
    zipcode: z.string().min(5, { message: "Zipcode must be 5 or more characters long" }).max(6, { message: "Zipcode must be 6 or fewer characters long" }).trim(),
    specialist: z.string().nonempty("Speciality type is required").trim(),
    // clinicid: z.number(),
    biography: z.string().trim().max(500).nonempty("BIO is required").refine((bio) => {
        const consecutiveSpace = /[\uD83C-\uDBFF\uDC00-\uDFFF]|(\s)\1+/g;
        return bio?.length > 5 && !consecutiveSpace.test(bio)
    },
        { message: "Biography shouldn't contain emojis, consecutive spaces, and length should be greater than 5!" }),
    // selfie: z.array(
    //         z.object({
    //             size: z.number().max(MAX_FILE_SIZE).optional(),
    //             type: z.string().regex(/^image\/(jpeg|png)$/).optional(),
    //             name: z.string().optional(),
    //         }).nullable())
    //     .max(1)
    //     .or(z.string()),
    // profile: z.object({
    //     name: z.string(),
    //     size: z.number(),
    //     type: z.string().regex(/^image\/(png|jpeg|gif)$/),
    // }).optional(),
    selfie: z
        .object({
            fileName: z.string(),
            file: z
                .any()
                .refine((value) => value instanceof File)
                .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 20MB.`)
                .refine(
                    (file) => file && ACCEPTED_IMAGE_TYPES.includes(file?.type),
                    "Only .jpg, .jpeg, .png and .webp formats are supported."
                )
                .optional(),
            base64: z.string().optional(),
            value: z.string(),
        })
        .optional().or(z.any()),
    experience: z.coerce.number().positive()
});
export const nonPhysicianprofileFormSchema = z.object({
    physicianname: z.string()
        .min(2).max(30).trim(),
    email: z.string().email(),
    phonenumber: z.string().length(10, { message: "Phone number must contain exactly 10 character(s)" }),
    country: z.string().nonempty({ message: "Country required" }),
    // zipcode: z.string().min(5, { message: "Zipcode must be 5 or more characters long" }).max(6, { message: "Zipcode must be 6 or fewer characters long" }).trim(),
    selfie: z
        .object({
            fileName: z.string(),
            file: z
                .any()
                .refine((value) => value instanceof File)
                .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 20MB.`)
                .refine(
                    (file) => file && ACCEPTED_IMAGE_TYPES.includes(file?.type),
                    "Only .jpg, .jpeg, .png and .webp formats are supported."
                )
                .optional(),
            base64: z.string().optional(),
            value: z.string(),
        })
        .optional().or(z.any()),
});