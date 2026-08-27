import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Coffee,
  CloudRain,
  Library,
  Flame,
  CheckCircle2,
  SkipForward,
  ExternalLink,
  Target,
  Sparkles,
  Brain,
  Trophy,
  Zap,
  Plus,
  Check,
  X,
  Moon,
  ListTodo,
  PenLine,
  Music2,
  BarChart3,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

const quotes = [
  "One focused hour can change your whole day.",
  "You don't need motivation. You need one small start.",
  "Deep work today. A better version of you tomorrow.",
  "Protect your focus. Your goals deserve your attention.",
  "Small sessions become big results.",
];

const defaultTasks = [
  {
    id: 1,
    title: "Review Software Engineering",
    done: false,
  },
  {
    id: 2,
    title: "Practice 10 programming exercises",
    done: false,
  },
  {
    id: 3,
    title: "Review today's notes",
    done: true,
  },
];

function Focus() {
  const audioRef = useRef(null);

  const durations = {
    focus: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
  };

  const [mode, setMode] = useState("focus");
  const [seconds, setSeconds] = useState(durations.focus);
  const [isRunning, setIsRunning] = useState(false);

  const [sessions, setSessions] = useState(3);
  const [focusMinutes, setFocusMinutes] = useState(75);

  const [sound, setSound] = useState("rain");
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const [mission, setMission] = useState(
    "Master Software Engineering"
  );

  const [missionInput, setMissionInput] = useState(
    "Master Software Engineering"
  );

  const [editingMission, setEditingMission] =
    useState(false);

  const [notes, setNotes] = useState("");

  const [tasks, setTasks] =
    useState(defaultTasks);

  const [newTask, setNewTask] =
    useState("");

  const [showTaskInput, setShowTaskInput] =
    useState(false);

  const [quoteIndex, setQuoteIndex] =
    useState(0);

  /* ================= TIMER ================= */

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((previous) => {
        if (previous <= 1) {
          setIsRunning(false);

          if (mode === "focus") {
            setSessions((value) => value + 1);
            setFocusMinutes((value) => value + 25);
          }

          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setSoundPlaying(false);
          }

          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  /* ================= AUDIO ================= */

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setSoundPlaying(false);
  };

  const toggleSound = async () => {
    if (!audioRef.current || sound !== "rain")
      return;

    if (soundPlaying) {
      audioRef.current.pause();
      setSoundPlaying(false);
      return;
    }

    audioRef.current.volume = muted ? 0 : 0.35;

    try {
      await audioRef.current.play();
      setSoundPlaying(true);
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= FOCUS ================= */

  const toggleFocus = async () => {
    if (isRunning) {
      setIsRunning(false);
      return;
    }

    setIsRunning(true);

    if (
      sound === "rain" &&
      !muted &&
      audioRef.current
    ) {
      audioRef.current.volume = 0.35;

      try {
        await audioRef.current.play();
        setSoundPlaying(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  /* ================= MODE ================= */

  const changeMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    stopSound();
    setSeconds(durations[newMode]);
  };

  /* ================= RESET ================= */

  const resetTimer = () => {
    setIsRunning(false);
    stopSound();
    setSeconds(durations[mode]);
  };

  /* ================= SKIP ================= */

  const skipSession = () => {
    if (mode === "focus") {
      changeMode("short");
    } else {
      changeMode("focus");
    }
  };

  /* ================= MUTE ================= */

  const toggleMute = () => {
    setMuted((previous) => {
      const next = !previous;

      if (audioRef.current) {
        audioRef.current.volume = next
          ? 0
          : 0.35;
      }

      return next;
    });
  };

  /* ================= SOUND ================= */

  const selectSound = (newSound) => {
    setSound(newSound);

    if (newSound !== "rain") {
      stopSound();
    }
  };

  /* ================= MISSION ================= */

  const saveMission = () => {
    if (!missionInput.trim()) return;

    setMission(missionInput.trim());
    setEditingMission(false);
  };

  /* ================= TASKS ================= */

  const toggleTask = (id) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? {
              ...task,
              done: !task.done,
            }
          : task
      )
    );
  };

  const addTask = () => {
    if (!newTask.trim()) return;

    setTasks((previous) => [
      ...previous,
      {
        id: Date.now(),
        title: newTask.trim(),
        done: false,
      },
    ]);

    setNewTask("");
    setShowTaskInput(false);
  };

  const removeTask = (id) => {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );
  };

  /* ================= TIME ================= */

  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");

  const secs = (seconds % 60)
    .toString()
    .padStart(2, "0");

  const progress =
    ((durations[mode] - seconds) /
      durations[mode]) *
    100;

  const completedTasks =
    tasks.filter((task) => task.done).length;

  const taskProgress =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks / tasks.length) * 100
        );

  return (
    <div className="page focus-page">

      {/* AUDIO */}

      <audio
        ref={audioRef}
        src="/sounds/rain.mp3"
        loop
        preload="auto"
      />

      {/* ================= HEADER ================= */}

      <div className="focus-header">

        <div>

          <span className="eyebrow">
            PERSONAL FOCUS STUDIO
          </span>

          <h1>
            Deep Focus
          </h1>

          <p>
            Clear your mind. Choose one thing.
            Make it count.
          </p>

        </div>

        <div className="focus-header-right">

          <div className="focus-score">
            <div className="focus-score-icon">
              <Flame size={17} />
            </div>

            <div>
              <strong>
                {sessions}
              </strong>

              <span>
                sessions today
              </span>
            </div>
          </div>

          <div className="focus-score">
            <div className="focus-score-icon">
              <Timer size={17} />
            </div>

            <div>
              <strong>
                {focusMinutes}
              </strong>

              <span>
                focused minutes
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* ================= CURRENT MISSION ================= */}

      <section className="focus-mission">

        <div className="mission-icon">
          <Target size={21} />
        </div>

        <div className="mission-content">

          <span>
            CURRENT MISSION
          </span>

          {editingMission ? (

            <div className="mission-edit">

              <input
                value={missionInput}
                onChange={(e) =>
                  setMissionInput(
                    e.target.value
                  )
                }
                autoFocus
              />

              <button
                onClick={saveMission}
              >
                <Check size={16} />
              </button>

              <button
                onClick={() =>
                  setEditingMission(false)
                }
              >
                <X size={16} />
              </button>

            </div>

          ) : (

            <div className="mission-title">

              <h2>
                {mission}
              </h2>

              <button
                onClick={() =>
                  setEditingMission(true)
                }
              >
                <PenLine size={14} />
                Edit
              </button>

            </div>

          )}

        </div>

        <div className="mission-status">
          <Zap size={15} />
          ONE THING AT A TIME
        </div>

      </section>

      {/* ================= MODES ================= */}

      <div className="focus-modes">

        <button
          className={
            mode === "focus"
              ? "focus-mode active"
              : "focus-mode"
          }
          onClick={() =>
            changeMode("focus")
          }
        >
          <Brain size={16} />
          Focus
          <span>25 min</span>
        </button>

        <button
          className={
            mode === "short"
              ? "focus-mode active"
              : "focus-mode"
          }
          onClick={() =>
            changeMode("short")
          }
        >
          <Coffee size={16} />
          Short break
          <span>5 min</span>
        </button>

        <button
          className={
            mode === "long"
              ? "focus-mode active"
              : "focus-mode"
          }
          onClick={() =>
            changeMode("long")
          }
        >
          <Coffee size={16} />
          Long break
          <span>15 min</span>
        </button>

      </div>

      {/* ================= MAIN GRID ================= */}

      <div className="focus-studio-grid">

        {/* TIMER */}

        <section
          className={
            isRunning
              ? "focus-timer-card running"
              : "focus-timer-card"
          }
        >

          <div className="timer-card-top">

            <div>
              <span>
                {mode === "focus"
                  ? "DEEP WORK SESSION"
                  : "RECOVERY TIME"}
              </span>

              <h2>
                {isRunning
                  ? "Stay in the zone."
                  : "Ready to focus?"}
              </h2>
            </div>

            <div className="live-indicator">
              <span />
              {isRunning
                ? "LIVE"
                : "READY"}
            </div>

          </div>

          <div
            className="timer-ring"
            style={{
              "--progress": `${progress}%`,
            }}
          >

            <div className="timer-inner">

              <div className="timer-small-icon">
                <Timer size={19} />
              </div>

              <strong>
                {minutes}:{secs}
              </strong>

              <span>
                {mode === "focus"
                  ? "FOCUS SESSION"
                  : mode === "short"
                  ? "SHORT BREAK"
                  : "LONG BREAK"}
              </span>

            </div>

          </div>

          <div className="timer-buttons">

            <button
              className="primary-button focus-start"
              onClick={toggleFocus}
            >
              {isRunning ? (
                <>
                  <Pause size={17} />
                  Pause session
                </>
              ) : (
                <>
                  <Play size={17} />
                  Start focus
                </>
              )}
            </button>

            <button
              className="secondary-button"
              onClick={resetTimer}
              title="Reset"
            >
              <RotateCcw size={17} />
            </button>

            <button
              className="secondary-button"
              onClick={skipSession}
              title="Skip"
            >
              <SkipForward size={17} />
            </button>

          </div>

          <div className="focus-timer-footer">

            <div>
              <Sparkles size={14} />

              <span>
                {isRunning
                  ? "Protect this moment."
                  : "Your next 25 minutes are yours."}
              </span>
            </div>

            <strong>
              {Math.round(progress)}%
            </strong>

          </div>

        </section>

        {/* RIGHT SIDE */}

        <div className="focus-side-column">

          {/* TASKS */}

          <section className="focus-tasks-card">

            <div className="focus-card-header">

              <div>

                <span className="card-label">
                  TODAY'S FOCUS
                </span>

                <h2>
                  Your priorities
                </h2>

              </div>

              <div className="task-progress-mini">
                {taskProgress}%
              </div>

            </div>

            <div className="task-progress-line">
              <span
                style={{
                  width: `${taskProgress}%`,
                }}
              />
            </div>

            <div className="focus-task-list">

              {tasks.map((task) => (

                <div
                  className={
                    task.done
                      ? "focus-task done"
                      : "focus-task"
                  }
                  key={task.id}
                >

                  <button
                    className="focus-task-check"
                    onClick={() =>
                      toggleTask(task.id)
                    }
                  >
                    {task.done && (
                      <Check size={13} />
                    )}
                  </button>

                  <span>
                    {task.title}
                  </span>

                  <button
                    className="focus-task-delete"
                    onClick={() =>
                      removeTask(task.id)
                    }
                  >
                    <X size={13} />
                  </button>

                </div>

              ))}

            </div>

            {showTaskInput ? (

              <div className="quick-task-input">

                <input
                  value={newTask}
                  onChange={(e) =>
                    setNewTask(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      addTask();
                  }}
                  placeholder="What do you need to do?"
                  autoFocus
                />

                <button
                  onClick={addTask}
                >
                  <Plus size={16} />
                </button>

              </div>

            ) : (

              <button
                className="add-focus-task"
                onClick={() =>
                  setShowTaskInput(true)
                }
              >
                <Plus size={15} />
                Add priority
              </button>

            )}

          </section>

          {/* NOTES */}

          <section className="focus-notes-card">

            <div className="focus-card-header">

              <div>

                <span className="card-label">
                  QUICK NOTES
                </span>

                <h2>
                  Capture the thought.
                </h2>

              </div>

              <PenLine size={18} />

            </div>

            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              placeholder="Write ideas, reminders or things you want to remember..."
            />

            <div className="notes-footer">
              <span>
                {notes.length} characters
              </span>

              <span>
                Saved locally
              </span>
            </div>

          </section>

        </div>

      </div>

      {/* ================= ATMOSPHERE ================= */}

      <section className="focus-atmosphere">

        <div className="atmosphere-heading">

          <div>

            <span className="eyebrow">
              BUILD YOUR SPACE
            </span>

            <h2>
              Choose your atmosphere.
            </h2>

            <p>
              Make your study environment feel
              exactly right.
            </p>

          </div>

          <button
            className="sound-toggle"
            onClick={toggleMute}
          >
            {muted ? (
              <VolumeX size={17} />
            ) : (
              <Volume2 size={17} />
            )}

            {muted
              ? "Muted"
              : "Sound on"}
          </button>

        </div>

        <div className="atmosphere-grid">

          <button
            className={
              sound === "rain"
                ? "atmosphere-option active"
                : "atmosphere-option"
            }
            onClick={() =>
              selectSound("rain")
            }
          >
            <div className="atmosphere-option-icon">
              <CloudRain size={21} />
            </div>

            <div>
              <strong>
                Rain
              </strong>

              <span>
                Calm & deep
              </span>
            </div>

            {sound === "rain" && (
              <Check size={15} />
            )}
          </button>

          <button
            className={
              sound === "cafe"
                ? "atmosphere-option active"
                : "atmosphere-option"
            }
            onClick={() =>
              selectSound("cafe")
            }
          >
            <div className="atmosphere-option-icon">
              <Coffee size={21} />
            </div>

            <div>
              <strong>
                Café
              </strong>

              <span>
                Soft background
              </span>
            </div>

            {sound === "cafe" && (
              <Check size={15} />
            )}
          </button>

          <button
            className={
              sound === "library"
                ? "atmosphere-option active"
                : "atmosphere-option"
            }
            onClick={() =>
              selectSound("library")
            }
          >
            <div className="atmosphere-option-icon">
              <Library size={21} />
            </div>

            <div>
              <strong>
                Library
              </strong>

              <span>
                Quiet & minimal
              </span>
            </div>

            {sound === "library" && (
              <Check size={15} />
            )}
          </button>

          <button className="atmosphere-option zen">
            <div className="atmosphere-option-icon">
              <Moon size={21} />
            </div>

            <div>
              <strong>
                Zen
              </strong>

              <span>
                Coming soon
              </span>
            </div>

            <Sparkles size={14} />
          </button>

        </div>

        <div className="atmosphere-bottom">

          <div className="sound-status">

            <Music2 size={16} />

            <span>
              {sound === "rain"
                ? "Rain ambience"
                : sound === "cafe"
                ? "Café atmosphere"
                : "Library atmosphere"}
            </span>

            <small>
              {soundPlaying
                ? "Playing"
                : "Ready"}
            </small>

          </div>

          <button
            className="rain-play-button"
            onClick={toggleSound}
            disabled={sound !== "rain"}
          >
            {soundPlaying ? (
              <>
                <Pause size={16} />
                Pause ambience
              </>
            ) : (
              <>
                <Play size={16} />
                Play ambience
              </>
            )}
          </button>

        </div>

      </section>

      {/* ================= INSIGHTS ================= */}

      <div className="focus-insights-grid">

        <section className="focus-insight-card">

          <div className="insight-icon">
            <BarChart3 size={20} />
          </div>

          <span>
            TODAY'S FOCUS
          </span>

          <strong>
            {focusMinutes} min
          </strong>

          <p>
            You're building a stronger
            concentration habit.
          </p>

          <div className="insight-bars">

            {[30, 55, 40, 75, 60, 90, 65].map(
              (height, index) => (
                <span
                  key={index}
                  style={{
                    height: `${height}%`,
                  }}
                />
              )
            )}

          </div>

        </section>

        <section className="focus-insight-card">

          <div className="insight-icon">
            <Trophy size={20} />
          </div>

          <span>
            NEXT ACHIEVEMENT
          </span>

          <strong>
            Focus Master
          </strong>

          <p>
            Complete 5 focus sessions
            today to unlock it.
          </p>

          <div className="achievement-progress">

            <span>
              {sessions}
            </span>

            <div>
              <i
                style={{
                  width: `${Math.min(
                    100,
                    (sessions / 5) * 100
                  )}%`,
                }}
              />
            </div>

            <span>
              5
            </span>

          </div>

        </section>

        <section className="focus-insight-card quote-card">

          <div className="insight-icon">
            <Sparkles size={20} />
          </div>

          <span>
            FOCUS THOUGHT
          </span>

          <p>
            “{quotes[quoteIndex]}”
          </p>

          <button
            onClick={() =>
              setQuoteIndex(
                (quoteIndex + 1) %
                  quotes.length
              )
            }
          >
            New thought
            <ArrowUpRightIcon />
          </button>

        </section>

      </div>

      {/* ================= FOOTER TIP ================= */}

      <section className="focus-final-banner">

        <div className="final-banner-icon">
          <Brain size={23} />
        </div>

        <div>

          <span>
            YOUR FOCUS RULE
          </span>

          <h2>
            One task. One session. No distractions.
          </h2>

          <p>
            Put your phone away, close unnecessary
            tabs and give yourself permission to
            focus on just one thing.
          </p>

        </div>

        <div className="final-banner-stat">
          <strong>
            {completedTasks}
          </strong>

          <span>
            tasks completed
          </span>
        </div>

      </section>

    </div>
  );
}

/* Small reusable arrow icon */

function ArrowUpRightIcon() {
  return (
    <ExternalLink size={13} />
  );
}

export default Focus;