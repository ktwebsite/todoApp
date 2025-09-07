import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

async function main(){
  await prisma.post.deleteMany()

  const post = await prisma.post.create({
      data: {
        id: 1,
        title: "サンプルタイトル",
        details: "サンプル詳細",
        deadline: "2025-09-05T20:00:00Z",
        status: "完了",
        completed_at: "2025-09-05T20:00:00Z"
      }
  })
  console.log({post})
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())