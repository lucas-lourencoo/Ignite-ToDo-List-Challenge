import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid'
import styles from './App.module.scss';
import './styles/globals.scss';

interface ITask {
  id: string;
  name: string;
  isComplete: boolean;
}

function App() {
  const [tasks, setTasks] = useState([] as ITask[])
  const [taskInput, setTaskInput] = useState('')
  const [tasksComplete, setTasksComplete] = useState(0)

  useEffect(() => {
    const tasksCompletedCount = tasks.reduce((acc, task) => {
      if (task.isComplete) {
        return acc += 1
      } else {
        return acc
      }
    }, 0)

    setTasksComplete(tasksCompletedCount)
  }, [tasks])

  function handleTaskInputChange({ target: input }: React.ChangeEvent<HTMLInputElement>) {
    setTaskInput(input.value)
  }

  function createNewTask(event: React.FormEvent) {
    event.preventDefault();

    const newTask = {
      id: uuid(),
      name: taskInput,
      isComplete: false
    }

    setTasks(tasks => [...tasks, newTask])
    setTaskInput('')
  }

  function handleDeleteTask(taskId: string) {
    const taskRemoved = tasks.filter(task => task.id !== taskId)
    setTasks(taskRemoved)
  }

  function handleCompleteTask(taskId: string) {
    const tasksChanged = tasks.map(task => {
      if (task.id === taskId) {
        task.isComplete = !task.isComplete
      }
      return task
    })

    setTasks(tasksChanged)
  }


  return (
    <>
      <header className={styles.header}>
        <img src="/logo.svg" alt="Logo ToDo" />
      </header>

      <main className={styles.container}>
        <form className={styles.searchContainer} onSubmit={createNewTask}>
          <input type="text" name="taskName" placeholder='Adicione uma nova tarefa' onChange={handleTaskInputChange} value={taskInput} required />
          <button type='submit'>Criar <img src="/plus.svg" alt="Plus" /></button>
        </form>

        <section className={styles.tasks}>
          <header className={styles.info}>
            <div className={styles.created}>
              <p>Tarefas criadas: <span>{tasks.length}</span></p>
            </div>
            <div className={styles.done}>
              <p>Concluídas: <span>{tasksComplete} de {tasks.length}</span></p>
            </div>
          </header>

          {tasks.length > 0 ?
            tasks.map(task => (
              <div className={styles.task} key={task.id}>
                <label htmlFor="isTaskCompleted" className={task.isComplete ? styles.isTaskCompletedLabel : ''}>
                  <img src="/check.svg" alt="Check" />
                  <input type="checkbox" name="isTaskCompleted" defaultChecked={task.isComplete} id="isTaskCompleted" onChange={() => handleCompleteTask(task.id)} />
                </label>
                <p className={task.isComplete ? styles.isTaskCompleted : ''}>{task.name}</p>
                <button title="Excluir task" onClick={() => handleDeleteTask(task.id)}><img src="/trash.svg" alt="" /></button>
              </div>
            ))
            : (
              <div className={styles.empty}>
                <img src="/clipboard.png" alt="Clipboard Image" />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            )}
        </section>
      </main>
    </>
  )
}

export { App };

