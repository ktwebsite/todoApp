// src/app/page.tsx
import { LinkAsButton } from "@/components/Button"
import FilterButton from "@/components/FilterButton";
import PostTable from "@/components/PostTable"
import SortButton from "@/components/SortButton";
import { getPosts } from "@/lib/post"

export default async function RootPage({
  searchParams,
}: {
  searchParams: {
    filterStatus?: "all" | "completed" | "incomplete"
    sortParams?: "asc" | "desc"
  }
}) {
  const filterStatus = searchParams?.filterStatus ?? "all"
  const sortParams = searchParams?.sortParams ?? "asc"  
  const posts = await getPosts(filterStatus,sortParams)
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
      <div className="fixed left-5 bottom-5">
        <LinkAsButton href={`/posts/news`} className="bg-orange-500 hover:bg-red-600 text-white rounded-xl px-6 py-3 text-lg shadow-lg">
          新規タスク作成
        </LinkAsButton>
      </div>
    </div>
  )
}
