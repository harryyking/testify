import React from 'react'

const Comment = ({comment}) => {
  return (
    <div className='p-4 w-full min-h-5 space-y-4'>
        <p>{comment.text}</p>
        <small className="text-gray-500">Posted by {comment.username} on {new Date(comment.createdAt).toLocaleDateString()}</small>
    </div>
  )
}

export default Comment