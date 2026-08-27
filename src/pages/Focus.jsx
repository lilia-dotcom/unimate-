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
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

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

  const [sound, setSound] = useState("rain");
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  /* TIMER */

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((previous) => {
        if (previous <= 1) {
          setIsRunning(false);

          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setSoundPlaying(false);
          }

          if (mode === "focus") {
            setSessions((value) => value + 1);
          }

          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  /* RAIN PLAY / PAUSE */

  const toggleSound = async () => {
    if (!audioRef.current) return;

    if (soundPlaying) {
      audioRef.current.pause();
      setSoundPlaying(false);
      return;
    }

    if (sound === "rain") {
      audioRef.current.volume = muted ? 0 : 0.35;

      try {
        await audioRef.current.play();
        setSoundPlaying(true);
      } catch (error) {
        console.error("Audio error:", error);
      }
    }
  };

  /* FOCUS */

  const toggleFocus = async () => {
    if (isRunning) {
      setIsRunning(false);

      if (audioRef.current) {
        audioRef.current.pause();
        setSoundPlaying(false);
      }

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
        console.error("Audio error:", error);
      }
    }
  };

  /* MODE */

  const changeMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setSoundPlaying(false);
    }

    setSeconds(durations[newMode]);
  };

  /* RESET */

  const resetTimer = () => {
    setIsRunning(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setSoundPlaying(false);
    }

    setSeconds(durations[mode]);
  };

  /* SKIP */

  const skipSession = () => {
    if (mode === "focus") {
      changeMode("short");
    } else {
      changeMode("focus");
    }
  };

  /* MUTE */

  const toggleMute = () => {
    setMuted((previous) => {
      const newMuted = !previous;

      if (audioRef.current) {
        audioRef.current.volume = newMuted
          ? 0
          : 0.35;
      }

      return newMuted;
    });
  };

  /* SOUND SELECT */

  const selectSound = (newSound) => {
    setSound(newSound);

    if (newSound !== "rain") {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      setSoundPlaying(false);
    }
  };

  /* TIME */

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

  return (
    <div className="page focus-page">

      {/* AUDIO */}

      <audio
        ref={audioRef}
        src="/sounds/rain.mp3"
        loop
        preload="auto"
      />

      {/* HEADER */}

      <div className="page-header">

        <div>
          <span className="eyebrow">
            DEEP WORK
          </span>

          <h1>Focus Mode</h1>

          <p>
            Create your little study space and
            get things done.
          </p>
        </div>

        <div className="focus-streak">
          <Flame size={17} />
          <span>
            {sessions} sessions today
          </span>
        </div>

      </div>

      {/* MODES */}

      <div className="focus-modes">

        <button
          className={
            mode === "focus"
              ? "focus-mode active"
              : "focus-mode"
          }
          onClick={() => changeMode("focus")}
        >
          <Timer size={16} />
          Focus
          <span>25 min</span>
        </button>

        <button
          className={
            mode === "short"
              ? "focus-mode active"
              : "focus-mode"
          }
          onClick={() => changeMode("short")}
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
          onClick={() => changeMode("long")}
        >
          <Coffee size={16} />
          Long break
          <span>15 min</span>
        </button>

      </div>

      {/* MAIN */}

      <div className="focus-layout">

        {/* TIMER */}

        <section
          className={
            isRunning
              ? "focus-timer-card running"
              : "focus-timer-card"
          }
        >

          <div className="focus-orbit orbit-one" />
          <div className="focus-orbit orbit-two" />

          <div
            className="timer-ring"
            style={{
              "--progress": `${progress}%`,
            }}
          >

            <div className="timer-inner">

              <Timer size={23} />

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
                  Pause
                </>
              ) : (
                <>
                  <Play size={17} />
                  Start Focus
                </>
              )}
            </button>

            <button
              className="secondary-button"
              onClick={resetTimer}
            >
              <RotateCcw size={17} />
            </button>

            <button
              className="secondary-button"
              onClick={skipSession}
            >
              <SkipForward size={17} />
            </button>

          </div>

          <div className="focus-session-label">
            {isRunning
              ? "Stay focused. You've got this. ✨"
              : "Ready when you are. 💜"}
          </div>

        </section>

        {/* STUDY CARD */}

        <section className="study-card">

          <div className="study-card-header">

            <div>
              <span className="card-label">
                STUDY WITH ME
              </span>

              <h2>
                Your study atmosphere
              </h2>
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
            </button>

          </div>

          {/* SIMPLE VIDEO */}

          <div className="study-video">

            <div className="video-content">

              <div className="video-play">
                <Play size={22} />
              </div>

              <strong>
                Study With Me
              </strong>

              <span>
                Quiet study session
              </span>

              <a
                href="https://www.youtube.com/results?search_query=study+with+me+pomodoro"
                target="_blank"
                rel="noopener noreferrer"
                className="video-button"
              >
                Watch on YouTube
                <ExternalLink size={14} />
              </a>

            </div>

          </div>

          {/* AMBIENCE */}

          <div className="ambience">

            <span className="card-label">
              AMBIENCE
            </span>

            <div className="ambience-options">

              <button
                className={
                  sound === "rain"
                    ? "ambience-button active"
                    : "ambience-button"
                }
                onClick={() => selectSound("rain")}
              >
                <CloudRain size={16} />
                Rain
              </button>

              <button
                className={
                  sound === "cafe"
                    ? "ambience-button active"
                    : "ambience-button"
                }
                onClick={() => selectSound("cafe")}
              >
                <Coffee size={16} />
                Café
              </button>

              <button
                className={
                  sound === "library"
                    ? "ambience-button active"
                    : "ambience-button"
                }
                onClick={() => selectSound("library")}
              >
                <Library size={16} />
                Library
              </button>

            </div>

            {/* REAL SOUND BUTTON */}

            <button
              className="rain-play-button"
              onClick={toggleSound}
              disabled={sound !== "rain"}
            >
              {soundPlaying ? (
                <>
                  <Pause size={17} />
                  Pause Rain
                </>
              ) : (
                <>
                  <Play size={17} />
                  Play Rain
                </>
              )}
            </button>

            <p className="sound-note">
              {sound === "rain"
                ? "🌧️ Relaxing rain for deeper focus."
                : sound === "cafe"
                ? "☕ Café ambience coming soon."
                : "📚 Library ambience coming soon."}
            </p>

          </div>

        </section>

      </div>

      {/* STATS */}

      <div className="focus-bottom">

        <div className="focus-stat-card">

          <div className="focus-stat-icon">
            <Timer size={18} />
          </div>

          <div>
            <strong>75 min</strong>
            <span>Focused today</span>
          </div>

        </div>

        <div className="focus-stat-card">

          <div className="focus-stat-icon">
            <Flame size={18} />
          </div>

          <div>
            <strong>{sessions}</strong>
            <span>Sessions today</span>
          </div>

        </div>

        <div className="focus-stat-card">

          <div className="focus-stat-icon">
            <CheckCircle2 size={18} />
          </div>

          <div>
            <strong>12</strong>
            <span>Sessions this week</span>
          </div>

        </div>

        <div className="focus-quote">

          <span>FOCUS TIP</span>

          <p>
            Put your phone away, choose one task,
            and give it your full attention.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Focus;