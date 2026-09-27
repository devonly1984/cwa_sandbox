"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Empty, EmptyDescription } from "@/components/ui/empty"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Coins, MessageSquareIcon, SquarePen } from "lucide-react"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import type { ComponentProps } from "react"
import type { GameListItem } from "@/lib/games/queries"

type AppSidebarProps = ComponentProps<typeof Sidebar> & {
  games: GameListItem[]
}

const AppSidebar = ({ games, ...props }: AppSidebarProps) => {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex-row items-center justify-between group-data-[collapsible=icon]:justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 group-data-[collapsible=icon]:hidden"
        >
          <Image
            src="/logo.svg"
            alt=""
            width={20}
            height={20}
            className="size-5"
          />
          <span className="font-logo text-base">Sandbox</span>
        </Link>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/" />}
                  isActive={pathname === "/"}
                >
                  <SquarePen />
                  <span>New game</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Recents</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="hidden group-data-[collapsible=icon]:block">
              <Popover>
                <PopoverTrigger render={<SidebarMenuButton tooltip="Recents" />}>
                  <MessageSquareIcon />
                  <span>Recents</span>
                </PopoverTrigger>
                <PopoverContent
                  side="right"
                  align="start"
                  className="w-56 p-1"
                >
                  {games.length > 0 ? (
                    <SidebarMenu>
                      {games.map((game) => (
                        <SidebarMenuItem key={game.id}>
                          <SidebarMenuButton
                            render={<Link href={`/games/${game.id}`} />}
                            isActive={pathname === `/games/${game.id}`}
                          >
                            <MessageSquareIcon />
                            <span>{game.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  ) : (
                    <p className="px-2 py-1 text-sm text-muted-foreground">
                      Your games will live here.
                    </p>
                  )}
                </PopoverContent>
              </Popover>
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              {games.length > 0 ? (
                <SidebarMenu>
                  {games.map((game) => (
                    <SidebarMenuItem key={game.id}>
                      <SidebarMenuButton
                        render={<Link href={`/games/${game.id}`} />}
                        isActive={pathname === `/games/${game.id}`}
                        tooltip={game.title}
                      >
                        <MessageSquareIcon />
                        <span>{game.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              ) : (
                <Empty className="border p-2">
                  <EmptyDescription className="text-xs">
                    Your games will live here.
                  </EmptyDescription>
                </Empty>
              )}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Coins />
              <span>Credits</span>
            </SidebarMenuButton>
            <SidebarMenuBadge>1,250</SidebarMenuBadge>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center justify-between gap-2 px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <OrganizationSwitcher
              appearance={{
                elements: {
                  rootBox: "w-full! max-w-full",
                  organizationSwitcherTrigger:
                    "w-full! max-w-full justify-between!",
                  organizationPreview: "min-w-0",
                  organizationPreviewTextContainer: "min-w-0",
                  organizationPreviewMainIdentifier: "truncate",
                },
              }}
            />
          </div>
          <UserButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export { AppSidebar }