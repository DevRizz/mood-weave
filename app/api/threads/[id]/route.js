import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Thread from "@/models/Thread"
import mongoose from "mongoose"

export async function GET(request, { params }) {
  try {
    await connectToDatabase()

    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid thread ID" }, { status: 400 })
    }

    const thread = await Thread.findById(id).lean()

    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 })
    }

    return NextResponse.json(thread)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch thread" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase()

    const { id } = await params
    const threadData = await request.json()

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid thread ID" }, { status: 400 })
    }

    const thread = await Thread.findByIdAndUpdate(id, threadData, { new: true, runValidators: true }).lean()

    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 })
    }

    return NextResponse.json(thread)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update thread" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase()

    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid thread ID" }, { status: 400 })
    }

    const thread = await Thread.findByIdAndDelete(id)

    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to delete thread" }, { status: 500 })
  }
}