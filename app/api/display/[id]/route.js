import { connectToDB } from "@/utils/database";
import Testimony from "@/models/testimony";
import Comment from "@/models/comment";

export async function GET(req, { params }) {
  try {
    await connectToDB();
    const testimony = await Testimony.findById(params.id).lean();
    const comments = await Comment.find({}).lean();

    return new Response(JSON.stringify({ testimony, comments }), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch testimony", { status: 500 });
  }
}
