import React, { useState } from "react";
import logo from "/logo.png"; // Import the logo
import { useNavigate, Navigate } from "react-router-dom";
import { Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const imageUrl = "/login.jpg";

const LoginRegister: React.FC = () => {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, register, loading, error, user } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "login") {
      await login(email, password);
      navigate("/", { replace: true });
    } else {
      await register(name, email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      {/* Login/Register Container */}
      <div className="relative z-10 w-full bg-white overflow-hidden grid lg:grid-cols-2 min-h-screen">
        {/* Left Panel - Image */}
        <div className="hidden md:block relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={imageUrl}
              src={imageUrl}
              alt="Login Illustration"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>{" "}
          {/* Slightly darker gradient for better text contrast */}
          <div className="absolute bottom-0 left-0 p-10 text-white z-10">
            {" "}
            {/* Ensure text is above image and gradient */}
            <h1 className="text-4xl font-bold tracking-tight drop-shadow-lg">
              SmartSpend
            </h1>
            <p className="mt-2 text-lg text-white/90">
              Your financial journey starts here. Secure and seamless
              access.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full p-6 sm:p-8 md:p-12 flex flex-col justify-center lg:overflow-y-auto">
          {" "}
          {/* Added lg:overflow-y-auto for larger screens if needed, default overflow for smaller screens */}
          <div className="mb-6 text-center">
            <img
              src={logo}
              alt="SmartSpend Logo"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#4338CA]">
              {tab === "login"
                ? "Sign in to SmartSpend"
                : "Create your SmartSpend account"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {tab === "login"
                ? "Welcome back! Access your dashboard."
                : "Join us and take control of your finances."}
            </p>
          </div>
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-200 rounded-full p-1 shadow-inner">
              {["login", "register"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t as "login" | "register")}
                  className={`px-5 py-2 sm:px-6 rounded-full font-medium text-sm transition-all duration-300 ease-out ${
                    tab === t
                      ? "bg-gradient-to-r from-[#4338CA] to-[#6366F1] text-white shadow-md" // Adjusted primary color
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-300/50"
                  }`}
                >
                  {t === "login" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.form
              key={tab}
              onSubmit={handleSubmit}
              className="space-y-6 min-h-[26rem]" // Added min-h to prevent page jump
              initial={{ opacity: 0, y: 20 }} // Softer y-axis animation
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} // Softer y-axis animation
              transition={{ duration: 0.3, ease: "easeInOut" }} // Faster, softer easing
            >
              {tab === "register" && (
                <div>
                  <label
                    htmlFor="fullName"
                    className="block mb-1.5 text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-[#4338CA] focus:outline-none focus:border-[#4338CA] focus:bg-white transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block mb-1.5 text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-[#4338CA] focus:outline-none focus:border-[#4338CA] focus:bg-white transition-all duration-200"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-1.5 text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-[#4338CA] focus:outline-none focus:border-[#4338CA] focus:bg-white transition-all duration-200"
                    placeholder="••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#4338CA] p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-700 bg-red-100 border border-red-400 p-3 rounded-lg shadow-md flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#4338CA] to-[#6366F1] text-white font-semibold rounded-lg hover:shadow-xl shadow-lg transition-all duration-300 ease-out transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-md disabled:hover:-translate-y-0"
              >
                {loading
                  ? tab === "login"
                    ? "Signing in..."
                    : "Creating account..."
                  : tab === "login"
                  ? "Sign In"
                  : "Get Started"}
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                {tab === "login" ? (
                  <>
                    New to SmartSpend?{" "}
                    <button
                      type="button"
                      onClick={() => setTab("register")}
                      className="text-[#4338CA] font-semibold hover:underline"
                    >
                      Create account
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setTab("login")}
                      className="text-[#4338CA] font-semibold hover:underline"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </motion.form>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
