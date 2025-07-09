import mongoose from "mongoose"

const ThreadSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    secondaryColor: {
      type: String,
    },
    pattern: {
      type: String,
      required: true,
      enum: ["smooth", "wavy", "jagged", "dotted", "thick", "gradient", "mandala", "rangoli", "lotus", "chakra", "om"],
    },
    intensity: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    note: {
      type: String,
      maxlength: 500,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: String,
      default: "anonymous", // For now, we'll use anonymous users
    },
  },
  {
    timestamps: true,
  },
)

// Create index for efficient querying
ThreadSchema.index({ userId: 1, date: -1 })

export default mongoose.models.Thread || mongoose.model("Thread", ThreadSchema)