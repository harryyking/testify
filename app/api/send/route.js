import { connectToDB } from "@/utils/database";
import Testimony from "@/models/testimony";

export const POST = async (request) => {
  try {
    const { tests, username, instagram } = await request.json();

    // Validate required fields
    if (!tests || !username || !instagram) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Connect to the database
    await connectToDB();

    // Create a new testimony with default reactions
    const newTestimony = new Testimony({
      tests,
      username,
      instagram,
      reactions: {
        wow: 0,   // Initially no sad reactions
      }
    });

    // Save the testimony to the database
    await newTestimony.save();

    // Return a success response
    return new Response(JSON.stringify(newTestimony), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error while sending testimony", error);
    return new Response("Failed to send testimony", { status: 500 });
  }
};
