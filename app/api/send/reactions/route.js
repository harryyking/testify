import { connectToDB } from "@/utils/database";
import Testimony from "@/models/testimony";

export async function POST(req) {
  try {
    const { testimonyId, reactionType } = await req.json();

    await connectToDB();

    // Find the testimony by ID
    const testimony = await Testimony.findById(testimonyId);

    if (!testimony) {
      return new Response("Testimony not found", { status: 404 });
    }

    if (!testimony.reactions){
      testimony.reactions ={ wow : 0};
    }
    // Update the reaction count based on the reaction type
    // if (reactionType === "like") {
    //   testimony.reactions.like += 1;
    // }
    if (reactionType === "wow") {
      testimony.reactions.wow += 1;
    }

    // Save the updated testimony
    await testimony.save();

    return new Response(JSON.stringify(testimony), { status: 200 });
  } catch (error) {
    console.error("Error updating reactions:", error);
    return new Response("Failed to update reactions", { status: 500 });
  }
}
