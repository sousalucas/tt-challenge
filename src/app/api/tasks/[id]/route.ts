import { NextRequest, NextResponse } from 'next/server'
import tasks from '@/lib/store'

export async function PATCH(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params
    const task = tasks.get(id)

    if (!task) {
        return NextResponse.json(
            { error: { message: 'Task not found' } },
            { status: 404 },
        )
    }

    task.completed = !task.completed
    tasks.set(id, task)

    return NextResponse.json(task, { status: 200 })
}
