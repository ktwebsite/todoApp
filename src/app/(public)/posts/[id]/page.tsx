import { getPost } from "@/lib/post";

export default async function detailPage({ params }: { params: { id: string } }) {
  // id を number に変換して DB 取得
  const post = await getPost(params.id);

  if (!post) {
    return <div className="p-6">タスクが見つかりません。</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-2xl space-y-6">
      <h1 className="text-2xl font-bold">{post.title}</h1>

      <div>
        <p className="text-gray-600 whitespace-pre-line">{post.details || "詳細なし"}</p>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p><strong>期限:</strong> {post.deadline ? new Date(post.deadline).toLocaleDateString() : "未設定"}</p>
        <p><strong>ステータス:</strong> {post.status}</p>
        {post.completed_at && (
          <p><strong>完了日時:</strong> {new Date(post.completed_at).toLocaleString()}</p>
        )}
      </div>
    </div>
  );
}
