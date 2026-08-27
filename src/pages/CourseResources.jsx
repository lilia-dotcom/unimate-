import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  FileText,
  Link as LinkIcon,
  PlayCircle,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const courseNames = {
  1: "Software Engineering",
  2: "Mathematics",
  3: "Computer Programming",
};

const defaultResources = [
  {
    id: 1,
    title: "Introduction to Software Engineering",
    description: "Lecture slides and introduction materials.",
    type: "PDF",
    url: "#",
    date: "Added today",
  },
  {
    id: 2,
    title: "Software Development Life Cycle",
    description: "Useful material for understanding SDLC.",
    type: "Link",
    url: "#",
    date: "Added yesterday",
  },
];

function CourseResources() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const courseName =
    courseNames[courseId] || "Course";

  const storageKey =
    `unimate_resources_${courseId}`;

  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem(storageKey);

    return saved
      ? JSON.parse(saved)
      : defaultResources;
  });

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "PDF",
    url: "",
  });

  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify(resources)
    );
  }, [resources, storageKey]);

  const filteredResources = useMemo(() => {
    const value = search
      .toLowerCase()
      .trim();

    if (!value) {
      return resources;
    }

    return resources.filter((resource) =>
      `${resource.title} ${resource.description} ${resource.type}`
        .toLowerCase()
        .includes(value)
    );
  }, [resources, search]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddResource = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    const newResource = {
      id: Date.now(),
      title: form.title.trim(),
      description:
        form.description.trim() ||
        "No description added.",
      type: form.type,
      url: form.url.trim() || "#",
      date: "Added just now",
    };

    setResources((previous) => [
      newResource,
      ...previous,
    ]);

    setForm({
      title: "",
      description: "",
      type: "PDF",
      url: "",
    });

    setIsModalOpen(false);
  };

  const deleteResource = (resourceId) => {
    setResources((previous) =>
      previous.filter(
        (resource) =>
          resource.id !== resourceId
      )
    );
  };

  const getIcon = (type) => {
    if (type === "Video") {
      return <PlayCircle size={22} />;
    }

    if (type === "Link") {
      return <LinkIcon size={22} />;
    }

    return <FileText size={22} />;
  };

  return (
    <div className="page course-resources-page">

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
            Resources
          </h1>

          <p>
            Keep all your study materials
            organized in one place.
          </p>

        </div>

        <button
          className="primary-button"
          onClick={() =>
            setIsModalOpen(true)
          }
        >
          <Plus size={16} />
          Add resource
        </button>

      </div>


      {/* SEARCH */}

      <div className="resource-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

      </div>


      {/* SUMMARY */}

      <div className="resources-summary">

        <div>
          <span>
            TOTAL RESOURCES
          </span>

          <strong>
            {resources.length}
          </strong>
        </div>

        <div>
          <span>
            PDF FILES
          </span>

          <strong>
            {
              resources.filter(
                (resource) =>
                  resource.type === "PDF"
              ).length
            }
          </strong>
        </div>

        <div>
          <span>
            LINKS & VIDEOS
          </span>

          <strong>
            {
              resources.filter(
                (resource) =>
                  resource.type !== "PDF"
              ).length
            }
          </strong>
        </div>

      </div>


      {/* RESOURCES */}

      {filteredResources.length === 0 ? (

        <div className="empty-resources">

          <BookOpen size={36} />

          <h2>
            No resources found
          </h2>

          <p>
            Add a resource or try another search.
          </p>

          <button
            className="primary-button"
            onClick={() =>
              setIsModalOpen(true)
            }
          >
            <Plus size={16} />
            Add resource
          </button>

        </div>

      ) : (

        <div className="resources-list">

          {filteredResources.map(
            (resource) => (

              <div
                className="resource-card"
                key={resource.id}
              >

                <div className="resource-icon">
                  {getIcon(resource.type)}
                </div>


                <div className="resource-content">

                  <div className="resource-title-row">

                    <div>

                      <span className="resource-type">
                        {resource.type}
                      </span>

                      <h2>
                        {resource.title}
                      </h2>

                    </div>

                  </div>

                  <p>
                    {resource.description}
                  </p>

                  <span className="resource-date">
                    {resource.date}
                  </span>

                </div>


                <div className="resource-actions">

                  {resource.url !== "#" && (

                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="resource-open-button"
                    >
                      Open
                      <ArrowUpRight size={15} />
                    </a>

                  )}

                  <button
                    className="resource-delete-button"
                    onClick={() =>
                      deleteResource(
                        resource.id
                      )
                    }
                    aria-label="Delete resource"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      )}


      {/* MODAL */}

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
                  NEW RESOURCE
                </span>

                <h2>
                  Add study material
                </h2>

                <p>
                  Save something useful
                  for this course.
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


            <form onSubmit={handleAddResource}>

              <div className="modal-field">

                <label>
                  Resource title
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Chapter 3 Lecture"
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
                  placeholder="What is this resource about?"
                  rows="3"
                />

              </div>


              <div className="modal-row">

                <div className="modal-field">

                  <label>
                    Type
                  </label>

                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                  >
                    <option value="PDF">
                      PDF
                    </option>

                    <option value="Link">
                      Website / Link
                    </option>

                    <option value="Video">
                      Video
                    </option>
                  </select>

                </div>


                <div className="modal-field">

                  <label>
                    URL
                  </label>

                  <input
                    name="url"
                    type="url"
                    value={form.url}
                    onChange={handleChange}
                    placeholder="https://..."
                  />

                </div>

              </div>


              <button
                type="submit"
                className="auth-button modal-submit"
              >
                Add resource
                <ArrowUpRight size={17} />
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default CourseResources;