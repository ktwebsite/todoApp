import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ja } from "date-fns/locale"
import { formatDistanceToNow } from "date-fns"
import { LinkAsButton } from "./Button"
import { Post } from "@/types/post" // 型は適宜修正
type PostTableProps = {
  posts: Post[] // ← 複数を受け取る
}

export default function PostTable({ posts }: PostTableProps) {

  return (
    <div>
      <Table className="mx-6">
        {/* ヘッダーは一度だけ */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">タイトル</TableHead>
            <TableHead className="w-[300px]">詳細</TableHead>
            <TableHead className="w-[200px]">期限</TableHead>
            <TableHead className="w-[200px]">ステータス</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>

        {/* 複数のポストを map で描画 */}
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{post.details}</TableCell>
              <TableCell>
                {post.deadline && (
                  <time>
                    {formatDistanceToNow(new Date(post.deadline), {
                      addSuffix: true,
                      locale: ja,
                    })}
                  </time>
                )}
              </TableCell>
              <TableCell>
                {post.status === "完了"
                  ? `完了 (${post.completed_at ? new Date(post.completed_at).toLocaleString() : "日時不明"})`
                  : "未完了"}
              </TableCell>
              <TableCell className="flex gap-2">
                <LinkAsButton
                  href={`/posts/${post.id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
                >
                  詳細
                </LinkAsButton>
                <LinkAsButton
                  href={`/posts/${post.id}/edit`}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-xl"
                >
                  編集
                </LinkAsButton>
                <LinkAsButton
                  href={`/posts/${post.id}/delete`}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
                >
                  削除
                </LinkAsButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
