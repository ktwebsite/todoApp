"use server"

import { prisma } from "@/lib/prisma"
import { PostFormData } from "@/lib/validation/postShema"
import { revalidatePath } from "next/cache"

export async function createPost(data: PostFormData) {
  // PrismaでDBに保存
  const post = await prisma.post.create({
    data: {
      title: data.title,
      details: data.details,
      deadline: data.deadline ? new Date(data.deadline) : null,
      status: data.status,
      completed_at: data.status === "完了" ? new Date() : null,
    },
  })

  return post
}

// export async function updatePost(id: number, data: PostFormData) {
//   await prisma.post.update({
//     where: { id },
//     data: {
//       title: data.title,
//       details: data.details,
//       deadline: data.deadline ? new Date(data.deadline) : null,
//       status: data.status,
//       completed_at: data.status === "完了" ? new Date() : null,
//     },
//   })
//   revalidatePath("/") // 一覧をリフレッシュ
// }