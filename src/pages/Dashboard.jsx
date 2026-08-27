import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock3,
  Target,
  CheckCircle2,
  Sparkles,
  CalendarDays,
  ArrowRight,
  Brain,
  FileText,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

import { supabase } from "../lib/supabase";

function Dashboard() {
  const [profile, setProfile] = useState({
    name: "Student",
    department: "University Student",
    university: "",
    year: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const saved = localStorage.getItem("unimate_onboarding");
        const onboarding = saved ? JSON.parse(saved) : {};

        const {
          data: { user },
        } = await supabase.auth.getUser();

        const name =
          user?.user_metadata?.full_name ||
          user?.user_metadata?.name ||
          "Student";

        setProfile({
          name,
          department:
            onboarding.department || "University Student",
          university:
            onboarding.university || "",
          year: onboarding.year || "",
        });
      } catch (error) {
        console.log("Profile loading:", error);

        const saved = localStorage.getItem("unimate_onboarding");

        if (saved) {
          const onboarding = JSON.parse(saved);

          setProfile((prev) => ({
            ...prev,
            department:
              onboarding.department || prev.department,
            university:
              onboarding.university || "",
            year:
              onboarding.year || "",
          }));
        }
      }
    };

    loadProfile();
  }, []);

  return (
    <div className="dashboard-page">

      {/* ================= HEADER ================= */}

      <header className="dashboard-header">

        <div className="dashboard-header-left">

          <span className="dashboard-eyebrow">
            UNIMATE STUDENT HUB
          </span>

          <h1>
            Welcome back,{" "}
            <span>{profile.name}</span> 👋
          </h1>

          <p>
            Let's make today productive and closer to your goals.
          </p>

        </div>

        <div className="dashboard-profile">

          <div className="dashboard-avatar">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          <div className="dashboard-profile-info">
            <strong>{profile.name}</strong>
            <small>{profile.department}</small>
          </div>

        </div>

      </header>


      {/* ================= HERO ================= */}

      <section className="dashboard-hero">

        <div className="dashboard-hero-content">

          <span className="dashboard-card-label">
            YOUR ACADEMIC SPACE
          </span>

          <h2>
            Study smarter.
            <br />
            Stay <span>organized.</span>
          </h2>

          <p>
            Track your courses, access resources and use AI
            to make studying easier.
          </p>

          <Link
            to="/courses"
            className="dashboard-primary-button"
          >
            Explore my courses
            <ArrowRight size={17} />
          </Link>

        </div>


        <div className="dashboard-hero-visual">

          <div className="hero-glow"></div>

          <div className="hero-circle">

            <GraduationCap size={72} />

          </div>

          <div className="hero-floating-icon hero-icon-one">
            <BookOpen size={20} />
          </div>

          <div className="hero-floating-icon hero-icon-two">
            <Sparkles size={20} />
          </div>

          <div className="hero-floating-icon hero-icon-three">
            <Brain size={20} />
          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="dashboard-stats">

        <div className="dashboard-stat-card">

          <div className="stat-icon purple">
            <BookOpen size={21} />
          </div>

          <div>
            <span>ACTIVE COURSES</span>
            <strong>6</strong>
            <small>This semester</small>
          </div>

          <TrendingUp className="stat-trend" size={19} />

        </div>


        <div className="dashboard-stat-card">

          <div className="stat-icon blue">
            <Clock3 size={21} />
          </div>

          <div>
            <span>STUDY HOURS</span>
            <strong>24h</strong>
            <small>This week</small>
          </div>

          <TrendingUp className="stat-trend" size={19} />

        </div>


        <div className="dashboard-stat-card">

          <div className="stat-icon pink">
            <Target size={21} />
          </div>

          <div>
            <span>GOALS PROGRESS</span>
            <strong>65%</strong>
            <small>Overall progress</small>
          </div>

          <TrendingUp className="stat-trend" size={19} />

        </div>


        <div className="dashboard-stat-card">

          <div className="stat-icon green">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>TASKS COMPLETED</span>
            <strong>18</strong>
            <small>This week</small>
          </div>

          <TrendingUp className="stat-trend" size={19} />

        </div>

      </section>


      {/* ================= MAIN GRID ================= */}

      <section className="dashboard-main-grid">

        {/* COURSES */}

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>
              <span className="panel-icon">
                <BookOpen size={17} />
              </span>

              <div>
                <span className="panel-label">
                  YOUR COURSES
                </span>

                <h3>
                  Continue studying
                </h3>
              </div>
            </div>

            <Link to="/courses">
              View all →
            </Link>

          </div>


          <div className="course-progress-list">

            <Link
              to="/courses"
              className="course-progress-item"
            >

              <div className="course-color purple-course">
                ∑
              </div>

              <div className="course-info">
                <strong>Mathematics</strong>
                <small>Continue Chapter 4</small>

                <div className="progress-bar">
                  <span style={{ width: "72%" }} />
                </div>
              </div>

              <strong className="course-percent">
                72%
              </strong>

            </Link>


            <Link
              to="/courses"
              className="course-progress-item"
            >

              <div className="course-color blue-course">
                &lt;/&gt;
              </div>

              <div className="course-info">
                <strong>Programming</strong>
                <small>Data Structures</small>

                <div className="progress-bar">
                  <span style={{ width: "58%" }} />
                </div>
              </div>

              <strong className="course-percent">
                58%
              </strong>

            </Link>


            <Link
              to="/courses"
              className="course-progress-item"
            >

              <div className="course-color pink-course">
                ⚛
              </div>

              <div className="course-info">
                <strong>Physics</strong>
                <small>Chapter 3 · Motion</small>

                <div className="progress-bar">
                  <span style={{ width: "41%" }} />
                </div>
              </div>

              <strong className="course-percent">
                41%
              </strong>

            </Link>

          </div>

        </div>


        {/* TODAY */}

        <div className="dashboard-panel">

          <div className="dashboard-panel-header">

            <div>
              <span className="panel-icon">
                <CalendarDays size={17} />
              </span>

              <div>
                <span className="panel-label">
                  TODAY
                </span>

                <h3>
                  Today's schedule
                </h3>
              </div>
            </div>

            <Link to="/planner">
              Planner →
            </Link>

          </div>


          <div className="schedule-list">

            <div className="schedule-item">

              <span className="schedule-time purple-time">
                09:00
              </span>

              <div className="schedule-line">
                <span />
              </div>

              <div className="schedule-info">
                <strong>Mathematics</strong>
                <small>Chapter 4</small>
              </div>

              <CheckCircle2
                size={20}
                className="schedule-check done"
              />

            </div>


            <div className="schedule-item">

              <span className="schedule-time blue-time">
                13:00
              </span>

              <div className="schedule-line">
                <span />
              </div>

              <div className="schedule-info">
                <strong>Programming</strong>
                <small>Practice</small>
              </div>

              <span className="empty-check" />

            </div>


            <div className="schedule-item">

              <span className="schedule-time pink-time">
                17:00
              </span>

              <div className="schedule-line">
                <span />
              </div>

              <div className="schedule-info">
                <strong>Physics</strong>
                <small>Revision</small>
              </div>

              <span className="empty-check" />

            </div>

          </div>

        </div>

      </section>


      {/* ================= QUICK ACTIONS ================= */}

      <section className="dashboard-actions">

        <Link to="/focus" className="dashboard-action-card">

          <div className="action-icon purple">
            <Clock3 size={20} />
          </div>

          <div>
            <strong>Focus Mode</strong>
            <small>Start a deep focus session</small>
          </div>

          <ArrowRight size={18} />

        </Link>


        <Link to="/course-ai" className="dashboard-action-card">

          <div className="action-icon blue">
            <Sparkles size={20} />
          </div>

          <div>
            <strong>AI Assistant</strong>
            <small>Ask anything about your studies</small>
          </div>

          <ArrowRight size={18} />

        </Link>


        <Link to="/exams" className="dashboard-action-card">

          <div className="action-icon pink">
            <FileText size={20} />
          </div>

          <div>
            <strong>Upcoming Exams</strong>
            <small>Check your exam schedule</small>
          </div>

          <ArrowRight size={18} />

        </Link>


        <Link to="/goals" className="dashboard-action-card">

          <div className="action-icon green">
            <Target size={20} />
          </div>

          <div>
            <strong>My Goals</strong>
            <small>Track your academic goals</small>
          </div>

          <ArrowRight size={18} />

        </Link>

      </section>

    </div>
  );
}

export default Dashboard;