export type Post = {
  id: number
  title: string
  details: string | null
  deadline: Date | null
  status: string
  completed_at: Date | null
}

export type PostTableProps = {post: Post}