import { connectToDB } from "@/utils/database";
import Comment from "@/models/comment";


export async function POST(req) {
  try {

    const { text, username} = await req.json();

    if(!text || !username){
      return new Response("Failed to validate comment", {status: 400})
    }

    await connectToDB();



    const newComment = new Comment({
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
