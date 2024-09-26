"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"

const Form = () => {
    const{
        register,
        handleSubmit,
        formState: {errors},
        reset
    }= useForm()

    const onSubmit = async(data) => {

        try {
            const response = await fetch("/api/send/", 
                {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok){
                    reset();
                }

        } catch (error) {
            console.error("Failed to Submit", error)
        }

        

    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div>
            <label htmlFor="tests" className='label label-text'>Your experience *</label>
            <textarea  
            {...register("tests", {required: true})}
            className='textarea textarea-bordered w-full'></textarea> 
            {errors.tests && <p className="text-secondary text-xs">Oops! Try sharing again please</p>}          
        </div>
        <div>
            <label htmlFor="username" className='label label-text'>Your username * <span>No account needed</span></label>
            <input 
            {...register("username", {required: true})}
            type="text"  
            className='input input-bordered w-full'/>
             {errors.username && <p className="text-secondary text-xs">Oops! We want to know you</p>}
        </div>
        <div>
            <label htmlFor="instagram" className='label label-text'>Show off your instagram handle?</label>
            <input 
            {...register("instagram", {required: false})}
            type="text" 
            className='input input-bordered w-full' placeholder="@"/>
        </div>
        <button className='btn btn-primary w-full' type="submit" >Send</button>
    </form>
  )
}

export default Form