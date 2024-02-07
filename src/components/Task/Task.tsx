import { Trash, Circle, CheckCircle } from "@phosphor-icons/react";
import styles from "./Task.module.css";
import { Task as ITask } from "../../App";

interface TaskProps {
  task: ITask;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

export function Task({
  task,
  onDelete,
  onComplete
}: Readonly<TaskProps>) {
  const taskIsComplete = task.status === 'done';

  function handleComplete() {
    onComplete(task.id);
  }

  function handleDelete() {
    onDelete(task.id);
  }

  return (
    <div className={styles.task}>
      {!taskIsComplete ? (
        <Circle
          className={styles.iconToCompleteTask}
          size={24}
          onClick={handleComplete}
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
        {task.description}
      </p>
      <Trash
        size={24}
        className={styles.deleteTaskIcon}
        onClick={handleDelete}
      />
    </div>
  );
}
