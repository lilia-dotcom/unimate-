import {
  ArrowLeft,
  ArrowUpRight,
  Brain,
  Check,
  FileText,
  Lightbulb,
  Send,
  Sparkles,
  Target,
  User,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { supabase } from "../lib/supabase";

const courseNames = {
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

function CourseAI() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const course = courseNames[courseId] || courseNames[1];

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: `Hi! I'm UniMate AI. I'm ready to help you study ${course.name}. Ask me anything.`,
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async (text = message) => {
    const value = text.trim();

    if (!value || loading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: value,
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setMessage("");
    setLoading(true);

    try {
      const chatMessages = nextMessages.map((item) => ({
        role: item.role === "user" ? "user" : "assistant",
        content: item.text,
      }));

      const { data, error } = await supabase.functions.invoke(
        "smart-api",
        {
          body: {
            messages: chatMessages,
            course: course.name,
          },
        }
      );

      if (error) {
  console.error("AI FUNCTION ERROR:", error);

  throw new Error(
    error.message || "Supabase function failed"
  );
}

      if (!data?.reply) {
        throw new Error("No AI response received.");
      }

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: data.reply,
        },
      ]);
    } catch (error) {
  console.error("AI ERROR:", error);

  setMessages((previous) => [
    ...previous,
    {
      id: Date.now() + 1,
      role: "assistant",
      text: `AI Error: ${
        error?.message || "Unknown error"
      }`,
    },
  ]);
} finally {
  setLoading(false);
}
  };

  const quickActions = [
    {
      title: "Explain simply",
      description: "Explain a difficult concept.",
      icon: Lightbulb,
      prompt: `Explain an important ${course.name} concept in very simple words.`,
    },
    {
      title: "Summarize",
      description: "Get the key points.",
      icon: FileText,
      prompt: `Give me a simple summary of the most important topics in ${course.name}.`,
    },
    {
      title: "Generate quiz",
      description: "Test your knowledge.",
      icon: Target,
      prompt: `Create 5 practice questions for ${course.name} and wait for my answers.`,
    },
  ];

  return (
    <div className="page course-ai-page">

      <button
        className="back-button"
        onClick={() => navigate(`/courses/${courseId}`)}
      >
        <ArrowLeft size={17} />
        Back to {course.code}
      </button>

      <section className="ai-page-header">

        <div className="ai-title">

          <div className="ai-main-icon">
            <Brain size={27} />
          </div>

          <div>
            <span className="eyebrow">
              {course.code} · AI STUDY SPACE
            </span>

            <h1>Study with AI</h1>

            <p>
              Your personal AI assistant for {course.name}.
            </p>
          </div>

        </div>

        <div className="ai-status">
          <span></span>
          AI ready
        </div>

      </section>

      <section className="ai-layout">

        <div className="ai-chat-card">

          <div className="ai-chat-header">

            <div>
              <span className="card-label">
                CONVERSATION
              </span>

              <h2>Ask anything</h2>
            </div>

            <Sparkles size={20} />

          </div>

          <div className="ai-messages">

            {messages.map((item) => (

              <div
                key={item.id}
                className={
                  item.role === "user"
                    ? "ai-message user-message"
                    : "ai-message"
                }
              >

                <div className="message-avatar">
                  {item.role === "user" ? (
                    <User size={16} />
                  ) : (
                    <Brain size={16} />
                  )}
                </div>

                <div className="message-content">

                  <span>
                    {item.role === "user"
                      ? "You"
                      : "UniMate AI"}
                  </span>

                  <p>{item.text}</p>

                </div>

              </div>

            ))}

            {loading && (
              <div className="ai-message">

                <div className="message-avatar">
                  <Brain size={16} />
                </div>

                <div className="message-content">

                  <span>UniMate AI</span>

                  <div className="ai-typing">
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>

                </div>

              </div>
            )}

          </div>

          <div className="ai-input-area">

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder={`Ask about ${course.name}...`}
              disabled={loading}
            />

            <button
              className="ai-send-button"
              onClick={() => sendMessage()}
              disabled={!message.trim() || loading}
            >
              <Send size={18} />
            </button>

          </div>

          <small className="ai-input-hint">
            Press Enter to send
          </small>

        </div>

        <aside className="ai-sidebar">

          <div className="ai-side-card">

            <span className="card-label">
              QUICK HELP
            </span>

            <h2>What do you need?</h2>

            <p>
              Choose an action and start studying.
            </p>

            <div className="ai-quick-actions">

              {quickActions.map((action) => {

                const Icon = action.icon;

                return (
                  <button
                    key={action.title}
                    className="ai-quick-card"
                    onClick={() => sendMessage(action.prompt)}
                    disabled={loading}
                  >

                    <div className="quick-icon">
                      <Icon size={18} />
                    </div>

                    <div>

                      <strong>
                        {action.title}
                      </strong>

                      <span>
                        {action.description}
                      </span>

                    </div>

                    <ArrowUpRight size={15} />

                  </button>
                );
              })}

            </div>

          </div>

          <div className="ai-side-card">

            <span className="card-label">
              COURSE CONTEXT
            </span>

            <h2>{course.name}</h2>

            <div className="ai-context-item">
              <Check size={16} />
              <span>Course materials</span>
            </div>

            <div className="ai-context-item">
              <Check size={16} />
              <span>Study progress</span>
            </div>

            <div className="ai-context-item">
              <Check size={16} />
              <span>Learning goals</span>
            </div>

          </div>

          <div className="ai-tip-card">

            <Sparkles size={20} />

            <div>

              <strong>Study tip</strong>

              <p>
                Ask "why" and "how" instead of only asking for answers.
              </p>

            </div>

          </div>

        </aside>

      </section>

    </div>
  );
}

export default CourseAI;