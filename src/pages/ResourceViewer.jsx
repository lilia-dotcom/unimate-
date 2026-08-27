import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  FileText,
  Link2,
  MessageSquare,
  Play,
  Save,
  Star,
  Video,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

const resources = {
  1: {
    1: {
      title: "Software Engineering Fundamentals",
      type: "Lecture",
      description:
        "Introduction to the main concepts of software engineering.",
      content: [
        "Software engineering is the systematic approach to designing, developing, testing and maintaining software.",
        "A software development process usually includes requirements, design, implementation, testing and maintenance.",
        "Good software should be reliable, maintainable, scalable and easy to understand.",
      ],
    },

    2: {
      title: "Requirements Engineering",
      type: "PDF",
      description:
        "Functional and non-functional requirements.",
      content: [
        "Functional requirements describe what a system should do.",
        "Non-functional requirements describe qualities such as performance, security and usability.",
        "Requirements should be clear, testable and understandable.",
      ],
    },

    3: {
      title: "Agile & Scrum Explained",
      type: "Video",
      description:
        "A practical introduction to Agile methodology.",
      content: [
        "Agile is an iterative approach to software development.",
        "Scrum organizes work into short iterations called sprints.",
        "Teams continuously inspect their work and adapt their process.",
      ],
    },

    4: {
      title: "UML Diagrams Guide",
      type: "Link",
      description:
        "Useful reference for UML diagrams.",
      content: [
        "UML is used to visually represent software systems.",
        "Common diagrams include use case, class, sequence and activity diagrams.",
        "UML helps developers communicate system structure and behavior.",
      ],
    },
  },

  2: {
    5: {
      title: "Limits & Continuity",
      type: "Lecture",
      description:
        "Core concepts and solved examples.",
      content: [
        "A limit describes the value a function approaches.",
        "Continuity means that a function has no break at a particular point.",
        "Limits are fundamental for understanding derivatives and integrals.",
      ],
    },

    6: {
      title: "Derivatives Summary",
      type: "PDF",
      description:
        "Important derivative rules and formulas.",
      content: [
        "The derivative measures the rate of change of a function.",
        "The power rule is one of the most commonly used derivative rules.",
        "Derivatives are widely used in mathematics, physics and engineering.",
      ],
    },
  },

  3: {
    7: {
      title: "Programming Fundamentals",
      type: "Lecture",
      description:
        "Variables, conditions and loops.",
      content: [
        "Variables store information that a program can use.",
        "Conditions allow programs to make decisions.",
        "Loops allow a program to repeat instructions efficiently.",
      ],
    },

    8: {
      title: "Data Structures",
      type: "PDF",
      description:
        "Arrays, stacks and queues.",
      content: [
        "Data structures organize and store information efficiently.",
        "Arrays store elements in an ordered collection.",
        "Stacks follow the Last In First Out principle.",
        "Queues follow the First In First Out principle.",
      ],
    },
  },
};

function ResourceViewer() {
  const navigate = useNavigate();

  const {
    courseId,
    resourceId,
  } = useParams();

  const courseResources =
    resources[courseId] || resources[1];

  const resource =
    courseResources[resourceId] ||
    courseResources[1] ||
    Object.values(courseResources)[0];

  const isVideo =
    resource.type === "Video";

  const isLink =
    resource.type === "Link";

  const handleSave = () => {
    const key =
      `unimate_saved_resource_${courseId}_${resourceId}`;

    localStorage.setItem(key, "true");

    alert("Resource saved ⭐");
  };

  const handleAI = () => {
    alert(
      "AI Study Assistant will use this resource next 🤖"
    );
  };

  return (
    <div className="page resource-viewer-page">

      {/* BACK */}

      <button
        className="back-button"
        onClick={() =>
          navigate(
            `/courses/${courseId}/resources`
          )
        }
      >
        <ArrowLeft size={17} />
        Back to resources
      </button>


      {/* HEADER */}

      <section className="resource-viewer-header">

        <div>

          <span className="eyebrow">
            {resource.type}
          </span>

          <h1>
            {resource.title}
          </h1>

          <p>
            {resource.description}
          </p>

        </div>


        <div className="resource-viewer-actions">

          <button
            className="secondary-button"
            onClick={handleSave}
          >
            <Star size={17} />
            Save
          </button>

          <button
            className="primary-button"
            onClick={handleAI}
          >
            <MessageSquare size={17} />
            Ask AI
          </button>

        </div>

      </section>


      {/* RESOURCE */}

      <section className="resource-viewer-layout">

        {/* MAIN CONTENT */}

        <div className="resource-document">

          <div className="resource-document-toolbar">

            <div>

              {resource.type === "PDF" && (
                <FileText size={18} />
              )}

              {resource.type === "Lecture" && (
                <BookOpen size={18} />
              )}

              {resource.type === "Video" && (
                <Video size={18} />
              )}

              {resource.type === "Link" && (
                <Link2 size={18} />
              )}

              <span>
                {resource.type}
              </span>

            </div>

            <span>
              UniMate Study Space
            </span>

          </div>


          {/* VIDEO */}

          {isVideo ? (

            <div className="resource-video-placeholder">

              <div className="video-play-button">
                <Play size={28} />
              </div>

              <h2>
                {resource.title}
              </h2>

              <p>
                Video player will be connected
                here.
              </p>

            </div>

          ) : isLink ? (

            /* LINK */

            <div className="resource-link-placeholder">

              <div className="resource-large-icon">
                <Link2 size={35} />
              </div>

              <h2>
                External resource
              </h2>

              <p>
                This resource will open an
                external website.
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  alert(
                    "External link coming next 🔗"
                  )
                }
              >
                Open resource
                <ArrowUpRight size={16} />
              </button>

            </div>

          ) : (

            /* DOCUMENT */

            <article className="resource-document-content">

              <div className="document-cover">

                <BookOpen size={34} />

                <span>
                  {resource.type}
                </span>

                <h2>
                  {resource.title}
                </h2>

              </div>


              <div className="document-body">

                <h2>
                  Introduction
                </h2>

                {resource.content.map(
                  (paragraph, index) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  )
                )}


                <div className="study-note">

                  <Check size={19} />

                  <div>

                    <strong>
                      Key idea
                    </strong>

                    <p>
                      Understanding the
                      fundamentals is more
                      important than memorizing
                      everything.
                    </p>

                  </div>

                </div>


                <h2>
                  What should you remember?
                </h2>

                <ul>

                  {resource.content.map(
                    (paragraph, index) => (
                      <li key={index}>
                        {paragraph}
                      </li>
                    )
                  )}

                </ul>

              </div>

            </article>

          )}

        </div>


        {/* SIDE PANEL */}

        <aside className="resource-sidebar">

          <div className="resource-side-card">

            <span className="card-label">
              STUDY TOOLS
            </span>

            <h2>
              Learn smarter
            </h2>

            <p>
              Use UniMate to understand this
              resource faster.
            </p>


            <button
              className="resource-side-action"
              onClick={handleAI}
            >
              <MessageSquare size={18} />

              <div>

                <strong>
                  Ask AI
                </strong>

                <span>
                  Explain this resource
                </span>

              </div>

              <ArrowUpRight size={15} />

            </button>


            <button
              className="resource-side-action"
              onClick={() =>
                alert(
                  "Quiz generator coming next 🧠"
                )
              }
            >
              <BookOpen size={18} />

              <div>

                <strong>
                  Generate quiz
                </strong>

                <span>
                  Test your understanding
                </span>

              </div>

              <ArrowUpRight size={15} />

            </button>


            <button
              className="resource-side-action"
              onClick={() =>
                alert(
                  "Summary generator coming next ✨"
                )
              }
            >
              <FileText size={18} />

              <div>

                <strong>
                  Summarize
                </strong>

                <span>
                  Get the key points
                </span>

              </div>

              <ArrowUpRight size={15} />

            </button>

          </div>


          <div className="resource-side-card">

            <span className="card-label">
              RESOURCE
            </span>

            <div className="resource-info-row">

              <span>
                Type
              </span>

              <strong>
                {resource.type}
              </strong>

            </div>

            <div className="resource-info-row">

              <span>
                Status
              </span>

              <strong>
                <Check size={15} />
                Available
              </strong>

            </div>

            <div className="resource-info-row">

              <span>
                Course
              </span>

              <strong>
                {courseId === "1"
                  ? "SWE101"
                  : courseId === "2"
                  ? "MATH101"
                  : "CS101"}
              </strong>

            </div>

          </div>

        </aside>

      </section>

    </div>
  );
}

export default ResourceViewer;