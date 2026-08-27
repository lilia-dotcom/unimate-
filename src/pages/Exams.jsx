import {
  FileText,
  Clock3,
  AlertCircle,
  CheckCircle2,
  Plus,
  Trophy,
  Flame,
  BookOpen,
  Target,
  Sparkles,
  ArrowUpRight,
  X,
  Trash2,
} from "lucide-react";

import { useState } from "react";

const initialExams = [
  {
    id: 1,
    subject: "Software Engineering",
    date: "September 12",
    days: 18,
    type: "Final Exam",
    progress: 68,
    notes: 8,
  },
  {
    id: 2,
    subject: "Mathematics",
    date: "September 18",
    days: 24,
    type: "Midterm",
    progress: 52,
    notes: 5,
  },
  {
    id: 3,
    subject: "Computer Programming",
    date: "September 25",
    days: 31,
    type: "Final Exam",
    progress: 84,
    notes: 11,
  },
];

function Exams() {
  const [exams, setExams] = useState(initialExams);
  const [showModal, setShowModal] = useState(false);

  const [newExam, setNewExam] = useState({
    subject: "",
    date: "",
    type: "Final Exam",
  });

  const overallReadiness =
    exams.length === 0
      ? 0
      : Math.round(
          exams.reduce(
            (sum, exam) => sum + exam.progress,
            0
          ) / exams.length
        );

  const readyExams = exams.filter(
    (exam) => exam.progress >= 75
  ).length;

  const urgentExams = exams.filter(
    (exam) => exam.days <= 20
  ).length;

  const addExam = () => {
    if (!newExam.subject.trim() || !newExam.date) return;

    setExams((prev) => [
      ...prev,
      {
        id: Date.now(),
        subject: newExam.subject.trim(),
        date: newExam.date,
        days: 30,
        type: newExam.type,
        progress: 0,
        notes: 0,
      },
    ]);

    setNewExam({
      subject: "",
      date: "",
      type: "Final Exam",
    });

    setShowModal(false);
  };

  const deleteExam = (id) => {
    setExams((prev) =>
      prev.filter((exam) => exam.id !== id)
    );
  };

  const increaseProgress = (id) => {
    setExams((prev) =>
      prev.map((exam) =>
        exam.id === id
          ? {
              ...exam,
              progress: Math.min(
                100,
                exam.progress + 10
              ),
            }
          : exam
      )
    );
  };

  return (
    <div className="page exams-page">

      {/* HEADER */}

      <header className="page-header">
        <div>
          <span className="eyebrow">
            EXAM CENTER
          </span>

          <h1>My Exams</h1>

          <p>
            Stay prepared, confident and ahead.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowModal(true)}
        >
          <Plus size={17} />
          Add exam
        </button>
      </header>


      {/* HERO */}

      <section className="exam-hero">

        <div className="exam-hero-content">

          <div className="exam-hero-icon">
            <Sparkles size={22} />
          </div>

          <span>YOUR EXAM JOURNEY</span>

          <h2>
            Prepare today.
            <br />
            Feel confident tomorrow.
          </h2>

          <p>
            Keep your exams organized, track your
            preparation and turn stress into a plan.
          </p>

        </div>

        <div className="exam-hero-visual">

          <div className="exam-hero-circle">
            <Trophy size={52} />
          </div>

          <div className="floating-exam-card card-one">
            <BookOpen size={16} />
            <span>Study smarter</span>
          </div>

          <div className="floating-exam-card card-two">
            <CheckCircle2 size={16} />
            <span>Stay prepared</span>
          </div>

        </div>

      </section>


      {/* STATS */}

      <section className="exam-overview">

        <div className="exam-stat-main">
          <div className="exam-stat-icon">
            <Target size={22} />
          </div>

          <div>
            <span>OVERALL READINESS</span>
            <strong>
              {overallReadiness}%
            </strong>
          </div>
        </div>

        <div className="exam-stat">
          <span>UPCOMING</span>
          <strong>{exams.length}</strong>
        </div>

        <div className="exam-stat">
          <span>READY</span>
          <strong>{readyExams}</strong>
        </div>

        <div className="exam-stat">
          <span>NEEDS ATTENTION</span>
          <strong>{urgentExams}</strong>
        </div>

      </section>


      {/* MOTIVATION */}

      <section className="exam-motivation">

        <div className="exam-motivation-icon">
          <Flame size={20} />
        </div>

        <div>
          <span>KEEP GOING</span>

          <p>
            You don't need to study everything today.
            Just make today's progress count.
          </p>
        </div>

      </section>


      {/* TITLE */}

      <section className="exam-section-header">

        <div>
          <span className="eyebrow">
            UPCOMING EXAMS
          </span>

          <h2>
            Your preparation starts here.
          </h2>
        </div>

        <span className="exam-count">
          {exams.length} exams
        </span>

      </section>


      {/* EXAMS */}

      <section className="exam-grid">

        {exams.map((exam) => (

          <article
            className={
              exam.days <= 20
                ? "exam-card urgent"
                : "exam-card"
            }
            key={exam.id}
          >

            <div className="exam-card-top">

              <div className="exam-icon">
                <FileText size={21} />
              </div>

              <span className="exam-type">
                {exam.type}
              </span>

            </div>


            <h3>{exam.subject}</h3>

            <p className="exam-date">
              {exam.date}
            </p>


            <div className="exam-countdown">

              <Clock3 size={18} />

              <strong>
                {exam.days}
              </strong>

              <span>
                days left
              </span>

            </div>


            {/* PROGRESS */}

            <div className="exam-progress-section">

              <div className="exam-progress-header">
                <span>Preparation</span>

                <strong>
                  {exam.progress}%
                </strong>
              </div>

              <div className="exam-progress-bar">
                <div
                  style={{
                    width: `${exam.progress}%`,
                  }}
                />
              </div>

            </div>


            {/* NOTES */}

            <div className="exam-note-row">

              <div>
                <BookOpen size={14} />

                <span>
                  {exam.notes} study notes
                </span>
              </div>

              <button type="button">
                View notes
                <ArrowUpRight size={13} />
              </button>

            </div>


            {/* STATUS */}

            {exam.days <= 20 ? (
              <div className="exam-warning">
                <AlertCircle size={15} />
                Coming soon — keep studying
              </div>
            ) : exam.progress >= 75 ? (
              <div className="exam-ready">
                <CheckCircle2 size={15} />
                You're looking good
              </div>
            ) : (
              <div className="exam-preparing">
                <Clock3 size={15} />
                Keep preparing
              </div>
            )}


            {/* ACTIONS */}

            <div className="exam-actions">

              <button
                type="button"
                onClick={() =>
                  increaseProgress(exam.id)
                }
                disabled={exam.progress >= 100}
              >
                +10% progress
              </button>

              <button
                type="button"
                className="exam-delete"
                onClick={() =>
                  deleteExam(exam.id)
                }
              >
                <Trash2 size={14} />
              </button>

            </div>

          </article>

        ))}

      </section>


      {/* REWARD */}

      <section className="exam-reward">

        <div className="reward-icon">
          <Trophy size={24} />
        </div>

        <div>
          <span>YOUR NEXT REWARD</span>

          <h2>
            Become Exam Ready
          </h2>

          <p>
            Reach 90% preparation across your exams
            and unlock your next achievement.
          </p>
        </div>

        <div className="reward-progress">
          <strong>
            {overallReadiness}%
          </strong>

          <span>/ 90%</span>
        </div>

      </section>


      {/* MODAL */}

      {showModal && (

        <div
          className="exam-modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="exam-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="exam-modal-header">

              <div>
                <span className="card-label">
                  NEW EXAM
                </span>

                <h2>Add an exam</h2>

                <p>
                  Keep your important dates in one place.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
              >
                <X size={18} />
              </button>

            </div>


            <div className="exam-form">

              <label>
                Subject

                <input
                  value={newExam.subject}
                  onChange={(e) =>
                    setNewExam({
                      ...newExam,
                      subject: e.target.value,
                    })
                  }
                  placeholder="e.g. Database Systems"
                  autoFocus
                />
              </label>


              <label>
                Exam date

                <input
                  type="date"
                  value={newExam.date}
                  onChange={(e) =>
                    setNewExam({
                      ...newExam,
                      date: e.target.value,
                    })
                  }
                />
              </label>


              <label>
                Exam type

                <select
                  value={newExam.type}
                  onChange={(e) =>
                    setNewExam({
                      ...newExam,
                      type: e.target.value,
                    })
                  }
                >
                  <option>Final Exam</option>
                  <option>Midterm</option>
                  <option>Quiz</option>
                  <option>Project</option>
                </select>
              </label>

            </div>


            <div className="exam-modal-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={addExam}
                disabled={
                  !newExam.subject.trim() ||
                  !newExam.date
                }
              >
                <Plus size={16} />
                Add exam
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Exams;