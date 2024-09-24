import { connectToDB } from "@/utils/database"
import Testimony from "@/models/testimony"  // Assuming your model is named "testimony"

export const GET = async (request) => {
  const url = new URL(request.url);  // Parse the request URL
  const type = url.searchParams.get("type");  // Get the 'type' query parameter

  try {
    await connectToDB();  // Ensure the database is connected

    let testimonies;
    
    // Fetch testimonies based on the "type"
    switch (type) {
      case "new":
        // Get the latest testimonies (sorted by creation date)
        testimonies = await Testimony.find({})
          .sort({ createdAt: -1 })  // Sort by createdAt (newest first)
          .limit(10);  // You can adjust the limit as necessary
        break;

      case "hot":
        // Get the hot testimonies (those with most reactions in the last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);  // Calculate the date 7 days ago
        
        testimonies = await Testimony.find({
          "reactions.timestamp": { $gte: sevenDaysAgo }  // Filter by recent reactions
        })
        .sort({ "reactions.length": -1 })  // Sort by the number of reactions
        .limit(10);  // Adjust limit as needed
        break;

      case "top":
        // Get the top testimonies (those with the highest number of reactions)
        testimonies = await Testimony.aggregate([
          {
            $addFields: { reactionsCount: { $size: "$reactions" } }  // Add field to count reactions
          },
          {
            $sort: { reactionsCount: -1 }  // Sort by the number of reactions (highest first)
          },
          {
            $limit: 10  // Adjust limit as needed
          }
        ]);
        break;

      default:
        // If no type is specified, return all testimonies (optional)
        testimonies = await Testimony.find({})
          .sort({ createdAt: -1 })  // Default to sorting by creation date
          .limit(10);
        break;
    }

    // Return the fetched testimonies
    return new Response(JSON.stringify(testimonies), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Failed to fetch testimonies: ", error);
    return new Response("Failed to fetch testimonies", { status: 500 });
  }
};
