import { auth } from "@clerk/nextjs/server"

const GamePage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
    await auth.protect({ unauthenticatedUrl: "/sign-in" })
  const { id } = await params

  return <p>{id}</p>
}

export default GamePage