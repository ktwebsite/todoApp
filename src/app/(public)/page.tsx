// src/app/page.tsx
import { LinkAsButton } from "@/components/Button"
import FilterButton from "@/components/FilterButton";
import PostTable from "@/components/PostTable"
import SortButton from "@/components/SortButton";
import { getPosts } from "@/lib/post"

export default async function RootPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}){
  const params = await searchParams;
  const filterStatus = (params.filterStatus as string | undefined) ?? "all"
  const sortParams = (params.sortParams as string | undefined) ?? "asc"
  const page = Number(params.page ?? 1)
  const { posts, totalPages }= await getPosts(filterStatus,sortParams,page)
  
  return (
    <div >
      <div className="flex ml-8 mt-8 justify-between">
        <h1 className="text-3xl font-bold">タスク一覧</h1>
        <div className="flex">
          <div><FilterButton currentStatus={filterStatus} currentSort={sortParams}/></div>
          <div><SortButton currentSort={sortParams} currentStatus={filterStatus}/></div>
        </div>
      </div>
      <div>
        <PostTable posts={posts} /> 
      </div>
      <div className="flex justify-center items-center gap-4 mt-6">
        {page > 1 && (
          <a
            href={`/?page=${page - 1}&filterStatus=${filterStatus}&sortParams=${sortParams}`}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← 前へ
          </a>
        )}
        <span>ページ {page} / {totalPages}</span>
        {page < totalPages && (
          <a
            href={`/?page=${page + 1}&filterStatus=${filterStatus}&sortParams=${sortParams}`}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            次へ →
          </a>
        )}
      </div>

      <div className="fixed left-5 bottom-5">
        <LinkAsButton href={`/posts/news`} className="bg-orange-500 hover:bg-red-600 text-white rounded-xl px-6 py-3 text-lg shadow-lg">
          新規タスク作成
        </LinkAsButton>
      </div>
    </div>
  )
}
