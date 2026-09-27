import { AppSidebar } from "@/components/layout/AppSidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { listGames } from "@/lib/games/queries"
import { ReactNode } from "react"

const AppLayout = async ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  const games = await listGames()

  return (
    <SidebarProvider>
      <AppSidebar games={games} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}

export default AppLayout