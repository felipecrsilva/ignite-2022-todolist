import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { NewTask } from "./components/NewTask";
import { ToDoList } from "./components/ToDoList";

import styles from "./styles/App.module.scss";

interface TasksProps {
  id: string;
  isComplete: boolean;
  title: string;
}

function App() {
  const [tasks, setTasks] = useState<TasksProps[]>(() => {
    const tasks = localStorage.getItem("@todoList:tasks");

    if (tasks) {
      return JSON.parse(tasks);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("@todoList:tasks", JSON.stringify(tasks))
  }, [tasks])

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <NewTask
          setTasks={setTasks}
        />
        <ToDoList
          tasks={tasks}
          setTasks={setTasks}
        />
      </main>
    </>
  )
}

export default App
