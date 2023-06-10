import { useState } from "react"
import Head from "next/head"
import Link from "next/link"

interface FormData {
  title: string
  description: string
}

const Newnote: NextPage = () => {
  const [data, setData] = useState<FormData>({
    title: "",
    description: ""
  })

  const handleTitleChange = (e) => {
    setData({
      ...data,
      title: e.target.value
    })
  }

  const handleDescriptionChange = (e) => {
    setData({
      ...data,
      description: e.target.value
    })
  }

  return (
    <>
      <Head>
        <title>New Note</title>
        <meta name="description" content="create new note here" />
      </Head>
      <main className="mx-auto flex min-h-screen flex-col justify-center py-10 md:container">
        <Link
          className="indigo-700 inline-block py-4 text-base font-semibold leading-7 text-green-700"
          href="/"
        >
          Go Back
        </Link>
        <h1 className="mb-6 text-left text-3xl font-bold tracking-tight text-gray-900">
          Add New Notes
        </h1>
        <form 
          onSubmit={(event) => {

          }}
          className="flex flex-col gap-6"
        >
          <input 
            type="text" 
            value={data.title}
            onChange={handleTitleChange}
            placeholder="Your title"
            required
            className="bg-slate-300 text-slate-900 p-4 rounded-lg border-none outline-none"
          />
          <textarea 
            type="textarea" 
            value={data.description}
            onChange={handleDescriptionChange}
            placeholder="Your description" 
            required
            className="bg-slate-300 text-slate-900 p-4 rounded-lg border-none outline-none"
          >
          </textarea>
          <button className="text-white rounded-lg p-4 font-semibold bg-green-700">
            Add a note
          </button>
        </form>
      </main>
    </>
  )
}

export default Newnote
