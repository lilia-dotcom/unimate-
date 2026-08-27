import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Plus,
  Target,
  Trash2,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const courseNames = {
  1: "Software Engineering",
  2: "Mathematics",
  3: "Computer Programming",
};

const defaultGoals = [
  {
    id: 1,
    title: "Finish the first chapter",
    description: "Understand the main concepts and terminology.",
    deadline: "2026-09-05",
    progress: 70,
    completed: false,
  },
  {
    id: 2,
    title: "Complete weekly exercises",
    description: "Finish all exercises before the next class.",
    deadline: "2026-09-02",
    progress: 40,
    completed: false,
  },
];

function CourseGoals() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const courseName =
    courseNames[courseId] || "Course";

  const storageKey = `unimate_goals_${courseId}`;

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem(storageKey);

    return saved
      ? JSON.parse(saved)
      : defaultGoals;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify(goals)
    );
  }, [goals, storageKey]);

  const completedGoals = goals.filter(
    (goal) => goal.completed
  ).length;

  const averageProgress =
    goals.length > 0
      ? Math.round(
          goals.reduce(
            (total, goal) =>
              total + goal.progress,
            0
          ) / goals.length
        )
      : 0;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddGoal = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    const newGoal = {
      id: Date.now(),
      title: form.title.trim(),
      description:
        form.description.trim() ||
        "No description added.",
      deadline:
        form.deadline || "No deadline",
      progress: 0,
      completed: false,
    };

    setGoals((previous) => [
      ...previous,
      newGoal,
    ]);

    setForm({
      title: "",
      description: "",
      deadline: "",
    });

    setIsModalOpen(false);
  };

  const updateProgress = (goalId, value) => {
    const progress = Number(value);

    setGoals((previous) =>
      previous.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              progress,
              completed: progress === 100,
            }
          : goal
      )
    );
  };

  const toggleCompleted = (goalId) => {
    setGoals((previous) =>
      previous.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              completed: !goal.completed,
              progress: !goal.completed
                ? 100
                : Math.min(goal.progress, 99),
            }
          : goal
      )
    );
  };

  const deleteGoal = (goalId) => {
    setGoals((previous) =>
      previous.filter(
        (goal) => goal.id !== goalId
      )
    );
  };

  const sortedGoals = useMemo(() => {
    return [...goals].sort(
      (a, b) =>
        Number(a.completed) -
        Number(b.completed)
    );
  }, [goals]);

  return (
    <div className="page course-goals-page">

      {/* BACK */}

      <button
        className="back-button"
        onClick={() =>
          navigate(`/courses/${courseId}`)
        }
      >
        <ArrowLeft size={17} />
        Back to course
      </button>


      {/* HEADER */}

      <div className="page-header">

        <div>

          <span className="eyebrow">
            {courseName}
          </span>

          <h1>
            Course Goals
          </h1>

          <p>
            Turn your course into clear,
            achievable milestones.
          </p>

        </div>


        <button
          className="primary-button"
          onClick={() =>
            setIsModalOpen(true)
          }
        >
          <Plus size={16} />
          Add goal
        </button>

      </div>


      {/* SUMMARY */}

      <div className="course-goals-summary">

        <div className="course-goal-stat">

          <div className="goal-stat-icon">
            <Target size={19} />
          </div>

          <div>
            <span>
              TOTAL GOALS
            </span>

            <strong>
              {goals.length}
            </strong>
          </div>

        </div>


        <div className="course-goal-stat">

          <div className="goal-stat-icon">
            <Check size={19} />
          </div>

          <div>
            <span>
              COMPLETED
            </span>

            <strong>
              {completedGoals}
            </strong>
          </div>

        </div>


        <div className="course-goal-stat">

          <div className="goal-stat-icon">
            %
          </div>

          <div>
            <span>
              AVERAGE PROGRESS
            </span>

            <strong>
              {averageProgress}%
            </strong>
          </div>

        </div>

      </div>


      {/* GOALS */}

      {sortedGoals.length === 0 ? (

        <div className="empty-goals">

          <Target size={36} />

          <h2>
            No goals yet
          </h2>

          <p>
            Create your first goal for this course.
          </p>

          <button
            className="primary-button"
            onClick={() =>
              setIsModalOpen(true)
            }
          >
            <Plus size={16} />
            Create your first goal
          </button>

        </div>

      ) : (

        <div className="course-goals-list">

          {sortedGoals.map((goal) => (

            <div
              className={`course-goal-card ${
                goal.completed
                  ? "completed"
                  : ""
              }`}
              key={goal.id}
            >

              <div className="course-goal-main">

                <button
                  className={`goal-check ${
                    goal.completed
                      ? "checked"
                      : ""
                  }`}
                  onClick={() =>
                    toggleCompleted(goal.id)
                  }
                  aria-label="Complete goal"
                >
                  {goal.completed && (
                    <Check size={15} />
                  )}
                </button>


                <div className="course-goal-content">

                  <div className="course-goal-title-row">

                    <div>

                      <h2>
                        {goal.title}
                      </h2>

                      <p>
                        {goal.description}
                      </p>

                    </div>

                    <span className="goal-progress-number">
                      {goal.progress}%
                    </span>

                  </div>


                  <div className="goal-progress-bar">

                    <div
                      style={{
                        width: `${goal.progress}%`,
                      }}
                    />

                  </div>


                  <div className="goal-footer">

                    <span>
                      📅 {goal.deadline}
                    </span>

                    <span>
                      {goal.completed
                        ? "Completed"
                        : "In progress"}
                    </span>

                  </div>


                  {/* PROGRESS CONTROL */}

                  <div className="goal-controls">

                    <label>
                      Progress
                    </label>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={goal.progress}
                      onChange={(event) =>
                        updateProgress(
                          goal.id,
                          event.target.value
                        )
                      }
                    />

                    <span>
                      {goal.progress}%
                    </span>

                  </div>

                </div>

              </div>


              <button
                className="goal-delete"
                onClick={() =>
                  deleteGoal(goal.id)
                }
                aria-label="Delete goal"
              >
                <Trash2 size={17} />
              </button>

            </div>

          ))}

        </div>

      )}


      {/* ADD GOAL MODAL */}

      {isModalOpen && (

        <div
          className="course-modal-overlay"
          onClick={() =>
            setIsModalOpen(false)
          }
        >

          <div
            className="course-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <span className="eyebrow">
                  NEW GOAL
                </span>

                <h2>
                  Create a course goal
                </h2>

                <p>
                  Give yourself something clear
                  to work toward.
                </p>

              </div>


              <button
                className="modal-close"
                onClick={() =>
                  setIsModalOpen(false)
                }
              >
                <X size={19} />
              </button>

            </div>


            <form onSubmit={handleAddGoal}>

              <div className="modal-field">

                <label>
                  Goal title
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Finish Chapter 3"
                  required
                />

              </div>


              <div className="modal-field">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="What do you want to accomplish?"
                  rows="4"
                />

              </div>


              <div className="modal-field">

                <label>
                  Deadline
                </label>

                <input
                  name="deadline"
                  type="date"
                  value={form.deadline}
                  onChange={handleChange}
                />

              </div>


              <button
                type="submit"
                className="auth-button modal-submit"
              >
                Create goal
                <ArrowUpRight size={17} />
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default CourseGoals;