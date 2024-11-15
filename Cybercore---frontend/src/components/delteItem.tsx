import { api } from '../service/http'
import { Trash2 } from 'lucide-react'
import type { DeleteItemType } from '../@types/types'

export function DeleteItem ({ id }: DeleteItemType) {
  function handleDelete ({ id }: DeleteItemType) {
    api.delete(`/products/delete/${id}`)
  }

  return (
   <div>
    <button type='button' onClick={() => handleDelete({id})}>
     <Trash2 />
    </button>
   </div>
  )
}
