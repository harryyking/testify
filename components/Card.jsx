"use client"
import Link from "next/link";
import { useState } from "react";

const Card = ({testimony}) => {
  // const [likeCount, setLikeCount] = useState(testimony ? testimony.reactions.like : 0);
  const [wowCount, setWowCount] = useState(testimony?.reactions?.wow || 0);
 
  const formatDAysAgo = (createdAt) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);

    const diffInTime = currentDate - createdDate;

    const diffInDays = Math.floor(diffInTime / (1000 * 60* 60* 24));

    return diffInDays;
  }

  const handleAddReaction = async(reactionType) => {

    try {
      
      // if(reactionType === "like"){
      //   setLikeCount(likeCount + 1)
      // }
     if (reactionType === "wow"){
        setWowCount(wowCount + 1);
      }

      const response = await fetch(`/api/send/reactions`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          testimonyId: testimony._id,
          reactionType,
        })
      });

      if(!response.ok){
        throw new Error("Failed to add reaction");
      }

    } catch (error) {
      console.error("Error adding reaction: ", error);
    }


  }


  return (
    <section className='w-full  bg-white shadow-md rounded-md'>
    <div className="card  flex flex-row min-h-36 ">
    <div className="card-body">
        { testimony ? (
            <h1>{testimony.tests}</h1>
          ): 
          (
            <h1>Testimony...</h1>
          )
              
        }
      
    </div>
    <ul className='flex flex-col justify-center items-center px-6 space-y-2'>
        {/* <li className="btn btn-ghost" onClick={() => handleAddReaction("like")}>🤩</li>
        <li>{likeCount}</li> */}
        <li>{wowCount}</li>
        <li className="btn btn-ghost" onClick={() => handleAddReaction("wow")}>🥺</li>
        
    </ul>
  </div>
  <ul className=' flex flex-row ml-6 text-xs p-2 space-x-2'>
  <li>{testimony ? `${formatDAysAgo(testimony.createdAt)} days ago`: ("days")}</li>
    <li>{testimony ? (testimony.username): ("username")}</li>
    <Link href={`/testimony/${testimony._id}`}><li className='hover:underline'>comments</li></Link>
  </ul>
</section>
  )
}


export default Card