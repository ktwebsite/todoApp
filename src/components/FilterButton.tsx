"use client"

import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FilterButton({
  currentStatus,currentSort
}: {
  currentStatus: "all" | "completed" | "incomplete"
  currentSort:  "asc" | "desc"
}) {
  const router = useRouter()
  const handleChange = (value: string) => {
    router.push(`/?filterStatus=${value}&sortParams=${currentSort}`) // クエリを更新
  }

  return (
    <div className="space-y-2 w-40">
      <Label>絞り込み</Label>
      <Select value={currentStatus} onValueChange={handleChange}>
        <SelectTrigger className="bg-white border rounded-md">
          <SelectValue placeholder="選択してください" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-lg">
          <SelectItem value="all" className="cursor-pointer data-[highlighted]:bg-gray-100 data-[highlighted]:text-black">全表示</SelectItem>
          <SelectItem value="completed" className="cursor-pointer data-[highlighted]:bg-gray-100 data-[highlighted]:text-black">完了のみ</SelectItem>
          <SelectItem value="incomplete" className="cursor-pointer data-[highlighted]:bg-gray-100 data-[highlighted]:text-black">未完了のみ</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
