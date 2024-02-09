import "./global.css";
import styles from "./App.module.css";

import { Header } from "./components/Header/Header";
import { ClipboardText, PlusCircle } from "@phosphor-icons/react";
import { ChangeEvent, useState } from "react";
import { Task } from "./components/Task/Task";

import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  description: string;
  status: string;
}

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    const newTaskInfo = event.target.value;
    setNewTask(newTaskInfo);
  }

  function handleCreateNewTask() {
    const newTaskObject = {
      id: uuidv4(),
      description: newTask,
      status: "Em andamento",
    };

    setTasks([...tasks, newTaskObject]);
    setNewTask("");
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
          value={newTask}
          onChange={handleNewTaskChange}
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
