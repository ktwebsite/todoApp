// src/app/posts/new/page.tsx
"use client"

import { useRouter } from "next/navigation"
import PostForm from "@/components/PostForm"
import { PostFormData } from "@/lib/validation/postShema"
import { createPost } from "@/app/posts/actions" // ✅ Server Action を import
import { useState } from "react"

export default function RegisterPostPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    try {
      await createPost(data)   // ✅ DB保存
      router.push("/")         // 保存後トップにリダイレクト
    } catch (error) {
      console.error("保存エラー:", error)
      alert("保存に失敗しました")
    }finally {
      setIsSubmitting(false); // ✅ 完了後に解除
    }
  }

  return <PostForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
}
