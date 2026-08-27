import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        navigate("/dashboard");
      }
    } else {
      const { error } = await supabase.auth.signUp({
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
      <div className="auth-card">

        <div className="auth-logo">
          <GraduationCap size={24} />
        </div>

        <span className="eyebrow">
          WELCOME TO UNIMATE
        </span>

        <h1>
          {isLogin
            ? "Welcome back ✦"
            : "Create your UniMate"}
        </h1>

        <p className="auth-subtitle">
          {isLogin
            ? "Your university life, organized in one place."
            : "Build your personalized student space."}
        </p>

        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <div className="auth-field">
              <label>Full name</label>

              <input
                type="text"
                placeholder="Your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="auth-field">
            <label>Email</label>

            <div className="input-icon">
              <Mail size={16} />

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label>Password</label>

            <div className="input-icon">
              <Lock size={16} />

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          {message && (
            <p className="auth-message">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Log in"
              : "Create account"}

            {!loading && <ArrowRight size={17} />}
          </button>

        </form>

        <div className="auth-switch">

          <span>
            {isLogin
              ? "Don't have an account?"
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
              ? "Create account"
              : "Log in"}
          </button>

        </div>

      </div>

      <div className="auth-decoration">

        <div className="auth-circle"></div>

        <div className="auth-floating-card">
          <span>YOUR STUDENT SPACE</span>

          <strong>
            Everything in one place ✦
          </strong>
        </div>

      </div>
    </div>
  );
}

export default Auth;