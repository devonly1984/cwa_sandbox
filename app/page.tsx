import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import Image from "next/image"

const Page = async () => {
  await auth.protect({unauthenticatedUrl: "/sign-in"})

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6">
      <Empty className="flex-none">
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
      <UserButton />
      <OrganizationSwitcher />
    </div>
  )
}
export default Page