import "./global.css";
import styles from "./App.module.css";

import { Header } from "./components/Header/Header";
import { ClipboardText, PlusCircle } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Task } from "./components/Task/Task";

import { v4 as uuidv4 } from "uuid";

export interface Task {
  id: string;
  description: string;
  status: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleCreateNewTask() {
    const newTask = inputRef.current?.value;

    if (!newTask) {
      // algum tipo de feedback para o usuário
      return;
    }

    const newTaskObject = {
      id: uuidv4(),
      description: newTask,
      status: "todo",
    };

    setTasks([...tasks, newTaskObject]);
    inputRef.current.value = "";
  }

  function deleteTask(idToDelete: string) {
    const newTaskList = tasks.filter((task) => {
      return task.id !== idToDelete;
    });

    setTasks(newTaskList);
  }

  function completeTask(taskId: string) {
    const newTaskList = [...tasks];
    const completedTask = newTaskList.find((item) => item.id === taskId);

    if (completedTask) {
      completedTask.status = "done";
    }

    setTasks(newTaskList);
  }

  const createdTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "done").length;

  return (
    <div className={styles.wrapper}>
      <Header />

      <div className={styles.inputArea}>
        <input
          ref={inputRef}
          type="text"
          className={styles.textArea}
          placeholder="Adicione uma nova tarefa"
          required
        />
        <button className={styles.newTask} onClick={handleCreateNewTask}>
          Criar
          <PlusCircle size={20} color="#fcfcfc" />
        </button>
      </div>

      <main className={styles.main}>
        <div className={styles.taskCount}>
          <span className={styles.createdTasks}>
            Tarefas criadas{" "}
            <span className={styles.countOfTasksCreated}>{createdTasks}</span>
          </span>

          <span className={styles.completedTasks}>
            Concluídas{" "}
            <span className={styles.countOfCompletedTasks}>
              {completedTasks}
            </span>
          </span>
        </div>

        <div className={styles.tasks}>
          {createdTasks > 0 ? (
            tasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  task={task}
                  onComplete={completeTask}
                  onDelete={deleteTask}
                />
              );
            })
          ) : (
            <>
              <ClipboardText
                size={56}
                color="#3D3D3D"
                className={styles.noTasksIcon}
              />
              <span>
                <strong>Você ainda não tem tarefas cadastradas</strong>
              </span>
              <span>Crie tarefas e organize seus itens a fazer</span>{" "}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
