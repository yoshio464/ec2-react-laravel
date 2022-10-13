import React from "react"
import { TaskInput } from "../../components/TaskInput"
import { TaskList } from "../../components/TaskList"

export const TaskPage: React.FC = () => {
    // const [tasks, setTasks] = useState<Task[]>([])

    // const getTasks = async() => {
    //     const { data } = await axios.get('api/tasks')
    //     setTasks(data)
    // }

    // useEffect(() => {
    //     getTasks()
    // })

    return(
        <>
            <TaskInput />
            <TaskList />
        </>
    )
}
