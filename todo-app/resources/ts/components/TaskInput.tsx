import React, { useState } from 'react'
import { useCreateTask } from '../queries/TaskQuery'

export const TaskInput: React.FC = () => {
    const [inputText, setInputText] = useState<string>("")
    const createTask = useCreateTask()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>
        ) => {
        e.preventDefault()
        createTask.mutate(inputText)
        setInputText("")
    }

    return (
        <form className="input-form" onSubmit={handleSubmit}>
            <div className="inner">
                <input type="text" className="input" placeholder="TODOを入力してください。" value={inputText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)} />
                <button className="btn is-primary">追加</button>
            </div>
        </form>
    )
}
