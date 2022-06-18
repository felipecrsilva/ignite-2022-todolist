import { Dispatch, SetStateAction } from "react";
import { Trash } from "phosphor-react";

import clipboardImg from "../../assets/clipboard.svg";
import checkedImg from "../../assets/checked.svg";
import uncheckedImg from "../../assets/unchecked.svg";

import styles from "./styles.module.scss";

interface ToDoListProps {
  tasks: Array<{
    id: string;
    isComplete: boolean;
    title: string;
  }>;
  setTasks: Dispatch<SetStateAction<Array<{
    id: string;
    isComplete: boolean;
    title: string;
  }>>>;
}

export function ToDoList({ tasks, setTasks }: ToDoListProps) {
  function handleChangeTaskStatus(id: string) {
    const updateTasks = tasks.map(task => {
      if (task.id !== id) {
        return task;
      }

      return {
        ...task,
        isComplete: !task.isComplete
      };
    });

    setTasks([ ...updateTasks ])
  }

  function handleDeleteTask(id: string) {
    const updateTasks = tasks.filter(task => task.id !== id);

    setTasks([ ...updateTasks ]);
  }

  const finishedTasksText = () => {
    if (tasks.length === 0) {
      return "0";
    }

    const finishedTasksArray = tasks.filter(task => task.isComplete);

    return finishedTasksArray.length + " de " + tasks.length;
  }

  return (
    <div className={styles.todoContainer}>
      <header>
        <div className={styles.createdTasks}>
          <strong>Tarefas criadas</strong>
          <span>{ tasks.length }</span>
        </div>
        <div className={styles.finishedTasks}>
          <strong>Concluídas</strong>
          <span>{ finishedTasksText() }</span>
        </div>
      </header>

      <div className={styles.list}>
        { tasks.length === 0 ? (
          <div className={styles.todoListIsEmpty}>
            <img src={clipboardImg} alt="Você ainda não cadastrou nenhuma tarefa" />
            <p>
              <strong>Você ainda não tem tarefas cadastradas</strong> <br />
              Crie tarefas e organize seus itens a fazer
            </p>
          </div>
        ) : tasks.map(task => {
          return (
            <div key={task.id} className={styles.task}>
              <div>
                <button onClick={() => handleChangeTaskStatus(task.id)}>
                  { task.isComplete ? (
                    <img src={checkedImg} alt="Tarefa concluída" />
                  ) : (
                    <img src={uncheckedImg} alt="Tarefa não concluída" />
                  ) }
                </button>
                <span 
                  className={task.isComplete ? styles.isComplete : styles.isNotComplete}
                >
                  { task.title }
                </span>
              </div>
              <button onClick={() => handleDeleteTask(task.id)}>
                <Trash />
              </button>
          </div>
          );
        }) }
      </div>
    </div>
  );
}