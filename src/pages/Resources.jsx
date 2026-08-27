import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Bookmark,
  FileText,
  Link2,
  Plus,
  Search,
  Sparkles,
  Star,
  Video,
  X,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";


const courses = {
  1: {
    name: "Software Engineering",
    code: "SWE101",
  },

  2: {
    name: "Mathematics",
    code: "MATH101",
  },

  3: {
    name: "Computer Programming",
    code: "CS101",
  },
};


const defaultResources = {
  1: [
    {
      id: 1,
      title:
        "Software Engineering Fundamentals",
      description:
        "Introduction to software engineering concepts.",
      type: "Lecture",
      meta: "Lecture 01",
      saved: true,
    },

    {
      id: 2,
      title:
        "Requirements Engineering",
      description:
        "Functional and non-functional requirements.",
      type: "PDF",
      meta: "PDF · 24 pages",
      saved: false,
    },

    {
      id: 3,
      title:
        "Agile & Scrum Explained",
      description:
        "A practical introduction to Agile methodology.",
      type: "Video",
      meta: "Video · 18 min",
      saved: false,
    },

    {
      id: 4,
      title:
        "UML Diagrams Guide",
      description:
        "Useful reference for UML diagrams.",
      type: "Link",
      meta: "External resource",
      saved: true,
    },
  ],

  2: [
    {
      id: 5,
      title:
        "Limits & Continuity",
      description:
        "Core concepts and solved examples.",
      type: "Lecture",
      meta: "Lecture 03",
      saved: true,
    },

    {
      id: 6,
      title:
        "Derivatives Summary",
      description:
        "Important derivative rules and formulas.",
      type: "PDF",
      meta: "PDF · 18 pages",
      saved: false,
    },
  ],

  3: [
    {
      id: 7,
      title:
        "Programming Fundamentals",
      description:
        "Variables, conditions and loops.",
      type: "Lecture",
      meta: "Lecture 01",
      saved: true,
    },

    {
      id: 8,
      title:
        "Data Structures",
      description:
        "Arrays, stacks and queues.",
      type: "PDF",
      meta: "PDF · 32 pages",
      saved: false,
    },
  ],
};


/* =========================================================
   MOTIVATION
========================================================= */

const motivationCards = [
  {
    quote:
      "Small progress is still progress.",
    label:
      "TODAY'S REMINDER",
    number:
      "01",
  },

  {
    quote:
      "Your future self is watching what you do today.",
    label:
      "KEEP GOING",
    number:
      "02",
  },

  {
    quote:
      "Focus on the next step, not the whole staircase.",
    label:
      "STAY FOCUSED",
    number:
      "03",
  },

  {
    quote:
      "You don't need to be perfect. You just need to start.",
    label:
      "ONE STEP",
    number:
      "04",
  },
];


/* =========================================================
   LIBRARY
========================================================= */

const libraryItems = [
  {
    title:
      "Lecture Notes",
    description:
      "Organize your course notes and important concepts.",
    type:
      "NOTES",
    icon:
      <BookOpen size={21} />,
  },

  {
    title:
      "Study Documents",
    description:
      "Keep PDFs, summaries and useful documents together.",
    type:
      "DOCUMENTS",
    icon:
      <FileText size={21} />,
  },

  {
    title:
      "Video Library",
    description:
      "Save helpful lectures and educational videos.",
    type:
      "VIDEOS",
    icon:
      <Video size={21} />,
  },

  {
    title:
      "Useful Links",
    description:
      "Your favorite websites and external study resources.",
    type:
      "LINKS",
    icon:
      <Link2 size={21} />,
  },
];


function Resources() {

  const navigate = useNavigate();

  const { courseId } = useParams();

  const course =
    courses[courseId] || courses[1];


  const [resources, setResources] =
    useState(() => {

      const saved =
        localStorage.getItem(
          `unimate_resources_${courseId}`
        );

      if (saved) {
        return JSON.parse(saved);
      }

      return (
        defaultResources[courseId] ||
        []
      );
    });


  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const [modal, setModal] =
    useState(false);


  const [form, setForm] =
    useState({
      title: "",
      description: "",
      type: "Lecture",
      meta: "",
    });


  const updateResources = (
    updated
  ) => {

    setResources(updated);

    localStorage.setItem(
      `unimate_resources_${courseId}`,
      JSON.stringify(updated)
    );
  };


  const filtered =
    useMemo(() => {

      const query =
        search
          .toLowerCase()
          .trim();

      return resources.filter(
        (resource) => {

          const matchesSearch =
            !query ||
            `${resource.title} ${resource.description} ${resource.type}`
              .toLowerCase()
              .includes(query);

          const matchesFilter =
            filter === "All" ||
            resource.type === filter;

          return (
            matchesSearch &&
            matchesFilter
          );
        }
      );

    }, [
      resources,
      search,
      filter,
    ]);


  const addResource = (e) => {

    e.preventDefault();

    if (!form.title.trim()) {
      return;
    }


    const resource = {

      id: Date.now(),

      title:
        form.title.trim(),

      description:
        form.description.trim() ||
        "Course resource.",

      type: form.type,

      meta:
        form.meta.trim() ||
        `${form.type} resource`,

      saved: false,
    };


    updateResources([
      resource,
      ...resources,
    ]);


    setForm({
      title: "",
      description: "",
      type: "Lecture",
      meta: "",
    });


    setModal(false);
  };


  const toggleSave = (id) => {

    const updated =
      resources.map(
        (resource) =>
          resource.id === id
            ? {
                ...resource,
                saved:
                  !resource.saved,
              }
            : resource
      );

    updateResources(updated);
  };


  const iconFor = (type) => {

    if (type === "PDF") {
      return <FileText size={22} />;
    }

    if (type === "Video") {
      return <Video size={22} />;
    }

    if (type === "Link") {
      return <Link2 size={22} />;
    }

    return <BookOpen size={22} />;
  };


  return (

    <div className="page resources-page">

      {/* =====================================================
          BACK
      ===================================================== */}

      <button
        className="back-button"
        onClick={() =>
          navigate(
            `/courses/${courseId}`
          )
        }
      >
        <ArrowLeft size={17} />
        Back to {course.code}
      </button>


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="page-header">

        <div>

          <span className="eyebrow">
            {course.code} · STUDY MATERIALS
          </span>

          <h1>
            Resources
          </h1>

          <p>
            Everything you need for{" "}
            {course.name}.
          </p>

        </div>


        <button
          className="primary-button"
          onClick={() =>
            setModal(true)
          }
        >
          <Plus size={17} />
          Add resource
        </button>

      </div>


      {/* =====================================================
          MOTIVATION
      ===================================================== */}

      <section className="motivation-section">

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              DAILY ENERGY
            </span>

            <h2>
              Keep going.
            </h2>

          </div>

          <Sparkles
            className="motivation-spark"
            size={22}
          />

        </div>


        <div className="motivation-grid">

          {motivationCards.map(
            (card, index) => (

              <div
                className="motivation-card"
                key={card.number}
              >

                <div className="motivation-glow" />

                <div className="motivation-top">

                  <span>
                    {card.label}
                  </span>

                  <strong>
                    {card.number}
                  </strong>

                </div>


                <div className="motivation-icon">

                  <Sparkles size={18} />

                </div>


                <p>
                  “{card.quote}”
                </p>


                <div className="motivation-line" />

              </div>

            )
          )}

        </div>

      </section>


      {/* =====================================================
          LIBRARY
      ===================================================== */}

      <section className="library-section">

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              YOUR STUDY SPACE
            </span>

            <h2>
              UniMate Library
            </h2>

            <p>
              Everything you need, organized in one place.
            </p>

          </div>

          <div className="library-badge">

            <Bookmark size={16} />

            Personal Library

          </div>

        </div>


        <div className="library-grid">

          {libraryItems.map(
            (item) => (

              <button
                className="library-card"
                key={item.title}
                type="button"
              >

                <div className="library-card-top">

                  <div className="library-icon">

                    {item.icon}

                  </div>

                  <ArrowUpRight
                    size={17}
                    className="library-arrow"
                  />

                </div>


                <span className="library-type">
                  {item.type}
                </span>


                <h3>
                  {item.title}
                </h3>


                <p>
                  {item.description}
                </p>


                <div className="library-card-footer">

                  <span>
                    Explore collection
                  </span>

                  <ArrowUpRight size={14} />

                </div>

              </button>

            )
          )}

        </div>

      </section>


      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="course-search">

        <Search size={17} />

        <input
          placeholder="Search resources..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        {search && (

          <button
            onClick={() =>
              setSearch("")
            }
          >
            <X size={15} />
          </button>

        )}

      </div>


      {/* =====================================================
          FILTERS
      ===================================================== */}

      <div className="resource-filters">

        {[
          "All",
          "Lecture",
          "PDF",
          "Video",
          "Link",
        ].map((item) => (

          <button
            key={item}
            className={
              filter === item
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter(item)
            }
          >
            {item}
          </button>

        ))}

      </div>


      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="course-summary">

        <div className="course-summary-card">

          <span>
            TOTAL RESOURCES
          </span>

          <strong>
            {resources.length}
          </strong>

          <small>
            For this course
          </small>

        </div>


        <div className="course-summary-card">

          <span>
            SAVED
          </span>

          <strong>
            {
              resources.filter(
                (r) => r.saved
              ).length
            }
          </strong>

          <small>
            Your favorites
          </small>

        </div>


        <div className="course-summary-card">

          <span>
            COURSE
          </span>

          <strong>
            {course.code}
          </strong>

          <small>
            Study space
          </small>

        </div>

      </div>


      {/* =====================================================
          RESOURCES
      ===================================================== */}

      {filtered.length === 0 ? (

        <div className="empty-courses">

          <BookOpen size={32} />

          <h2>
            No resources found
          </h2>

          <p>
            Try another search or add
            a resource.
          </p>

          <button
            className="primary-button"
            onClick={() =>
              setModal(true)
            }
          >
            <Plus size={16} />
            Add resource
          </button>

        </div>

      ) : (

        <div className="resources-list">

          {filtered.map(
            (resource) => (

              <div
                className="resource-card"
                key={resource.id}
              >

                <div className="resource-icon">
                  {iconFor(
                    resource.type
                  )}
                </div>


                <div className="resource-content">

                  <span>
                    {resource.type}
                  </span>

                  <h2>
                    {resource.title}
                  </h2>

                  <p>
                    {resource.description}
                  </p>

                  <small>
                    {resource.meta}
                  </small>

                </div>


                <div className="resource-actions">

                  <button
                    className={
                      resource.saved
                        ? "save-button saved"
                        : "save-button"
                    }
                    onClick={() =>
                      toggleSave(
                        resource.id
                      )
                    }
                  >
                    <Star
                      size={18}
                      fill={
                        resource.saved
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>


                  <button
                    className="resource-open-button"
                    onClick={() =>
                      navigate(
                        `/courses/${courseId}/resources/${resource.id}`
                      )
                    }
                  >
                    Open
                    <ArrowUpRight size={15} />
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      )}


      {/* =====================================================
          MODAL
      ===================================================== */}

      {modal && (

        <div
          className="course-modal-overlay"
          onClick={() =>
            setModal(false)
          }
        >

          <div
            className="course-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <span className="eyebrow">
                  NEW RESOURCE
                </span>

                <h2>
                  Add resource
                </h2>

                <p>
                  Add study material.
                </p>

              </div>


              <button
                className="modal-close"
                onClick={() =>
                  setModal(false)
                }
              >
                <X size={19} />
              </button>

            </div>


            <form
              onSubmit={addResource}
            >

              <div className="modal-field">

                <label>
                  Title
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title:
                        e.target.value,
                    })
                  }
                  placeholder="Chapter 4 lecture"
                  required
                />

              </div>


              <div className="modal-field">

                <label>
                  Description
                </label>

                <textarea
                  rows="3"
                  value={
                    form.description
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description:
                        e.target.value,
                    })
                  }
                  placeholder="What is this resource about?"
                />

              </div>


              <div className="modal-row">

                <div className="modal-field">

                  <label>
                    Type
                  </label>

                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        type:
                          e.target.value,
                      })
                    }
                  >

                    <option>
                      Lecture
                    </option>

                    <option>
                      PDF
                    </option>

                    <option>
                      Video
                    </option>

                    <option>
                      Link
                    </option>

                  </select>

                </div>


                <div className="modal-field">

                  <label>
                    Details
                  </label>

                  <input
                    value={form.meta}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        meta:
                          e.target.value,
                      })
                    }
                    placeholder="PDF · 20 pages"
                  />

                </div>

              </div>


              <button
                type="submit"
                className="auth-button modal-submit"
              >
                Add resource
                <ArrowUpRight
                  size={17}
                />
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Resources;