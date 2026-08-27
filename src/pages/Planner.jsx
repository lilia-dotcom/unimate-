import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  BookOpen,
  Plus,
  X,
  Trash2,
  FileText,
  StickyNote,
  ChevronLeft,
  ChevronRight,
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
  { day: "SAT", date: 29 },
  { day: "SUN", date: 30 },
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
    {
      id: 3,
      day: 26,
      title: "Review programming notes",
      time: "11:00 AM — 12:00 PM",
      course: "Computer Programming",
      note: "Focus on loops and arrays.",
      completed: false,
    },
  ]);

  const [notes, setNotes] = useState(() => {
    return (
      localStorage.getItem("unimate_planner_notes") ||
      ""
    );
  });

  const [newTask, setNewTask] = useState({
    title: "",
    time: "",
    course: courses[0],
    note: "",
  });

  const selectedDayInfo = weekDays.find(
    (day) => day.date === selectedDay
  );

  const selectedTasks = tasks.filter(
    (task) => task.day === selectedDay
  );

  const completedCount = selectedTasks.filter(
    (task) => task.completed
  ).length;

  const progress =
    selectedTasks.length === 0
      ? 0
      : Math.round(
          (completedCount / selectedTasks.length) * 100
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

  const updateNotes = (value) => {
    setNotes(value);

    localStorage.setItem(
      "unimate_planner_notes",
      value
    );
  };

  const goPreviousDay = () => {
    const currentIndex = weekDays.findIndex(
      (day) => day.date === selectedDay
    );

    if (currentIndex > 0) {
      setSelectedDay(
        weekDays[currentIndex - 1].date
      );
    }
  };

  const goNextDay = () => {
    const currentIndex = weekDays.findIndex(
      (day) => day.date === selectedDay
    );

    if (
      currentIndex < weekDays.length - 1
    ) {
      setSelectedDay(
        weekDays[currentIndex + 1].date
      );
    }
  };

  return (
    <div className="page planner-page">

      {/* =================================================
          HEADER
      ================================================= */}

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


      {/* =================================================
          CALENDAR
      ================================================= */}

      <div className="planner-calendar content-card">

        <div className="planner-calendar-header">

          <div>
            <span className="card-label">
              WEEK OVERVIEW
            </span>

            <h3>
              August 24 — 30
            </h3>
          </div>

          <div className="planner-calendar-controls">

            <button
              onClick={goPreviousDay}
              disabled={selectedDay === 24}
            >
              <ChevronLeft size={17} />
            </button>

            <CalendarDays size={21} />

            <button
              onClick={goNextDay}
              disabled={selectedDay === 30}
            >
              <ChevronRight size={17} />
            </button>

          </div>

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

                <span>
                  {day.day}
                </span>

                <strong>
                  {day.date}
                </strong>

                {dayTasks.length > 0 && (

                  <small>
                    {completedTasks}/{dayTasks.length}
                  </small>

                )}

                {dayTasks.length === 0 && (
                  <small className="day-empty">
                    —
                  </small>
                )}

              </button>

            );
          })}

        </div>

      </div>


      {/* =================================================
          NOTES
      ================================================= */}

      <div className="planner-notes-section">

        <div className="planner-notes-card">

          <div className="planner-notes-header">

            <div className="planner-notes-title">

              <div className="planner-notes-icon">
                <StickyNote size={19} />
              </div>

              <div>

                <span className="card-label">
                  PERSONAL SPACE
                </span>

                <h3>
                  My Notes
                </h3>

              </div>

            </div>

            <span className="planner-notes-hint">
              Your private study space
            </span>

          </div>


          <textarea
            className="planner-notes-input"
            value={notes}
            onChange={(event) =>
              updateNotes(event.target.value)
            }
            placeholder={`Write anything here...

• Things you need to remember
• Ideas for your next study session
• Important deadlines
• Personal reminders
• Study notes...

This space is yours.`}
          />


          <div className="planner-notes-footer">

            <span>
              {notes.length} characters
            </span>

            <span className="notes-saved">
              ✓ Saved automatically
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="planner-content">


        {/* =================================================
            TASKS
        ================================================= */}

        <div className="content-card planner-tasks-card">

          <div className="card-header">

            <div>

              <span className="card-label">
                {selectedDay === 24
                  ? "TODAY"
                  : "SELECTED DAY"}
              </span>

              <h3>
                {selectedDayInfo?.day}
                {" "}
                {selectedDayInfo?.date}
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

              <h3>
                Your day is clear
              </h3>

              <p>
                Nothing planned yet. Add a task
                and make the most of your day.
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  setShowModal(true)
                }
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


        {/* =================================================
            PROGRESS
        ================================================= */}

        <div className="content-card planner-progress-card">

          <span className="card-label">
            {selectedDay === 24
              ? "TODAY'S PROGRESS"
              : "DAY PROGRESS"}
          </span>


          <div className="progress-number">

            <strong>
              {completedCount}
            </strong>

            <span>
              / {selectedTasks.length}
            </span>

          </div>


          <p>

            {selectedTasks.length === 0
              ? "No tasks planned yet."
              : progress === 100
              ? "Amazing! Everything is completed."
              : progress >= 50
              ? "You're doing great. Keep going."
              : "Start small. One task at a time."}

          </p>


          <div className="planner-progress-bar">

            <span
              style={{
                width: `${progress}%`,
              }}
            />

          </div>


          <div className="planner-progress-percent">
            {progress}% completed
          </div>

        </div>

      </div>


      {/* =================================================
          ADD TASK MODAL
      ================================================= */}

      {showModal && (

        <div
          className="planner-modal-overlay"
          onClick={() =>
            setShowModal(false)
          }
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

                <h2>
                  Add to your planner
                </h2>

                <p>
                  Plan something for{" "}
                  {selectedDayInfo?.day}{" "}
                  {selectedDayInfo?.date}.
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
                      title:
                        event.target.value,
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
                      time:
                        event.target.value,
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
                      course:
                        event.target.value,
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
                      note:
                        event.target.value,
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
                disabled={
                  !newTask.title.trim()
                }
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