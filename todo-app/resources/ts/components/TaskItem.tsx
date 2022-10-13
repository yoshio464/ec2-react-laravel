import React, { useState } from 'react'
import { Task } from '../types/Task'
import { useUpdateDoneTask, useDeleteTask, useUpdateTask } from '../queries/TaskQuery'
import { toast } from 'react-toastify'

type Props = {
    task: Task
}

export const TaskItem: React.FC<Props> = ({task}) => {
    const [item, setItem] = useState<string|undefined>(undefined)
    const updateTask = useUpdateTask()
    const updateDoneTask = useUpdateDoneTask()
    const deleteTask = useDeleteTask()

    const handleChange = (value: string) => {
        setItem(value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (['Escape', 'Tab'].includes(e.key) ) {
            setItem(undefined)
        }
    }

    const handleUpdate = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const newTask = {...task}
        if (item) {
            newTask.title = item
        } else {
            toast.error('タイトルの入力は必須です')
            return
        }
        updateTask.mutate({id: task.id, task: newTask})
        setItem(undefined)
    }

    const itemInput = () => {
        return(
            <>
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        className='input'
                        defaultValue={item}
                        onChange={(e) => handleChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </form>
                <button className='btn' onClick={handleUpdate}>更新</button>
            </>
        )
    }

    const itemText = () => {
        return(
            <>
                <div onClick={() => setItem(task.title)}>
                    <span>{task.title}</span>
                </div>
                <button
                    className='btn is-delete'
                    onClick={() => deleteTask.mutate(task.id)}
                >
                    削除
                </button>
            </>
        )
    }

    return (
        <li className={task.is_done ? 'done' : ''} key={task.id}>
            <label className="checkbox-label">
                <input
                    type="checkbox"
                    className="checkbox-input"
                    onClick={() => updateDoneTask.mutate(task) }
                />
            </label>
            {item === undefined ? itemText() : itemInput()}
        </li>
    )
}
