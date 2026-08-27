import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  BookOpen,
  Plus,
  X,
  Trash2,
  FileText,
} from "lucide-react";

import { useState } from "react";

const courses = [
  "Software Engineering",
  "Mathematics",
  "Computer Programming",
];

const weekDays = [
  { day: "MON", date: 24 },
  { day: "TUE", date: 25 },
  { day: "WED", date: 26 },
  { day: "THU", date: 27 },
  { day: "FRI", date: 28 },
];

function Planner() {
  const [selectedDay, setSelectedDay] = useState(24);

  const [showModal, setShowModal] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      day: 24,
      title: "Study Software Engineering",
      time: "10:00 AM — 11:30 AM",
      course: "Software Engineering",
      note: "",
      completed: false,
    },
    {
      id: 2,
      day: 24,
      title: "Complete Mathematics exercises",
      time: "2:00 PM — 3:00 PM",
      course: "Mathematics",
      note: "",
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    time: "",
    course: courses[0],
    note: "",
  });

  const selectedTasks = tasks.filter(
    (task) => task.day === selectedDay
  );

  const addTask = () => {
    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now(),
      day: selectedDay,
      title: newTask.title.trim(),
      time: newTask.time || "No time set",
      course: newTask.course,
      note: newTask.note.trim(),
      completed: false,
    };

    setTasks((previous) => [...previous, task]);

    setNewTask({
      title: "",
      time: "",
      course: courses[0],
      note: "",
    });

    setShowModal(false);
  };

  const toggleTask = (id) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );
  };

  return (
    <div className="page planner-page">

      {/* HEADER */}

      <div className="page-header">
        <div>
          <span className="eyebrow">
            ORGANIZE YOUR WEEK
          </span>

          <h1>My Planner</h1>

          <p>
            Plan your classes, tasks and study sessions.
          </p>
        </div>

        <button
          className="primary-button planner-add-button"
          onClick={() => setShowModal(true)}
        >
          <Plus size={17} />
          Add task
        </button>
      </div>

      {/* CALENDAR */}

      <div className="planner-calendar content-card">

        <div className="planner-calendar-header">
          <div>
            <span className="card-label">
              WEEK OVERVIEW
            </span>

            <h3>August 24 — 30</h3>
          </div>

          <CalendarDays size={21} />
        </div>

        <div className="week-days">

          {weekDays.map((day) => {

            const dayTasks = tasks.filter(
              (task) => task.day === day.date
            );

            const completedTasks =
              dayTasks.filter(
                (task) => task.completed
              ).length;

            return (
              <button
                key={day.date}
                className={
                  selectedDay === day.date
                    ? "day active"
                    : "day"
                }
                onClick={() =>
                  setSelectedDay(day.date)
                }
              >

                <span>{day.day}</span>

                <strong>{day.date}</strong>

                {dayTasks.length > 0 && (
                  <small>
                    {completedTasks}/{dayTasks.length}
                  </small>
                )}

              </button>
            );
          })}

        </div>
      </div>

      {/* CONTENT */}

      <div className="planner-content">

        {/* TODAY */}

        <div className="content-card planner-tasks-card">

          <div className="card-header">

            <div>
              <span className="card-label">
                {selectedDay === 24
                  ? "TODAY"
                  : "SELECTED DAY"}
              </span>

              <h3>
                {weekDays.find(
                  (day) => day.date === selectedDay
                )?.day || "Day"}
              </h3>
            </div>

            <span className="planner-task-count">
              {selectedTasks.length}{" "}
              {selectedTasks.length === 1
                ? "task"
                : "tasks"}
            </span>

          </div>

          {selectedTasks.length === 0 ? (

            <div className="planner-empty">

              <div className="planner-empty-icon">
                <CalendarDays size={25} />
              </div>

              <h3>No tasks yet</h3>

              <p>
                Your day is clear. Add a task to start
                planning.
              </p>

              <button
                className="primary-button"
                onClick={() => setShowModal(true)}
              >
                <Plus size={16} />
                Add task
              </button>

            </div>

          ) : (

            <div className="planner-task-list">

              {selectedTasks.map((task) => (

                <div
                  key={task.id}
                  className={
                    task.completed
                      ? "planner-task completed"
                      : "planner-task"
                  }
                >

                  <div className="task-icon">
                    <BookOpen size={18} />
                  </div>

                  <div className="task-info">

                    <strong>
                      {task.title}
                    </strong>

                    <span className="task-time">
                      <Clock3 size={13} />
                      {task.time}
                    </span>

                    <span className="task-course">
                      {task.course}
                    </span>

                    {task.note && (
                      <span className="task-note">
                        <FileText size={12} />
                        {task.note}
                      </span>
                    )}

                  </div>

                  <div className="task-actions">

                    <button
                      className={
                        task.completed
                          ? "task-check checked"
                          : "task-check"
                      }
                      onClick={() =>
                        toggleTask(task.id)
                      }
                      title={
                        task.completed
                          ? "Mark as incomplete"
                          : "Mark as complete"
                      }
                    >
                      <CheckCircle2 size={20} />
                    </button>

                    <button
                      className="task-delete"
                      onClick={() =>
                        deleteTask(task.id)
                      }
                      title="Delete task"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

        {/* PROGRESS */}

        <div className="content-card planner-progress-card">

          <span className="card-label">
            TODAY'S PROGRESS
          </span>

          <div className="progress-number">

            <strong>
              {selectedTasks.filter(
                (task) => task.completed
              ).length}
            </strong>

            <span>
              / {selectedTasks.length}
            </span>

          </div>

          <p>
            {selectedTasks.length === 0
              ? "No tasks planned yet."
              : selectedTasks.every(
                  (task) => task.completed
                )
              ? "Amazing! Everything is completed."
              : "Keep going. You are making progress."}
          </p>

          <div className="planner-progress-bar">
            <span
              style={{
                width:
                  selectedTasks.length === 0
                    ? "0%"
                    : `${
                        (selectedTasks.filter(
                          (task) =>
                            task.completed
                        ).length /
                          selectedTasks.length) *
                        100
                      }%`,
              }}
            />
          </div>

        </div>

      </div>

      {/* ADD TASK MODAL */}

      {showModal && (

        <div
          className="planner-modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="planner-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="planner-modal-header">

              <div>
                <span className="card-label">
                  NEW TASK
                </span>

                <h2>Add to your planner</h2>

                <p>
                  Plan something for{" "}
                  {weekDays.find(
                    (day) =>
                      day.date === selectedDay
                  )?.day}
                  .
                </p>
              </div>

              <button
                className="planner-modal-close"
                onClick={() =>
                  setShowModal(false)
                }
              >
                <X size={19} />
              </button>

            </div>

            <div className="planner-form">

              <label>
                Task name

                <input
                  value={newTask.title}
                  onChange={(event) =>
                    setNewTask({
                      ...newTask,
                      title: event.target.value,
                    })
                  }
                  placeholder="e.g. Study algorithms"
                  autoFocus
                />
              </label>

              <label>
                Time

                <input
                  type="text"
                  value={newTask.time}
                  onChange={(event) =>
                    setNewTask({
                      ...newTask,
                      time: event.target.value,
                    })
                  }
                  placeholder="e.g. 10:00 AM — 11:30 AM"
                />
              </label>

              <label>
                Course

                <select
                  value={newTask.course}
                  onChange={(event) =>
                    setNewTask({
                      ...newTask,
                      course: event.target.value,
                    })
                  }
                >
                  {courses.map((course) => (
                    <option
                      key={course}
                      value={course}
                    >
                      {course}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Note

                <textarea
                  value={newTask.note}
                  onChange={(event) =>
                    setNewTask({
                      ...newTask,
                      note: event.target.value,
                    })
                  }
                  placeholder="Add a note or reminder..."
                />

              </label>

            </div>

            <div className="planner-modal-actions">

              <button
                className="secondary-button"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="primary-button"
                onClick={addTask}
                disabled={!newTask.title.trim()}
              >
                <Plus size={16} />
                Add task
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Planner;