import {
  Target,
  TrendingUp,
  CheckCircle2,
  Plus,
  Flame,
  Trophy,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import { useState } from "react";

const initialGoals = [
  {
    id: 1,
    title: "Improve my GPA",
    category: "Academic",
    progress: 72,
    target: "3.7 GPA",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Study consistently",
    category: "Study",
    progress: 58,
    target: "20 hours / week",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Master programming",
    category: "Skills",
    progress: 85,
    target: "Complete the course",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
  },
];

const motivation = [
  "Small progress is still progress.",
  "You don't need to be perfect. You just need to keep going.",
  "Your future self will thank you for what you do today.",
  "One focused hour can change your whole day.",
];

function Goals() {
  const [goals, setGoals] = useState(initialGoals);
  const [showModal, setShowModal] = useState(false);

  const [newGoal, setNewGoal] = useState({
    title: "",
    category: "Academic",
    target: "",
  });

  const completedGoals = goals.filter(
    (goal) => goal.progress === 100
  ).length;

  const activeGoals = goals.filter(
    (goal) => goal.progress < 100
  ).length;

  const overallProgress =
    goals.length === 0
      ? 0
      : Math.round(
          goals.reduce(
            (total, goal) => total + goal.progress,
            0
          ) / goals.length
        );

  const addGoal = () => {
    if (!newGoal.title.trim()) return;

    const goal = {
      id: Date.now(),
      title: newGoal.title.trim(),
      category: newGoal.category,
      target: newGoal.target || "Make progress",
      progress: 0,
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
    };

    setGoals((previous) => [...previous, goal]);

    setNewGoal({
      title: "",
      category: "Academic",
      target: "",
    });

    setShowModal(false);
  };

  const updateProgress = (id, amount) => {
    setGoals((previous) =>
      previous.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              progress: Math.min(
                100,
                Math.max(0, goal.progress + amount)
              ),
            }
          : goal
      )
    );
  };

  const removeGoal = (id) => {
    setGoals((previous) =>
      previous.filter((goal) => goal.id !== id)
    );
  };

  return (
    <div className="page goals-page">

      {/* HEADER */}

      <div className="page-header">
        <div>
          <span className="eyebrow">
            PERSONAL PROGRESS
          </span>

          <h1>My Goals</h1>

          <p>
            Turn your plans into measurable progress.
          </p>
        </div>

        <button
          className="primary-button goals-add-button"
          onClick={() => setShowModal(true)}
        >
          <Plus size={17} />
          Add goal
        </button>
      </div>

      {/* MOTIVATION HERO */}

      <section className="goals-hero">

        <div className="goals-hero-content">

          <div className="goals-hero-icon">
            <Sparkles size={22} />
          </div>

          <span>YOUR JOURNEY</span>

          <h2>
            Keep going.
            <br />
            You're closer than you think.
          </h2>

          <p>
            Every study session, every completed task,
            and every small step brings you closer to
            the person you want to become.
          </p>

        </div>

        <div className="goals-hero-image">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
            alt="Students studying together"
          />

          <div className="hero-image-badge">
            <Flame size={15} />
            Keep your streak alive
          </div>
        </div>

      </section>

      {/* OVERVIEW */}

      <div className="goal-overview">

        <div className="goal-overview-main">

          <div className="goal-icon">
            <Target size={24} />
          </div>

          <div>
            <span>OVERALL PROGRESS</span>

            <strong>
              {overallProgress}%
            </strong>
          </div>

        </div>

        <div className="goal-stat">
          <span>ACTIVE GOALS</span>
          <strong>{activeGoals}</strong>
        </div>

        <div className="goal-stat">
          <span>COMPLETED</span>
          <strong>{completedGoals}</strong>
        </div>

        <div className="goal-stat">
          <span>TOTAL GOALS</span>
          <strong>{goals.length}</strong>
        </div>

      </div>

      {/* MOTIVATION CARD */}

      <section className="daily-motivation">

        <div className="motivation-icon">
          <Trophy size={20} />
        </div>

        <div>
          <span>DAILY REMINDER</span>

          <p>
            “{motivation[
              new Date().getDate() %
                motivation.length
            ]}”
          </p>
        </div>

      </section>

      {/* GOALS */}

      <div className="goals-section-header">

        <div>
          <span className="eyebrow">
            YOUR GOALS
          </span>

          <h2>What are you working toward?</h2>
        </div>

        <span className="goals-count">
          {goals.length} goals
        </span>

      </div>

      <div className="goals-grid">

        {goals.map((goal) => (

          <div
            className="goal-card"
            key={goal.id}
          >

            {/* IMAGE */}

            <div className="goal-card-image">

              <img
                src={goal.image}
                alt={goal.title}
              />

              <div className="goal-category">
                {goal.category}
              </div>

              {goal.progress === 100 && (
                <div className="goal-completed-badge">
                  <CheckCircle2 size={14} />
                  Completed
                </div>
              )}

            </div>

            {/* CONTENT */}

            <div className="goal-card-content">

              <div className="goal-card-title-row">

                <h3>{goal.title}</h3>

                <TrendingUp size={17} />

              </div>

              <p className="goal-target">
                Target: {goal.target}
              </p>

              <div className="goal-progress-header">

                <span>Progress</span>

                <strong>
                  {goal.progress}%
                </strong>

              </div>

              <div className="goal-progress-bar">
                <div
                  style={{
                    width: `${goal.progress}%`,
                  }}
                />
              </div>

              <div className="goal-card-bottom">

                <div className="goal-quick-actions">

                  <button
                    onClick={() =>
                      updateProgress(
                        goal.id,
                        10
                      )
                    }
                    disabled={
                      goal.progress === 100
                    }
                  >
                    +10%
                  </button>

                  <button
                    onClick={() =>
                      updateProgress(
                        goal.id,
                        -10
                      )
                    }
                    disabled={
                      goal.progress === 0
                    }
                  >
                    -10%
                  </button>

                </div>

                <button
                  className="goal-delete"
                  onClick={() =>
                    removeGoal(goal.id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* BOTTOM MOTIVATION */}

      <section className="goals-bottom-banner">

        <div>

          <span>REMEMBER</span>

          <h2>
            Your goals don't have to happen
            all at once.
          </h2>

          <p>
            Focus on one small step today.
          </p>

        </div>

        <ArrowUpRight size={26} />

      </section>

      {/* ADD GOAL MODAL */}

      {showModal && (

        <div
          className="goals-modal-overlay"
          onClick={() =>
            setShowModal(false)
          }
        >

          <div
            className="goals-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="goals-modal-header">

              <div>
                <span className="card-label">
                  NEW GOAL
                </span>

                <h2>Create a goal</h2>

                <p>
                  Give yourself something exciting
                  to work toward.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                ×
              </button>

            </div>

            <div className="goals-form">

              <label>
                Goal name

                <input
                  value={newGoal.title}
                  onChange={(event) =>
                    setNewGoal({
                      ...newGoal,
                      title:
                        event.target.value,
                    })
                  }
                  placeholder="e.g. Get better at Python"
                  autoFocus
                />
              </label>

              <label>
                Category

                <select
                  value={newGoal.category}
                  onChange={(event) =>
                    setNewGoal({
                      ...newGoal,
                      category:
                        event.target.value,
                    })
                  }
                >
                  <option>Academic</option>
                  <option>Study</option>
                  <option>Skills</option>
                  <option>Personal</option>
                </select>
              </label>

              <label>
                Target

                <input
                  value={newGoal.target}
                  onChange={(event) =>
                    setNewGoal({
                      ...newGoal,
                      target:
                        event.target.value,
                    })
                  }
                  placeholder="e.g. Finish 5 chapters"
                />
              </label>

            </div>

            <div className="goals-modal-actions">

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
                onClick={addGoal}
                disabled={
                  !newGoal.title.trim()
                }
              >
                <Plus size={16} />
                Create goal
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Goals;