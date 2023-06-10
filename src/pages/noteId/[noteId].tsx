import { useRouter } from "next/router"
import Link from "next/link"
import { api } from "../../utils/api.ts"

export default function NoteDetail() {
  const router = useRouter()
  const notesId = router.query.noteId as string
  const { data: messageDetail, isLoading } = api.mynotes?.detailNode.useQuery({
    id: notesId
  })

  if (isLoading) return <>Loading...</>

  return (
    <main className="mx-auto flex min-h-screen flex-col py-10 sm:container">
      <Link
        className="indigo-700 inline-block py-4 text-base font-semibold lading-7 text-green-700"
        href="/"
      >
        Go back
      </Link>
      <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-left sm:text-3xl">Note Detail</h1>
      <div className="mb-5">{messageDetail?.id}</div>
      <h5 className="mb-5">{messageDetail?.title}</h5>
      <p className="mb-5">{messageDetail?.description}</p>
    </main>
  )
}
