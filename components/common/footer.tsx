import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <p className='text-center text-gray-600 text-sm'>
          Made by{' '}
          <Link
            href='https://github.com/ablahum'
            className='font-semibold text-cyan-600 cursor-pointer'
          >
            ablahum
          </Link>{' '}
          in 2025
        </p>
      </div>
    </footer>
  )
}
