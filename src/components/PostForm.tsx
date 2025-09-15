"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PostFormData, postSchema } from "@/lib/validation/postShema"

export default function PostForm({ onSubmit }: { onSubmit: (data: PostFormData) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    mode: "onChange", // ✅ 入力ごとにリアルタイムバリデーション
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-2xl space-y-6"
    >
      <h1 className="text-2xl font-bold text-center">新規タスク作成</h1>

      {/* タイトル */}
      <div className="space-y-2">
        <Label htmlFor="title">タイトル</Label>
        <Input id="title" placeholder="タスク名を入力" {...register("title")} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      {/* 詳細 */}
      <div className="space-y-2">
        <Label htmlFor="details">詳細</Label>
        <Input id="details" placeholder="詳細を入力" {...register("details")} />
        {errors.details && <p className="text-red-500 text-sm">{errors.details.message}</p>}
      </div>

      {/* 期限 */}
      <div className="space-y-2">
        <Label htmlFor="deadline">期限</Label>
        <Input type="date" id="deadline" {...register("deadline")} />
        {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline.message}</p>}
      </div>

      {/* ステータス */}
      <div className="space-y-2">
        <Label htmlFor="status">ステータス</Label>
        <Select onValueChange={(val) => setValue("status", val as "未完了" | "完了")}>
          <SelectTrigger className="bg-white border rounded-md">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg">
            <SelectItem value="未完了" className="cursor-pointer data-[highlighted]:bg-gray-100 data-[highlighted]:text-black">未完了</SelectItem>
            <SelectItem value="完了" className="cursor-pointer data-[highlighted]:bg-gray-100 data-[highlighted]:text-black">完了</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
      </div>

      {/* ボタン */}
      <Button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-3 font-semibold"
      >
        タスク作成
      </Button>
    </form>
  )
}



