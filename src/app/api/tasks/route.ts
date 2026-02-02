import { NextRequest, NextResponse } from 'next/server'
import tasks from '@/lib/store'
import { Task } from '@/lib/types'

export async function GET() {
    const all: Task[] = Array.from(tasks.values())
    return NextResponse.json(all, { status: 200 })
}

export async function POST(request: NextRequest) {
    const body = await request.json().catch(() => null)
    const title = typeof body?.title === 'string' ? body.title.trim() : ''

    if (!title) {
        return NextResponse.json(
            { error: { message: 'Task title is required' } },
            { status: 400 },
        )
    }

    const id = crypto.randomUUID()
    const task: Task = { id, title, completed: false }
    tasks.set(id, task)

    return NextResponse.json(task, { status: 201 })
}
