import "./global.css";
import styles from "./App.module.css";

import { Header } from "./components/Header/Header";
import { ClipboardText, PlusCircle } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Task } from "./components/Task/Task";

import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  description: string;
  status: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inactiveButton, setInactiveButton] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  function checkIfInputIsEmpty() {
    if (inputRef.current!.value.trim().length > 0) {
      return setInactiveButton(false);
    }
    return setInactiveButton(true);
  }

  function handleCreateNewTask() {
    const newTask = inputRef.current?.value ?? "";

    const newTaskObject = {
      id: uuidv4(),
      description: newTask,
      status: "Em andamento",
    };

    setTasks([...tasks, newTaskObject]);
    if (inputRef.current) {
      inputRef.current.value = "";
      setInactiveButton(true);
    }
  }

  function deleteTask(idToDelete: string) {
    const newTaskList = tasks.filter((task) => {
      return task.id !== idToDelete;
    });

    setTasks(newTaskList);
  }

  function completeTask(taskId: string) {
    const newTaskList = [...tasks];

    newTaskList.find((task) => {
      if (task.id === taskId) return (task.status = "Concluída");
    });

    setTasks(newTaskList);
  }

  const createdTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Concluída"
  ).length;

  return (
    <div className={styles.wrapper}>
      <Header />

      <div className={styles.inputArea}>
        <input
          type="text"
          className={styles.textArea}
          placeholder="Adicione uma nova tarefa"
          ref={inputRef}
          required
          maxLength={60}
          onChange={checkIfInputIsEmpty}
        />
        <button
          className={styles.newTask}
          onClick={handleCreateNewTask}
          disabled={inactiveButton}
        >
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
          {tasks.length > 0 ? (
            tasks.map((task) => {
              return (
                <Task
                  taskDescription={task.description}
                  id={task.id}
                  key={task.id}
                  onDeleteTask={deleteTask}
                  onCompleteTask={completeTask}
                  taskStatus={task.status}
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
