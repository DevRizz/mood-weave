import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Thread from "@/models/Thread"

export async function GET(request) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || "anonymous"

    const threads = await Thread.find({ userId }).sort({ date: -1 }).lean()

    return NextResponse.json(threads)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch threads" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectToDatabase()

    const threadData = await request.json()

    // Add userId if not provided
    if (!threadData.userId) {
      threadData.userId = "anonymous"
    }

    const thread = new Thread(threadData)
    await thread.save()

    return NextResponse.json(thread, { status: 201 })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create thread" }, { status: 500 })
  }
}