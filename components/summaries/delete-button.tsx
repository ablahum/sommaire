'use client'

import { deleteSummary } from '@/actions/summary-actions'
import { Trash2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

interface DeleteButtonProps {
  summaryId: string
}

export default function DeleteButton({ summaryId }: DeleteButtonProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteSummary({ summaryId })

      if (result?.success) {
        toast.custom(() => (
          <div className='text-gray-600 bg-linear-to-tl from-cyan-600/50 to-white p-4 rounded-xl flex flex-col gap-2'>
            <div className='font-semibold'>✅ Summary deleted successfully</div>
            <div className='text-sm'>{result.message}</div>
          </div>
        ))
      } else {
        toast.custom(() => (
          <div className='text-gray-600 bg-linear-to-tl from-cyan-600/50 to-white p-4 rounded-xl flex flex-col gap-2'>
            <div className='font-semibold'>Error</div>
            <div className='text-sm'>
              {result?.message || '❌ Failed to delete summary'}
            </div>
          </div>
        ))
      }

      setOpen(false)
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='text-cyan-600 bg-white hover:text-white hover:bg-rose-500 hover:outline-rose-200'
        >
          <Trash2 />
        </Button>
      </DialogTrigger>

      <DialogContent className='[&>button]:hidden'>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete this Summary? This action will also
            delete the original PDF file and cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant='ghost'
            className='px-2 bg-gray-50 border border-gray-200 hover:bg-gray-100'
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant='destructive'
            className='bg-cyan-600 hover:scale-105 transition-all duration-300 hover:outline-rose-200 hover:bg-rose-500'
            onClick={handleDelete}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
