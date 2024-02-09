import { Trash, Circle, CheckCircle } from "@phosphor-icons/react";
import styles from "./Task.module.css";

interface TaskProps {
  taskDescription: string;
  id: string;
  onDeleteTask: (idToDelete: string) => void;
  onCompleteTask: (taskId: string) => void;
  taskStatus: string;
}

export function Task({
  taskDescription,
  onDeleteTask,
  id,
  onCompleteTask,
  taskStatus,
}: TaskProps) {
  return (
    <>
      <div className={styles.task}>
        {taskStatus === "Em andamento" ? (
          <Circle
            className={styles.iconToCompleteTask}
            size={24}
            onClick={() => onCompleteTask(id)}
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
            taskStatus === "Em andamento"
              ? styles.descriptionOfTheTaskInProgress
              : styles.fullTaskDescription
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
