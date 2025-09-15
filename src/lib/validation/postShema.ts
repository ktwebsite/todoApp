// src/lib/validation/postSchema.ts
import { z } from "zod"

export const postSchema = z.object({
  title: z.string().min(1, "タイトルは必須です").max(120, "120文字以内で入力してください"),
  details: z.string().max(10000, "10000文字以内で入力してください").optional(),
  deadline: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true
        const today = new Date()
        const selected = new Date(val)
        return selected >= today
      },
      { message: "過去の日付が選択されています" }
    ),
  status: z.enum(["未完了", "完了"]),
})

export type PostFormData = z.infer<typeof postSchema>
