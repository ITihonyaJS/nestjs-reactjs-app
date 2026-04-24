import { useEffect, useState } from "react";
import styles from "./App.module.scss";

type Task = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    isCompleted: false,
    priority: 1,
  });

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/tasks/all`,
        {
          headers: { "Cache-Control": "no-cache" },
        },
      );
      if (!response.ok) {
        throw new Error("Ошибка загрузки задач");
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError((err as Error).message || "Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const removeTask = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/tasks/delete/${id}`,
        {
          method: "DELETE",
          headers: { "Cache-Control": "no-cache" },
        },
      );
      if (!response.ok) {
        throw new Error("Не удалось удалить задачу");
      }
      setTasks((current) => current.filter((task) => task.id !== id));
    } catch (err) {
      setError((err as Error).message || "Ошибка при удалении");
    }
  };

  const startEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setEditData({
      title: task.title,
      description: task.description,
      isCompleted: task.isCompleted,
    });
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditData({ title: "", description: "", isCompleted: false });
  };

  const createTask = async () => {
    if (!newTask.title.trim()) {
      setError("Заголовок обязателен");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/tasks/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify(newTask),
        },
      );

      if (!response.ok) {
        throw new Error("Не удалось создать задачу");
      }

      await fetchTasks();
      setNewTask({
        title: "",
        description: "",
        isCompleted: false,
        priority: 1,
      });
    } catch (err) {
      setError((err as Error).message || "Ошибка при создании");
    }
  };

  const saveEdit = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/tasks/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify(editData),
        },
      );

      if (!response.ok) {
        throw new Error("Не удалось сохранить изменения");
      }

      await fetchTasks();
      cancelEdit();
    } catch (err) {
      setError((err as Error).message || "Ошибка при сохранении");
    }
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Список задач</h1>
        <p className={styles.subtitle}>
          Здесь отображаются данные из backend по маршруту{" "}
          <code>{process.env.REACT_APP_API_URL}/tasks/all</code>.
        </p>
      </header>

      {error && <p className={styles.errorMessage}>{error}</p>}
      {loading && <p className={styles.statusMessage}>Загрузка задач...</p>}

      <div className={styles.createForm}>
        <h2>Создать новую задачу</h2>
        <div className={styles.formRow}>
          <label>
            Заголовок *
            <input
              className={styles.input}
              type="text"
              value={newTask.title}
              onChange={(event) =>
                setNewTask((prev) => ({ ...prev, title: event.target.value }))
              }
              placeholder="Введите заголовок"
            />
          </label>
        </div>
        <div className={styles.formRow}>
          <label>
            Описание
            <textarea
              className={styles.textarea}
              value={newTask.description}
              onChange={(event) =>
                setNewTask((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
              placeholder="Введите описание"
            />
          </label>
        </div>
        <div className={styles.checkboxRow}>
          <input
            id="new-completed"
            type="checkbox"
            checked={newTask.isCompleted}
            onChange={(event) =>
              setNewTask((prev) => ({
                ...prev,
                isCompleted: event.target.checked,
              }))
            }
          />
          <label htmlFor="new-completed">Выполнена</label>
        </div>
        <div className={styles.formRow}>
          <label>
            Приоритет
            <input
              className={styles.input}
              type="number"
              value={newTask.priority}
              onChange={(event) =>
                setNewTask((prev) => ({
                  ...prev,
                  priority: Number(event.target.value),
                }))
              }
              min="1"
              max="10"
            />
          </label>
        </div>
        <div className={styles.taskActions}>
          <button
            className={`${styles.button} ${styles.buttonEdit}`}
            onClick={createTask}
          >
            Создать задачу
          </button>
        </div>
      </div>

      <div className={styles.tasksGrid}>
        {tasks.map((task) => (
          <article key={task.id} className={styles.taskCard}>
            <div className={styles.taskHeader}>
              <h2 className={styles.taskTitle}>{task.title}</h2>
              <span
                className={`${styles.taskStatus} ${task.isCompleted ? "" : styles.taskStatusIncomplete}`}
              >
                {task.isCompleted ? "Выполнена" : "В работе"}
              </span>
            </div>
            <p className={styles.taskDescription}>
              {task.description || "Описание отсутствует"}
            </p>

            <div className={styles.taskActions}>
              <button
                className={`${styles.button} ${styles.buttonEdit}`}
                onClick={() => startEdit(task)}
              >
                Редактировать
              </button>
              <button
                className={`${styles.button} ${styles.buttonDelete}`}
                onClick={() => removeTask(task.id)}
              >
                Удалить
              </button>
            </div>

            {editingTaskId === task.id && (
              <div className={styles.editForm}>
                <div className={styles.formRow}>
                  <label>
                    Заголовок
                    <input
                      className={styles.input}
                      type="text"
                      value={editData.title}
                      onChange={(event) =>
                        setEditData((prev) => ({
                          ...prev,
                          title: event.target.value,
                        }))
                      }
                    />
                  </label>
                </div>
                <div className={styles.formRow}>
                  <label>
                    Описание
                    <textarea
                      className={styles.textarea}
                      value={editData.description}
                      onChange={(event) =>
                        setEditData((prev) => ({
                          ...prev,
                          description: event.target.value,
                        }))
                      }
                    />
                  </label>
                </div>
                <div className={styles.checkboxRow}>
                  <input
                    id={`completed-${task.id}`}
                    type="checkbox"
                    checked={editData.isCompleted}
                    onChange={(event) =>
                      setEditData((prev) => ({
                        ...prev,
                        isCompleted: event.target.checked,
                      }))
                    }
                  />
                  <label htmlFor={`completed-${task.id}`}>Выполнена</label>
                </div>
                <div className={styles.taskActions}>
                  <button
                    className={`${styles.button} ${styles.buttonEdit}`}
                    onClick={() => saveEdit(task.id)}
                  >
                    Сохранить
                  </button>
                  <button
                    className={`${styles.button} ${styles.buttonDelete}`}
                    onClick={cancelEdit}
                  >
                    Отмена
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export default App;
