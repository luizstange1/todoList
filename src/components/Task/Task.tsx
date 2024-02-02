import { Trash, Circle, CheckCircle } from "@phosphor-icons/react";
import styles from "./Task.module.css";
import { useState } from "react";

interface TaskProps {
  taskDescription: string;
  id: string;
  onDeleteTask: (idToDelete: string) => void;
  completedTasks: number;
  setCompletedTasks: (completedTasks: number) => void;
}

export function Task({
  taskDescription,
  onDeleteTask,
  id,
  completedTasks,
  setCompletedTasks,
}: TaskProps) {
  const [taskIsComplete, setTaskIsComplete] = useState(false);

  function hancleClickToCompleteTheTask() {
    setTaskIsComplete(true);
    setCompletedTasks(completedTasks + 1);
  }
  return (
    <>
      <div className={styles.task}>
        {!taskIsComplete ? (
          <Circle
            className={styles.iconToCompleteTask}
            size={24}
            onClick={hancleClickToCompleteTheTask}
          />
        ) : (
          <CheckCircle
            size={24}
            className={styles.taskCompletedIcon}
            weight="fill"
          />
        )}
        <p
          className={
            taskIsComplete
              ? styles.taskDescriptionOfTheCompletedTask
              : styles.taskDescription
          }
        >
          {taskDescription}
        </p>
        <Trash
          size={24}
          className={styles.deleteTaskIcon}
          onClick={() => onDeleteTask(id)}
        />
      </div>
    </>
  );
}
