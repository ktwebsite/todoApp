export type Post = {
  id: string
  title: string
  details: string
  deadline: Date
  status: string
  completed_at: Date
}

export type PostTableProps = {post: Post}