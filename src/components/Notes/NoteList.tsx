import { deleteNotes } from "@/api/notesApi"
import { capitalizeLetter, notifyError, notifySuccess } from "@/utils/index"
import { TrashIcon } from "@heroicons/react/20/solid"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type NoteListProps = {
  note: {
    content: string,
    _id: string
  },
  itemId: string,
  model: string
}

export default function NoteList({note, itemId, model} : NoteListProps) {
  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: deleteNotes,
    onError: notifyError,
    onSuccess: (data) => {
      notifySuccess(data)
      queryClient.invalidateQueries({queryKey: [model, itemId]})
    }
  })


  return (
    <li className="flex justify-between items-center">
      <p className="text-sm text-slate-700 font-medium break-words max-w-[90%]">{capitalizeLetter( note.content )}</p>
      <TrashIcon 
        className="size-6 text-red-400 hover:text-red-500 cursor-pointer"
        onClick={() => {
          const data = {model, itemId, noteId: note._id}
          mutate(data)
        }}
      />
    </li>
  )
}
