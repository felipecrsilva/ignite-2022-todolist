import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { PlusCircle } from "phosphor-react";
import { v4 as uuid } from "uuid";

import styles from "./styles.module.scss";

interface NewTaskProps {
  setTasks: Dispatch<SetStateAction<Array<{
    id: string;
    isComplete: boolean;
    title: string;
  }>>>;
}

export function NewTask({ setTasks }: NewTaskProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask(e: FormEvent) {
    e.preventDefault();

    if (newTaskTitle === "") {
      return;
    }

    const newTask = {
      id: uuid(),
      isComplete: false,
      title: newTaskTitle
    }

    setTasks(tasks => [newTask, ...tasks])
    setNewTaskTitle("");
  }

  return (
    <form className={styles.newTaskContainer} onSubmit={handleCreateNewTask}>
      <input 
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={newTaskTitle}
        onChange={e => setNewTaskTitle(e.target.value)}
      />
      <button 
        type="submit"
      >
        Criar
        <PlusCircle fontSize={16} />
      </button>
    </form>
  );
}