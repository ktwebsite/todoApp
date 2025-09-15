import EditPostForm from "@/components/edit/EditPostForm";
import { prisma } from "@/lib/prisma";

export default async function EditPage({ params }: { params: { id: string } }) {
  // Prismaで直接DBから取得
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
  });

  if (!post) {
    throw new Error("指定された投稿が存在しません");
  }
  

  return <EditPostForm defaultValues={post} />;
}


