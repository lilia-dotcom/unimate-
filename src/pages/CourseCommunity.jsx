import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  MessageCircle,
  Plus,
  Search,
  Send,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const courseNames = {
  1: "Software Engineering",
  2: "Mathematics",
  3: "Computer Programming",
};

const defaultPosts = [
  {
    id: 1,
    author: "Lina",
    initials: "L",
    type: "Question",
    title: "Can someone explain the difference between an interface and a class?",
    content:
      "I understand the basic idea, but I still get confused when deciding which one to use.",
    time: "2 hours ago",
    replies: 3,
  },
  {
    id: 2,
    author: "Adam",
    initials: "A",
    type: "Discussion",
    title: "How are you preparing for the next exam?",
    content:
      "I'm thinking of reviewing the lectures first and then doing practice exercises.",
    time: "Yesterday",
    replies: 7,
  },
];

function CourseCommunity() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const courseName =
    courseNames[courseId] || "Course";

  const storageKey =
    `unimate_community_${courseId}`;

  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem(storageKey);

    return saved
      ? JSON.parse(saved)
      : defaultPosts;
  });

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    content: "",
    type: "Question",
  });

  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify(posts)
    );
  }, [posts, storageKey]);

  const filteredPosts = useMemo(() => {
    const value = search
      .toLowerCase()
      .trim();

    if (!value) {
      return posts;
    }

    return posts.filter((post) =>
      `${post.title} ${post.content} ${post.author} ${post.type}`
        .toLowerCase()
        .includes(value)
    );
  }, [posts, search]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCreatePost = (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    const author = "You";

    const newPost = {
      id: Date.now(),
      author,
      initials: "Y",
      type: form.type,
      title: form.title.trim(),
      content:
        form.content.trim() ||
        "No additional details.",
      time: "Just now",
      replies: 0,
    };

    setPosts((previous) => [
      newPost,
      ...previous,
    ]);

    setForm({
      title: "",
      content: "",
      type: "Question",
    });

    setIsModalOpen(false);
  };

  const deletePost = (postId) => {
    setPosts((previous) =>
      previous.filter(
        (post) => post.id !== postId
      )
    );
  };

  return (
    <div className="page course-community-page">

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
            Community
          </h1>

          <p>
            Ask questions, share ideas and
            learn with other students.
          </p>

        </div>


        <button
          className="primary-button"
          onClick={() =>
            setIsModalOpen(true)
          }
        >
          <Plus size={16} />
          Create post
        </button>

      </div>


      {/* COMMUNITY STATS */}

      <div className="community-summary">

        <div className="community-stat">

          <div className="community-stat-icon">
            <Users size={19} />
          </div>

          <div>

            <span>
              STUDENTS
            </span>

            <strong>
              128
            </strong>

          </div>

        </div>


        <div className="community-stat">

          <div className="community-stat-icon">
            <MessageCircle size={19} />
          </div>

          <div>

            <span>
              POSTS
            </span>

            <strong>
              {posts.length}
            </strong>

          </div>

        </div>


        <div className="community-stat">

          <div className="community-stat-icon">
            ?
          </div>

          <div>

            <span>
              QUESTIONS
            </span>

            <strong>
              {
                posts.filter(
                  (post) =>
                    post.type === "Question"
                ).length
              }
            </strong>

          </div>

        </div>

      </div>


      {/* SEARCH */}

      <div className="community-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search discussions..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

      </div>


      {/* POSTS */}

      {filteredPosts.length === 0 ? (

        <div className="empty-community">

          <MessageCircle size={36} />

          <h2>
            No posts found
          </h2>

          <p>
            Be the first student to start
            a discussion.
          </p>

          <button
            className="primary-button"
            onClick={() =>
              setIsModalOpen(true)
            }
          >
            <Plus size={16} />
            Create first post
          </button>

        </div>

      ) : (

        <div className="community-posts">

          {filteredPosts.map((post) => (

            <article
              className="community-post"
              key={post.id}
            >

              <div className="post-top">

                <div className="post-author">

                  <div className="author-avatar">
                    {post.initials}
                  </div>

                  <div>

                    <strong>
                      {post.author}
                    </strong>

                    <span>
                      {post.time}
                    </span>

                  </div>

                </div>


                <span
                  className={`post-type ${
                    post.type
                      .toLowerCase()
                      .replace(" ", "-")
                  }`}
                >
                  {post.type}
                </span>

              </div>


              <h2>
                {post.title}
              </h2>

              <p>
                {post.content}
              </p>


              <div className="post-footer">

                <button className="post-reply-button">
                  <MessageCircle size={16} />
                  {post.replies}{" "}
                  {post.replies === 1
                    ? "reply"
                    : "replies"}
                </button>


                <button
                  className="post-open-button"
                >
                  Open discussion
                  <ArrowUpRight size={15} />
                </button>


                {post.author === "You" && (
                  <button
                    className="post-delete-button"
                    onClick={() =>
                      deletePost(post.id)
                    }
                    aria-label="Delete post"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

              </div>

            </article>

          ))}

        </div>

      )}


      {/* CREATE POST MODAL */}

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
                  NEW POST
                </span>

                <h2>
                  Start a discussion
                </h2>

                <p>
                  Ask something or share
                  an idea with your classmates.
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


            <form onSubmit={handleCreatePost}>

              <div className="modal-field">

                <label>
                  Post type
                </label>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >

                  <option value="Question">
                    Question
                  </option>

                  <option value="Discussion">
                    Discussion
                  </option>

                  <option value="Resource">
                    Resource
                  </option>

                </select>

              </div>


              <div className="modal-field">

                <label>
                  Title
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Can someone explain recursion?"
                  required
                />

              </div>


              <div className="modal-field">

                <label>
                  Details
                </label>

                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Write more details..."
                  rows="5"
                />

              </div>


              <button
                type="submit"
                className="auth-button modal-submit"
              >
                Publish post
                <Send size={16} />
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default CourseCommunity;