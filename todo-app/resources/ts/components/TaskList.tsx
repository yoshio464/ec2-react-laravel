import React from 'react'
import { TaskQuery } from '../queries/TaskQuery'
import { Task } from '../types/Task'
import { TaskItem } from './TaskItem'

export const TaskList: React.FC = () => {
    const {data:tasks, status} = TaskQuery()

    if (status === 'loading') {
        return <div className="loader" />
    } else if (status === 'error') {
        return <div className="align-center">データの読み込みに失敗しました</div>
    } else if (!tasks || tasks.length <= 0) {
        return <div className="align-center">登録されたTodoは存在しません</div>
    }

    return (
        <div className="inner">
            <ul className="task-list">
                {tasks.map((task: Task) => (
                    <TaskItem task={task} key={task.id}/>
                ))}
            </ul>
        </div>
    )
}
