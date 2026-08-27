import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  BookOpen,
  Target,
  Timer,
  Wallet,
  Sparkles,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    if (isLogin) {
      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        setMessage(error.message);
      } else {
        navigate("/dashboard");
      }
    } else {
      const { error } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage(
          "Account created! Check your email to confirm your account."
        );
      }
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">

      {/* =========================================
          LEFT — STUDENT EXPERIENCE
      ========================================= */}

      <div className="auth-showcase">

        <div className="auth-showcase-top">

          <div className="auth-brand">
            <div className="auth-brand-icon">
              <GraduationCap size={21} />
            </div>

            <strong>UniMate</strong>
          </div>

          <span className="auth-student-badge">
            <Sparkles size={13} />
            Built for students
          </span>

        </div>

        <div className="auth-showcase-content">

          <span className="auth-overline">
            YOUR UNIVERSITY, ORGANIZED.
          </span>

          <h2>
            Everything you need
            <br />
            to <span>thrive at university.</span>
          </h2>

          <p className="auth-showcase-description">
            UniMate brings your studies, exams, goals,
            focus sessions and money habits together
            in one beautiful student space.
          </p>

          {/* FEATURE PILLS */}

          <div className="auth-features">

            <div className="auth-feature">
              <div className="auth-feature-icon">
                <BookOpen size={17} />
              </div>

              <div>
                <strong>Study smarter</strong>
                <span>Organize your learning</span>
              </div>

              <CheckCircle2 size={15} />
            </div>

            <div className="auth-feature">
              <div className="auth-feature-icon">
                <CalendarDays size={17} />
              </div>

              <div>
                <strong>Never miss a deadline</strong>
                <span>Keep your academic life on track</span>
              </div>

              <CheckCircle2 size={15} />
            </div>

            <div className="auth-feature">
              <div className="auth-feature-icon">
                <Target size={17} />
              </div>

              <div>
                <strong>Reach your goals</strong>
                <span>Turn plans into real progress</span>
              </div>

              <CheckCircle2 size={15} />
            </div>

          </div>

          {/* MINI DASHBOARD PREVIEW */}

          <div className="auth-preview">

            <div className="auth-preview-glow" />

            <div className="preview-header">

              <div>
                <span>GOOD MORNING ✦</span>
                <strong>Your student space</strong>
              </div>

              <div className="preview-avatar">
                U
              </div>

            </div>

            <div className="preview-cards">

              <div className="preview-card">

                <div className="preview-card-icon">
                  <Target size={14} />
                </div>

                <span>Goals</span>

                <strong>72%</strong>

                <div className="preview-progress">
                  <div style={{ width: "72%" }} />
                </div>

              </div>

              <div className="preview-card">

                <div className="preview-card-icon">
                  <Timer size={14} />
                </div>

                <span>Focus</span>

                <strong>75 min</strong>

                <small>Today</small>

              </div>

              <div className="preview-card">

                <div className="preview-card-icon">
                  <Wallet size={14} />
                </div>

                <span>Budget</span>

                <strong>$420</strong>

                <small>remaining</small>

              </div>

            </div>

          </div>

        </div>

        <div className="auth-showcase-footer">
          <span>Study.</span>
          <span>Focus.</span>
          <span>Grow.</span>
          <span>Repeat.</span>
        </div>

      </div>


      {/* =========================================
          RIGHT — AUTH
      ========================================= */}

      <div className="auth-form-side">

        <div className="auth-form-container">

          <div className="auth-mobile-logo">

            <div className="auth-logo">
              <GraduationCap size={23} />
            </div>

            <strong>UniMate</strong>

          </div>

          <div className="auth-heading">

            <span className="eyebrow">
              {isLogin
                ? "WELCOME BACK"
                : "JOIN UNIMATE"}
            </span>

            <h1>
              {isLogin
                ? "Welcome back ✦"
                : "Create your student space."}
            </h1>

            <p>
              {isLogin
                ? "Pick up where you left off and keep moving forward."
                : "One account. One organized space. A better university experience."}
            </p>

          </div>


          {/* TRUST LINE */}

          <div className="auth-trust">

            <div className="auth-trust-item">
              <CheckCircle2 size={14} />
              <span>Personal dashboard</span>
            </div>

            <div className="auth-trust-item">
              <CheckCircle2 size={14} />
              <span>Built for university life</span>
            </div>

          </div>


          {/* FORM */}

          <form onSubmit={handleSubmit}>

            {!isLogin && (
              <div className="auth-field">

                <label>Full name</label>

                <input
                  type="text"
                  placeholder="Your name"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  required
                />

              </div>
            )}


            <div className="auth-field">

              <label>Email address</label>

              <div className="input-icon">

                <Mail size={16} />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

            </div>


            <div className="auth-field">

              <div className="password-label">

                <label>Password</label>

                {isLogin && (
                  <button
                    type="button"
                    className="forgot-password"
                    onClick={() =>
                      setMessage(
                        "Password reset will be available soon."
                      )
                    }
                  >
                    Forgot password?
                  </button>
                )}

              </div>

              <div className="input-icon">

                <Lock size={16} />

                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  minLength={6}
                />

              </div>

              {!isLogin && (
                <small className="password-hint">
                  Use at least 6 characters.
                </small>
              )}

            </div>


            {message && (
              <div className="auth-message">
                {message}
              </div>
            )}


            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >

              <span>
                {loading
                  ? "Please wait..."
                  : isLogin
                  ? "Enter my UniMate"
                  : "Create my UniMate"}
              </span>

              {!loading && (
                <ArrowRight size={17} />
              )}

            </button>

          </form>


          {/* SWITCH */}

          <div className="auth-switch">

            <span>
              {isLogin
                ? "New to UniMate?"
                : "Already have an account?"}
            </span>

            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
            >
              {isLogin
                ? "Create your space"
                : "Log in"}
            </button>

          </div>


          {/* BOTTOM */}

          <div className="auth-bottom-note">

            <Sparkles size={13} />

            <span>
              Your university life, but more organized.
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Auth;