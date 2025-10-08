import { prisma } from '@/lib/prisma';

export async function getPosts(status?: string | "incomplete",sort?: string){
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
  const posts = await prisma.post.findMany({
        where,
        orderBy,
        select: {
          id: true,
          title: true,
          details: true,
          deadline: true,
          status: true,
          completed_at: true,
        },
      });
  return posts;
}

export async function getPost(id: string){
  return await prisma.post.findUnique({
  where: { id: Number(id) }
  })
}