import { z } from "zod";

export const settingsSchema = z.object({
    profile: z
    .nullable(
        z.string()
        .optional()
    )
})

export type SettingsSchema = typeof settingsSchema