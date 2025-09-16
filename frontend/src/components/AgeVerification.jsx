import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AgeVerification = () => {
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  // Show on every reload => do NOT use localStorage (so stays true on reload)
  useEffect(() => {
    setShowPopup(true);
  }, []);

  const handleYes = () => {
    setShowPopup(false); // allow access for this page load
  };

  const handleNo = () => {
    // Redirect to the custom "not allowed" page
    navigate("/not-allowed");
  };

  if (!showPopup) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <div
        className="w-full max-w-xl mx-4 rounded-2xl p-8 md:p-10 bg-gradient-to-br from-slate-800/80 to-black/60 border border-white/10 shadow-2xl
                   transform-gpu animate-agePopup"
        style={{ backdropFilter: "blur(6px)" }}
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Are you above <span className="text-emerald-300">21</span>?
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
            This website contains alcoholic products. You must be of legal drinking age to enter.
          </p>

          <div className="mt-8 flex justify-center gap-5">
            <button
              onClick={handleYes}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-600 text-black font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              Yes
            </button>

            <button
              onClick={handleNo}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              No
            </button>
          </div>

          <p className="mt-6 text-xs text-slate-400 max-w-lg mx-auto">
            By entering you agree to our Terms & Conditions and Privacy Policy.
          </p>
        </div>
      </div>

      {/* Tailwind keyframe via inline <style> for quick use if you don't want to edit tailwind.config.js */}
      <style>{`
        @keyframes agePopup {
          0% { opacity: 0; transform: translateY(10px) scale(0.98); }
          60% { opacity: 1; transform: translateY(-6px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-agePopup { animation: agePopup 420ms cubic-bezier(.2,.8,.2,1); }
      `}</style>
    </div>
  );
};

export default AgeVerification;
