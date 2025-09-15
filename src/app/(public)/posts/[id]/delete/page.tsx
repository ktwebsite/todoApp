"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DeletePostPage() {
  const router = useRouter();
  const params = useParams();

  const handleDelete = async () => {
    const res = await fetch(`/api/posts/${params.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/"); // 一覧ページへ
      router.refresh(); // キャッシュ更新
    } else {
      alert("削除に失敗しました");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-2xl space-y-6">
      <h1 className="text-2xl font-bold text-center text-red-600">タスク削除</h1>
      <p className="text-center text-gray-700">本当に削除してよいですか？</p>

      <div className="flex justify-between">
        <Button
          onClick={() => router.back()}
          className="bg-gray-400 hover:bg-gray-500 text-white rounded-lg px-6 py-2"
        >
          キャンセル
        </Button>

        <Button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-6 py-2"
        >
          削除する
        </Button>
      </div>
    </div>
  );
}