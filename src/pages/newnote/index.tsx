import { useState } from "react"
import { type NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { api } from "../../utils/api.ts"

interface FormData {
  title: string
  description: string
}

const Newnote: NextPage = () => {
  const utils = api.useContext()
  const addNewNote = api.mynotes.newNote.useMutation({
    onMutate: () => {
      utils.mynotes.allNotes.cancel()
      
      const optimisticUpdate = utils.mynotes.allNotes.getData()

      if (optimisticUpdate) {
        utils.mynotes.allNotes.setData(optimisticUpdate)
      }
    },
    onSettled: () => {
      utils.mynotes.allNotes.invalidate()
    }
  })
  
  const [data, setData] = useState<FormData>({
    title: "",
    description: ""
  })

  const handleTitleChange = (e) => {
    setData({
      ...data,
      title: e.target.value
    })

    console.log(data.title)
  }

  const handleDescriptionChange = (e) => {
    setData({
      ...data,
      description: e.target.value
    })

    console.log(data.description)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    addNewNote.mutate({
      title: data.title,
      description: data.description
    })

    setData({
      title: "",
      description: ""
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
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-6"
        >
          <input 
            type="text" 
            value={data.title}
            onChange={(e) => handleTitleChange(e)}
            placeholder="Your title"
            required
            className="bg-slate-300 text-slate-900 p-4 rounded-lg border-none outline-none"
          />
          <textarea 
            type="textarea" 
            value={data.description}
            onChange={(e) => handleDescriptionChange(e)}
            placeholder="Your description" 
            required
            className="bg-slate-300 text-slate-900 p-4 rounded-lg border-none outline-none"
          >
          </textarea>
          <button type="submit" className="text-white rounded-lg p-4 font-semibold bg-green-700">
            Add a note
          </button>
        </form>
      </main>
    </>
  )
}

export default Newnote
