
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PostTableProps } from "@/types/post";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/lib/validation/postShema";

export default function EditPostForm({ defaultValues }: { defaultValues: PostTableProps }) {
  const router = useRouter();

  // deadlineを YYYY-MM-DD 形式に変換
  const formattedDeadline = defaultValues.deadline
    ? new Date(defaultValues.deadline).toISOString().split("T")[0]
    : "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PostTableProps>({
    resolver: zodResolver(postSchema),
    mode: "onChange", 
    defaultValues: {
      ...defaultValues,
      deadline: formattedDeadline,
    },
  });

  const onSubmit = async (data: PostTableProps) => {
    console.log("送信データ:", data); // ← 確認用
    await fetch(`/api/posts/${defaultValues.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.push("/"); // 更新後に一覧へ戻る
    router.refresh(); // キャッシュ更新
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-2xl space-y-6"
    >
      <h1 className="text-2xl font-bold text-center">タスク編集</h1>

      {/* タイトル */}
      <div className="space-y-2">
        <Label htmlFor="title">タイトル</Label>
        <Input
          id="title"
          placeholder="タスク名を入力"
          {...register("title", { required: "タイトルは必須です" })}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      {/* 詳細 */}
      <div className="space-y-2">
        <Label htmlFor="details">詳細</Label>
        <Input
          id="details"
          placeholder="詳細を入力"
          {...register("details", { required: "詳細は必須です" })}
        />
        {errors.details && <p className="text-red-500 text-sm">{errors.details.message}</p>}
      </div>

      {/* 期限 */}
      <div className="space-y-2">
        <Label htmlFor="deadline">期限</Label>
        <Input
          type="date"
          id="deadline"
          {...register("deadline", { required: "期限は必須です" })}
        />
        {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline.message}</p>}
      </div>

      {/* ステータス */}
      <div className="space-y-2">
        <Label htmlFor="status">ステータス</Label>
        <Select
          defaultValue={defaultValues.status} // ← 初期値反映
          onValueChange={(val) => setValue("status", val as "未完了" | "完了", { shouldValidate: true })}
        >
          <SelectTrigger className="bg-white border rounded-md">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg">
            <SelectItem value="未完了">未完了</SelectItem>
            <SelectItem value="完了">完了</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
      </div>

      {/* ボタン */}
      <Button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-3 font-semibold"
      >
        更新する
      </Button>
    </form>
  );
}
