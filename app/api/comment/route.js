import { connectToDB } from "@/utils/database";
import Comment from "@/models/comment";
import Testimony from "@/models/testimony";


export async function POST(req) {
  try {

    const { text, username, testimonyId} = await req.json();

    if(!text || !username || !testimonyId){
      return new Response("Failed to validate comment", {status: 400})
    }

    await connectToDB();

    const testimony = await Testimony.findById(testimonyId)

    if(!testimony){
      return new Response("Testimony Id not found", {status: 404})
    }


    const newComment = new Comment({
      testimonyId : testimony._id,
      text,
      username: username || "Anonymous", // Default to "Anonymous" if no username
    });

    await newComment.save();

    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    console.error("Failed to comment: ", error)
    return new Response("Failed to post comment", { status: 500 });
  }
}
