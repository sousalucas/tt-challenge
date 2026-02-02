'use client'

import { useEffect, useState } from 'react'
import { Task } from '@/lib/types'

export default function TaskClient() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        fetch('/api/tasks')
            .then(res => res.json())
            .then((data: Task[]) => setTasks(data))
    }, [])

    async function handleAdd() {
        const trimmed = title.trim()
        if (!trimmed) {
            setError('Task title is required')
            return
        }

        setError('')
        setIsPending(true)
        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: trimmed }),
        })
        const data = await res.json()
        setIsPending(false)

        if (!res.ok) {
            setError(data.error.message)
            return
        }
        setTasks(prev => [...prev, data as Task])
        setTitle('')
    }

    async function handleToggle(id: string) {
        setTasks(prev =>
            prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        )

        const res = await fetch(`/api/tasks/${id}`, { method: 'PATCH' })
        if (!res.ok) {
            const data = await res.json()
            setTasks(prev =>
                prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
            )
            setError(data.error.message)
        }
    }

    return (
        <div>
            <h2 style={{ fontSize: 16, fontWeight: 500, marginBottom: 12 }}>Tasks</h2>

            <form
                onSubmit={(e) => { e.preventDefault(); handleAdd() }}
                style={{ display: 'flex', gap: 8, marginBottom: 16 }}
            >
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New task title..."
                    disabled={isPending}
                    style={{
                        flex: 1,
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: 6,
                        fontSize: 14,
                        outline: 'none',
                    }}
                />
                <button
                    type="submit"
                    disabled={isPending}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#111',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        fontSize: 14,
                        cursor: 'pointer',
                        opacity: isPending ? 0.6 : 1,
                    }}
                >
                    {isPending ? 'Adding...' : 'Add'}
                </button>
            </form>

            {error && <p style={{ color: '#e53e3e', fontSize: 13, margin: '0 0 8px' }}>{error}</p>}

            {tasks.length === 0 ? (
                <p style={{ color: '#888', fontSize: 14 }}>No tasks yet. Add one above.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {tasks.map(task => (
                        <li
                            key={task.id}
                            style={{
                                padding: '10px 12px',
                                backgroundColor: '#fff',
                                borderRadius: 6,
                                marginBottom: 6,
                                border: '1px solid #eee',
                            }}
                        >
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggle(task.id)}
                                    style={{ marginRight: 10 }}
                                />
                                <span style={{
                                    fontSize: 14,
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                    color: task.completed ? '#aaa' : '#333',
                                }}>
                                    {task.title}
                                </span>
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
