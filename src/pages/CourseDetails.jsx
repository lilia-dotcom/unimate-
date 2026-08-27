import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Brain,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Flame,
  Play,
  Target,
  Users,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

const courses = {
  1: {
    name: "Software Engineering",
    code: "SWE101",
    professor: "Dr. Ahmed",
    university: "My University",
    progress: 72,
    students: 128,
    nextClass: "Tomorrow · 11:00",
    studiedHours: 18,
    weeklyHours: 3,
    streak: 6,
    chaptersCompleted: 8,
    totalChapters: 11,
    nextTopic: "Object-Oriented Programming",
    nextTopicDetails: "Chapter 4 · 42 min",
  },

  2: {
    name: "Mathematics",
    code: "MATH101",
    professor: "Dr. Sarah",
    university: "My University",
    progress: 48,
    students: 96,
    nextClass: "Wednesday · 09:00",
    studiedHours: 12,
    weeklyHours: 4,
    streak: 3,
    chaptersCompleted: 5,
    totalChapters: 10,
    nextTopic: "Differential Equations",
    nextTopicDetails: "Chapter 6 · 50 min",
  },

  3: {
    name: "Computer Programming",
    code: "CS101",
    professor: "Dr. Karim",
    university: "My University",
    progress: 85,
    students: 154,
    nextClass: "Thursday · 14:00",
    studiedHours: 24,
    weeklyHours: 5,
    streak: 9,
    chaptersCompleted: 10,
    totalChapters: 12,
    nextTopic: "Data Structures",
    nextTopicDetails: "Chapter 11 · 55 min",
  },
};

function CourseDetails() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const course = courses[courseId] || courses[1];

  const openAI = () => {
    navigate(`/courses/${courseId}/ai`);
  };

  const openResources = () => {
    navigate(`/courses/${courseId}/resources`);
  };

  const openGoals = () => {
    navigate(`/courses/${courseId}/goals`);
  };

  const openCommunity = () => {
    navigate(`/courses/${courseId}/community`);
  };

  return (
    <div className="page course-workspace">

      {/* BACK */}

      <button
        className="back-button"
        onClick={() => navigate("/courses")}
      >
        <ArrowLeft size={17} />
        Back to courses
      </button>


      {/* HERO */}

      <section className="course-workspace-hero">

        <div className="course-workspace-main">

          <div className="course-workspace-icon">
            <BookOpen size={30} />
          </div>

          <div>

            <span className="eyebrow">
              {course.code}
            </span>

            <h1>
              {course.name}
            </h1>

            <p>
              {course.professor} · {course.university}
            </p>

          </div>

        </div>


        {/* AI BUTTON */}

        <button
          className="primary-button"
          onClick={openAI}
        >
          <Brain size={17} />
          Study with AI
        </button>

      </section>


      {/* STATS */}

      <section className="course-workspace-stats">

        <div>
          <span>YOUR PROGRESS</span>

          <strong>
            {course.progress}%
          </strong>

          <small>
            Overall course
          </small>
        </div>


        <div>
          <span>STUDIED</span>

          <strong>
            {course.studiedHours}h
          </strong>

          <small>
            This semester
          </small>
        </div>


        <div>
          <span>STUDENTS</span>

          <strong>
            {course.students}
          </strong>

          <small>
            In this course
          </small>
        </div>


        <div>
          <span>STREAK</span>

          <strong>
            {course.streak} days
          </strong>

          <small>
            Keep it going 🔥
          </small>
        </div>

      </section>


      {/* PROGRESS */}

      <section className="course-progress-panel">

        <div className="panel-heading">

          <div>

            <span className="card-label">
              YOUR LEARNING
            </span>

            <h2>
              {course.chaptersCompleted} of{" "}
              {course.totalChapters} chapters completed
            </h2>

          </div>

          <strong>
            {course.progress}%
          </strong>

        </div>


        <div className="big-progress-bar">

          <div
            style={{
              width: `${course.progress}%`,
            }}
          />

        </div>

      </section>


      {/* NEXT UP */}

      <section className="next-learning-card">

        <div className="next-learning-icon">
          <Play size={22} />
        </div>

        <div className="next-learning-content">

          <span className="card-label">
            NEXT UP
          </span>

          <h2>
            {course.nextTopic}
          </h2>

          <p>
            {course.nextTopicDetails}
          </p>

        </div>


        <button
          className="primary-button"
          onClick={openAI}
        >
          Continue learning
          <ArrowUpRight size={16} />
        </button>

      </section>


      {/* STUDY SPACE */}

      <section>

        <div className="section-title">

          <div>

            <span className="card-label">
              STUDY SPACE
            </span>

            <h2>
              Everything you need
            </h2>

            <p>
              Your complete workspace for this course.
            </p>

          </div>

        </div>


        <div className="course-tools-grid">


          {/* RESOURCES */}

          <button
            className="course-tool-card"
            onClick={openResources}
          >

            <div className="tool-icon">
              <FileText size={22} />
            </div>

            <div>

              <span className="tool-label">
                MATERIALS
              </span>

              <h3>
                Resources
              </h3>

              <p>
                Lectures, PDFs and useful links
              </p>

            </div>

            <ArrowUpRight size={17} />

          </button>


          {/* GOALS */}

          <button
            className="course-tool-card"
            onClick={openGoals}
          >

            <div className="tool-icon">
              <Target size={22} />
            </div>

            <div>

              <span className="tool-label">
                PROGRESS
              </span>

              <h3>
                Course Goals
              </h3>

              <p>
                Track milestones and deadlines
              </p>

            </div>

            <ArrowUpRight size={17} />

          </button>


          {/* COMMUNITY */}

          <button
            className="course-tool-card"
            onClick={openCommunity}
          >

            <div className="tool-icon">
              <Users size={22} />
            </div>

            <div>

              <span className="tool-label">
                STUDENTS
              </span>

              <h3>
                Community
              </h3>

              <p>
                Learn with other students
              </p>

            </div>

            <ArrowUpRight size={17} />

          </button>


          {/* AI */}

          <button
            className="course-tool-card"
            onClick={openAI}
          >

            <div className="tool-icon">
              <Brain size={22} />
            </div>

            <div>

              <span className="tool-label">
                POWERED BY AI
              </span>

              <h3>
                AI Study Assistant
              </h3>

              <p>
                Explain, summarize and quiz
              </p>

            </div>

            <ArrowUpRight size={17} />

          </button>

        </div>

      </section>


      {/* BOTTOM GRID */}

      <section className="course-bottom-grid">


        {/* ACTIVITY */}

        <div className="workspace-panel">

          <div className="workspace-panel-header">

            <div>

              <span className="card-label">
                ACTIVITY
              </span>

              <h2>
                Recent activity
              </h2>

            </div>

          </div>


          <div className="activity-item">

            <CheckCircle2 size={20} />

            <div>

              <strong>
                Completed a study session
              </strong>

              <span>
                45 minutes ago
              </span>

            </div>

          </div>


          <div className="activity-item">

            <FileText size={20} />

            <div>

              <strong>
                New resource added
              </strong>

              <span>
                Yesterday
              </span>

            </div>

          </div>


          <div className="activity-item">

            <Users size={20} />

            <div>

              <strong>
                Joined course community
              </strong>

              <span>
                2 days ago
              </span>

            </div>

          </div>

        </div>


        {/* UPCOMING */}

        <div className="workspace-panel">

          <span className="card-label">
            UPCOMING
          </span>

          <h2>
            Stay on track
          </h2>


          <div className="activity-item">

            <CalendarDays size={19} />

            <div>

              <strong>
                Next class
              </strong>

              <span>
                {course.nextClass}
              </span>

            </div>

          </div>


          <div className="activity-item">

            <Flame size={19} />

            <div>

              <strong>
                Current streak
              </strong>

              <span>
                {course.streak} consecutive days
              </span>

            </div>

          </div>


          <div className="activity-item">

            <Clock3 size={19} />

            <div>

              <strong>
                Weekly target
              </strong>

              <span>
                {course.weeklyHours} hours
              </span>

            </div>

          </div>

        </div>


        {/* NEXT STEP */}

        <div className="workspace-panel next-study-panel">

          <span className="card-label">
            YOUR NEXT STEP
          </span>

          <h2>
            Make progress today.
          </h2>

          <p>
            Continue with{" "}
            <strong>
              {course.nextTopic}
            </strong>{" "}
            and keep your streak alive.
          </p>


          <button
            className="primary-button"
            onClick={openAI}
          >
            <Clock3 size={16} />
            Start study session
          </button>

        </div>

      </section>

    </div>
  );
}

export default CourseDetails;