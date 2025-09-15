import { prisma } from '@/lib/prisma';

export async function getPosts(status?: "all" | "completed" | "incomplete",sort?: "asc" | "desc") {
  let where = {}

  if (status === "completed") {
    where = { status: "完了" }
  } else if (status === "incomplete") {
    where = { status: "未完了" }
  }

  let orderBy = {}

  if(sort === "asc"){
    orderBy = {deadline: "asc"}
  }else if(sort === "desc"){
    orderBy = {deadline: "desc"}
  }
  return prisma.post.findMany({
    where,
    orderBy,
  })
}

export async function getPost(id: string){
  return await prisma.post.findUnique({
  where: { id: Number(id) }
  })
}