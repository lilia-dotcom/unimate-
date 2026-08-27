import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Clock3,
  Users,
  ArrowUpRight,
  Plus,
  X,
  Search,
} from "lucide-react";

const defaultCourses = [
  {
    id: 1,
    name: "Software Engineering",
    code: "SWE101",
    professor: "Dr. Ahmed",
    hours: "3h / week",
    progress: 72,
    mode: "community",
    university: "My University",
  },
  {
    id: 2,
    name: "Mathematics",
    code: "MATH101",
    professor: "Dr. Sarah",
    hours: "4h / week",
    progress: 48,
    mode: "private",
    university: "My University",
  },
  {
    id: 3,
    name: "Computer Programming",
    code: "CS101",
    professor: "Dr. Karim",
    hours: "5h / week",
    progress: 85,
    mode: "community",
    university: "My University",
  },
];

function Courses() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("unimate_courses");

    return saved ? JSON.parse(saved) : defaultCourses;
  });

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    university: "",
    name: "",
    code: "",
    professor: "",
    hours: "",
    mode: "private",
  });

  useEffect(() => {
    localStorage.setItem(
      "unimate_courses",
      JSON.stringify(courses)
    );
  }, [courses]);

  const filteredCourses = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return courses;
    }

    return courses.filter((course) =>
      `${course.name} ${course.code} ${course.professor}`
        .toLowerCase()
        .includes(value)
    );
  }, [courses, search]);

  const weeklyHours = courses.reduce((total, course) => {
    const number = parseFloat(course.hours);

    return total + (Number.isNaN(number) ? 0 : number);
  }, 0);

  const averageProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce(
            (total, course) => total + course.progress,
            0
          ) / courses.length
        )
      : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();

    if (!form.university || !form.name || !form.code) {
      return;
    }

    const newCourse = {
      id: Date.now(),
      university: form.university,
      name: form.name,
      code: form.code.toUpperCase(),
      professor: form.professor || "Professor not added",
      hours: form.hours
        ? `${form.hours}h / week`
        : "0h / week",
      progress: 0,
      mode: form.mode,
    };

    setCourses((previous) => [
      ...previous,
      newCourse,
    ]);

    setForm({
      university: "",
      name: "",
      code: "",
      professor: "",
      hours: "",
      mode: "private",
    });

    setIsModalOpen(false);
  };

  return (
    <div className="page courses-page">

      {/* HEADER */}

      <div className="page-header courses-header">

        <div>
          <span className="eyebrow">
            ACADEMIC SPACE
          </span>

          <h1>My Courses</h1>

          <p>
            Everything you're learning, all in one place.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} />
          Add course
        </button>

      </div>


      {/* SEARCH */}

      <div className="course-search">

        <Search size={17} />

        <input
          type="text"
          placeholder="Search your courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>


      {/* SUMMARY */}

      <div className="course-summary">

        <div className="course-summary-card">

          <span>
            ACTIVE COURSES
          </span>

          <strong>
            {courses.length}
          </strong>

          <small>
            This semester
          </small>

        </div>


        <div className="course-summary-card">

          <span>
            WEEKLY HOURS
          </span>

          <strong>
            {weeklyHours}h
          </strong>

          <small>
            Study load
          </small>

        </div>


        <div className="course-summary-card">

          <span>
            AVERAGE PROGRESS
          </span>

          <strong>
            {averageProgress}%
          </strong>

          <small>
            Across all courses
          </small>

        </div>

      </div>


      {/* COURSES */}

      {filteredCourses.length === 0 ? (

        <div className="empty-courses">

          <BookOpen size={32} />

          <h2>
            No courses found
          </h2>

          <p>
            Try another search or add your first course.
          </p>

          <button
            className="primary-button"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} />
            Add course
          </button>

        </div>

      ) : (

        <div className="courses-grid">

          {filteredCourses.map((course, index) => (

            <div
              className={`premium-course-card course-color-${index % 3}`}
              key={course.id}
            >

              <div className="course-top">

                <div className="course-icon-large">
                  <BookOpen size={22} />
                </div>

                <button
                  className="course-arrow"
                  onClick={() =>
                    navigate(`/courses/${course.id}`)
                  }
                >
                  <ArrowUpRight size={17} />
                </button>

              </div>


              <div className="course-code">
                {course.code}
              </div>

              <h2>
                {course.name}
              </h2>

              <p className="course-professor">
                {course.professor}
              </p>


              <div className="course-meta">

                <span>
                  <Clock3 size={14} />
                  {course.hours}
                </span>

                <span>

                  {course.mode === "community" ? (
                    <>
                      <Users size={14} />
                      Community
                    </>
                  ) : (
                    <>
                      🔒 Private
                    </>
                  )}

                </span>

              </div>


              <div className="course-progress">

                <div className="course-progress-header">

                  <span>
                    Your progress
                  </span>

                  <strong>
                    {course.progress}%
                  </strong>

                </div>

                <div className="progress-bar">

                  <div
                    style={{
                      width: `${course.progress}%`,
                    }}
                  />

                </div>

              </div>


              {/* OPEN COURSE */}

              <button
                className="view-course-button"
                onClick={() =>
                  navigate(`/courses/${course.id}`)
                }
              >

                {course.mode === "community"
                  ? "Open course community"
                  : "Continue learning"}

                <ArrowUpRight size={15} />

              </button>

            </div>

          ))}

        </div>

      )}


      {/* ADD COURSE MODAL */}

      {isModalOpen && (

        <div
          className="course-modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >

          <div
            className="course-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>

                <span className="eyebrow">
                  NEW COURSE
                </span>

                <h2>
                  Add a course
                </h2>

                <p>
                  Create your study space.
                </p>

              </div>

              <button
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={19} />
              </button>

            </div>


            <form onSubmit={handleAddCourse}>

              {/* UNIVERSITY */}

              <div className="modal-field">

                <label>
                  University
                </label>

                <input
                  name="university"
                  value={form.university}
                  onChange={handleChange}
                  placeholder="e.g. Bahçeşehir University"
                  required
                />

              </div>


              {/* COURSE NAME + CODE */}

              <div className="modal-row">

                <div className="modal-field">

                  <label>
                    Course name
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineering"
                    required
                  />

                </div>


                <div className="modal-field">

                  <label>
                    Course code
                  </label>

                  <input
                    name="code"
                    value={form.code}
                    onChange={handleChange}
                    placeholder="SWE101"
                    required
                  />

                </div>

              </div>


              {/* PROFESSOR + HOURS */}

              <div className="modal-row">

                <div className="modal-field">

                  <label>
                    Professor
                  </label>

                  <input
                    name="professor"
                    value={form.professor}
                    onChange={handleChange}
                    placeholder="Professor name"
                  />

                </div>


                <div className="modal-field">

                  <label>
                    Weekly hours
                  </label>

                  <input
                    name="hours"
                    type="number"
                    min="0"
                    value={form.hours}
                    onChange={handleChange}
                    placeholder="3"
                  />

                </div>

              </div>


              {/* STUDY MODE */}

              <div className="study-mode-section">

                <label className="study-mode-label">
                  How do you want to study?
                </label>


                <div className="study-mode-options">

                  {/* PRIVATE */}

                  <label
                    className={`study-mode-card ${
                      form.mode === "private"
                        ? "selected"
                        : ""
                    }`}
                  >

                    <input
                      type="radio"
                      name="mode"
                      value="private"
                      checked={
                        form.mode === "private"
                      }
                      onChange={handleChange}
                    />

                    <div>

                      <strong>
                        🔒 Study privately
                      </strong>

                      <span>
                        Keep your course space personal.
                      </span>

                    </div>

                  </label>


                  {/* COMMUNITY */}

                  <label
                    className={`study-mode-card ${
                      form.mode === "community"
                        ? "selected"
                        : ""
                    }`}
                  >

                    <input
                      type="radio"
                      name="mode"
                      value="community"
                      checked={
                        form.mode === "community"
                      }
                      onChange={handleChange}
                    />

                    <div>

                      <strong>
                        👥 Join community
                      </strong>

                      <span>
                        Study with students taking this course.
                      </span>

                    </div>

                  </label>

                </div>

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                className="auth-button modal-submit"
              >

                Add course

                <ArrowUpRight size={17} />

              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Courses;