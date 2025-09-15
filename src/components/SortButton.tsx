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

export default function SortButton({
  currentSort,currentStatus
}: {
  currentSort: string
  currentStatus: string
}) {
  const router = useRouter()
  const handleSortDeadline = (value: string) => {
    router.push(`/?sortParams=${value}&filterStatus=${currentStatus}`) // クエリを更新
  }

  return (
    <div className="space-y-2 w-40">
      <Label>並び替え</Label>
      <Select value={currentSort} onValueChange={handleSortDeadline}>
        <SelectTrigger className="bg-white border rounded-md">
          <SelectValue placeholder="選択してください" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-lg">
          <SelectItem value="asc" className="cursor-pointer data-[highlighted]:bg-gray-100 data-[highlighted]:text-black">期限が早い順</SelectItem>
          <SelectItem value="desc" className="cursor-pointer data-[highlighted]:bg-gray-100 data-[highlighted]:text-black">期限が遅い順</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
