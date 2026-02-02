import { Task } from './types'

const tasks = new Map<string, Task>()

tasks.set('1', { id: '1', title: 'TT Challenge', completed: true })
tasks.set('2', { id: '2', title: 'Build a Task Manager', completed: false })

export default tasks
