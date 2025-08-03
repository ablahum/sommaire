'use client'
import { Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { useState, useTransition } from 'react'
import { deleteSummaryAction } from '@/actions/summary-actions'
import { toast } from 'sonner'

interface DeleteButtonProps {
  summaryId: string
}

export default function DeleteButton({ summaryId }: DeleteButtonProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteSummaryAction({ summaryId })

      if (result?.success) toast.success('Summary deleted successfully')
      else
        toast.error('Error', {
          description: 'Failed to delete summary'
        })

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
          variant={'ghost'}
          size='icon'
          className='text-rose-500 bg-white outline outline-rose-500 outline-solid hover:text-white hover:bg-rose-500'
        >
          <Trash2 className='w-4 h-4' />
        </Button>
      </DialogTrigger>

      <DialogContent className='[&>button]:hidden'>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>

          <DialogDescription>Are you sure you want to delete this Summary? This action cannot be undone.</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant='ghost'
            className='px-2 bg-gray-50 border border-gray-200
            hover:text-gray-600 hover:bg-gray-100'
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant='destructive'
            className='bg-rose-500 hover:scale-105 transition-all duration-300 hover:no-underline'
            onClick={handleDelete}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
