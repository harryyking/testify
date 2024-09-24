import Link from 'next/link'
import Form from '@/components/Form'
import { ChevronLeft } from 'lucide-react'

const FormPage = () => {
  return (
    <section className='space-y-6' >
        <div className='space-y-2'>
        <Link href="/" className='btn btn-ghost'>
            <button 
            className='flex flex-row items-center'
            > 
          <ChevronLeft/>

          Back
          </button>
        </Link>
      
        <h1 className='text-3xl font-bold'>Share Your Experience</h1>
        </div>
        
        <Form/>
    </section>
  )
}

export default FormPage