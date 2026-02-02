'use server'

import { Task } from '@/lib/types'

const tasks = new Map<string, Task>()

tasks.set('1', { id: '1', title: 'TT Challenge', completed: true })
tasks.set('2', { id: '2', title: 'Build a Task Manager', completed: false })

export async function getTasks(): Promise<Task[]> {
    return Array.from(tasks.values())
}

export async function addTask(title: string): Promise<{ task?: Task; error?: string }> {
    const trimmed = title.trim()
    if (!trimmed) {
        return { error: 'Task title is required' }
    }

    const id = crypto.randomUUID()
    const task: Task = { id, title: trimmed, completed: false }
    tasks.set(id, task)
    return { task }
}

export async function toggleTask(id: string): Promise<{ task?: Task; error?: string }> {
    const task = tasks.get(id)
    if (!task) {
        return { error: 'Task not found' }
    }

    task.completed = !task.completed
    tasks.set(id, task)
    return { task }
}
