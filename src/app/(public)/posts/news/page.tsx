// src/app/posts/new/page.tsx
"use client"

import { useRouter } from "next/navigation"
import PostForm from "@/components/PostForm"
import { PostFormData } from "@/lib/validation/postShema"
import { createPost } from "@/app/posts/actions" // ✅ Server Action を import

export default function RegisterPostPage() {
  const router = useRouter()

  const handleSubmit = async (data: PostFormData) => {
    try {
      await createPost(data)   // ✅ DB保存
      router.push("/")         // 保存後トップにリダイレクト
    } catch (error) {
      console.error("保存エラー:", error)
      alert("保存に失敗しました")
    }
  }

  return <PostForm onSubmit={handleSubmit} />
}
