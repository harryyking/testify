import { Schema, model, models } from "mongoose";

// Schema for Testimony with roles as buyer and seller

const TestimonySchema = new Schema({
    tests: {
        type: String,
        required: true, // Testimony content is required
    },
    username: {
        type: String,
        required: true, // Username is required
    },
    instagram: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the createdAt date
    },
    reactions: {
        wow: { type: Number, default: 0 },   // For 🥺
        
      },
});


const Testimony = models.Testimony || model("Testimony", TestimonySchema);
export default Testimony;
