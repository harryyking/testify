"use client"
import { useForm } from 'react-hook-form'

const ComponentForm = ({testimonyId}) => {
    const{
        register,
        handleSubmit,
        formState: {errors},
        reset,
    }= useForm();

    

    const onSubmit = async(data) => {
        try {

           

            const response = await fetch("/api/comment/",
                {
                    method: "POST",
                    headers: {
                        "Content-type" : "application/json",
                    },
                    body: JSON.stringify({
                        ...data,
                        testimonyId,
                    }),
                })

            if(response.ok){
                reset();
            }

            
        } catch (error) {
            console.error("Failed to submit", error)
        }
        
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

        <input 
        type="hidden" 
        value={testimonyId}
        {...register("testimonyId")}
        />

        <div>
            <label htmlFor="text" className='label label-text'> Your comment</label>
            <textarea 
            {...register("text", {required: true
            })}
            className='textarea textarea-bordered w-full'
            ></textarea>
            {errors.comment && <p className='text-secondary text-xs'>Oops! you didn't put in the comment</p>}
        </div>

            <div>
                <label htmlFor="username"  className='label label-text'>Your username</label>
                <input 
                {...register("username", {required: true})}
                type="text" 
                className='input input-bordered w-full' />
                 {errors.username && <p className='text-secondary text-xs'>Oops! you didn't put your username</p>}
            </div>
 
        
        <button className='btn btn-primary' type='submit'>Add Comment</button>
    </form>
  )
}

export default ComponentForm