import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import Image from "next/image"

const Page=()=> {
  return (
    <div className="flex min-h-svh">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <Image src="/logo.svg" alt="logo" width={48} height={48} />
          </EmptyMedia>
        </EmptyHeader>

        <EmptyTitle className="text-2xl">
          What should we build today?
        </EmptyTitle>

        <EmptyDescription>
          Build your own racers, shooters, puzzles and whole worlds using your
          own words. If you can describe it, you can play it.
        </EmptyDescription>
      </Empty>
    </div>
  )
}
export default Page