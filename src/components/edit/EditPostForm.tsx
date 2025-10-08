
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/lib/validation/postShema";
import { Post} from "@/types/post";
import z from "zod";

type PostFormValues = z.infer<typeof postSchema>;

export default function EditPostForm({ defaultValues }: { defaultValues: Post }) {
  const router = useRouter();

  const formDefaultValues: PostFormValues = {
    title: defaultValues.title,
    details: defaultValues.details ?? "",
    deadline: defaultValues.deadline
      ? new Date(defaultValues.deadline).toISOString().split("T")[0]
      : "",
    status: defaultValues.status as "未完了" | "完了", // ← 型を絞る
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    mode: "onChange", 
    defaultValues: formDefaultValues, 
  });

  const onSubmit = async (data: PostFormValues) => {
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
      <button
      onClick={() => window.history.back()}
      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
    >
      ← 戻る
    </button>
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
