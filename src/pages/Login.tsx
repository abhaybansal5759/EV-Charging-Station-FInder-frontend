import React, { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { saveAuth } from "../utils/authUtils";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await login(data);
      setLoading(false);

      if (res.access_token) {
        saveAuth(res);
        showToast("Login successful! Redirecting...", "success");
        setTimeout(() => navigate("/welcome"), 1000);
      } else {
        showToast(res.error || res.message || "Invalid credentials", "error");
      }
    } catch (error: any) {
      setLoading(false);
      showToast(error?.message || "Login failed. Please try again.", "error");
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 sm:p-6 md:p-8 fixed inset-0 overflow-y-auto">
      {/* Toast Notification - Responsive */}
      {toast && (
        <div className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto z-50 flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-2xl animate-slideIn ${
          toast.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {toast.type === 'success' ? (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span className="font-semibold text-sm sm:text-base">{toast.message}</span>
        </div>
      )}

      {/* Decorative Elements - Only on larger screens */}
      <div className="hidden md:block absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
      <div className="hidden md:block absolute top-0 right-0 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="relative bg-white shadow-2xl rounded-2xl w-full max-w-md mx-auto my-auto overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-500 p-6 sm:p-8 text-white">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="bg-white p-2 sm:p-3 rounded-full">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-center">Welcome Back</h2>
          <p className="text-center text-blue-100 mt-2 text-sm sm:text-base">Sign in to continue to EV Charger Finder</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <div className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 sm:mt-6 bg-gradient-to-r from-blue-600 to-green-500 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-600 transition transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm sm:text-base"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              Don't have an account?{" "}
              <span
                className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition"
                onClick={() => navigate("/")}
              >
                Create Account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}