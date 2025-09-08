// src/app/page.tsx

import { prisma } from "@/lib/prisma"

export default async function Home() {
  const posts = await prisma.post.findMany()
  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}
