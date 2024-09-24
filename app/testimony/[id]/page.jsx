"use client"
import ComponentForm from '@/components/ComponentForm'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Card from '@/components/Card'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'


const CommentPage = () => {
    const {id} = useParams();

    const [testimony, setTestimony] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    
    useEffect(() => {
        if (id) {
            const fetchTestimonyData = async() => {
                try {
                    const res = await fetch(`/api/display/${id}`)
                    const data = await res.json();
                    setTestimony(data.testimony)
                    setComments(data.comments);
                }catch(error){
                    console.error("Error fetching testimony data: ", error)

                }
            }
            fetchTestimonyData();
        }
        
    },[id])


    
    return (
    <section className='space-y-6' >
        <div className='space-y-2'>
        <Link href="/" className='btn btn-ghost'>
            <button 
            className='flex flex-row items-center'
            >
              <ChevronLeft/>
              Back</button>
        </Link>

        {testimony && <Card testimony={testimony}/>}
        </div>

        
        <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="mb-4">
              <p>{comment.text}</p>
              <small className="text-gray-500">Posted by {comment.username} on {new Date(comment.createdAt).toLocaleDateString()}</small>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
        
        <ComponentForm/>
    </section>
  )
}

export default CommentPage