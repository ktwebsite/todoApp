import Link from "next/link"
import { Button } from "@/components/ui/button"

type Props = {
  href: string
  children: React.ReactNode
  className?: string
}

export function LinkAsButton({ href, children, className }: Props) {
  return (
    <Button  asChild className={className}>
      <Link href={href}>{children}</Link>
    </Button>
  )
}
