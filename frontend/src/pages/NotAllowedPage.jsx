import React from "react";

const NotAllowedPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar / header */}
      <header className="bg-[#1f3a57] text-white py-5 px-6 flex items-center gap-4">
        <div className="text-3xl font-extrabold tracking-tight">Sip&Ship</div>
        <div className="ml-auto text-sm opacity-80">A premium delivery experience</div>
      </header>

      {/* Main */}
      <main className="flex-grow bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
        <div className="container mx-auto px-6 py-16 lg:py-24">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            {/* Left: text */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-7xl lg:text-[9rem] leading-none font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white/100 to-white/80 drop-shadow-lg">
                Sorry!
              </h1>

              <p className="mt-4 text-xl text-slate-300 max-w-xl">
                We can't let you in. This site is for people aged 21 and above only.
                If you're not of legal drinking age, you should not access this content.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <a
                  href="/"
                  className="inline-block px-6 py-3 rounded-full bg-white text-black font-semibold shadow-xl hover:scale-[1.02] transition"
                >
                  Reload Website
                </a>

                <a
                  href="/"
                  onClick={(e) => { /* optional second CTA */ }}
                  className="inline-block px-6 py-3 rounded-full border border-white/20 text-white/90 hover:bg-white/5 transition"
                >
                  Go back to Home
                </a>
              </div>

              <p className="mt-6 text-sm text-slate-500 max-w-md">
                Please drink responsibly. If you believe this is an error, contact support.
              </p>
            </div>

            {/* Right: illustration / graphics */}
            <div className="flex-1 w-full max-w-md">
              <div className="relative bg-gradient-to-tr from-[#0f1724] to-[#0b1220] rounded-2xl p-8 shadow-2xl border border-white/5">
                {/* Decorative ship + glass icon block (SVG) */}
                <div className="mx-auto w-56 h-56 flex items-center justify-center">
                  <svg viewBox="0 0 120 120" className="w-48 h-48 opacity-95">
                    <defs>
                      <linearGradient id="g" x1="0" x2="1">
                        <stop offset="0" stopColor="#F8FAFC" stopOpacity="0.95"/>
                        <stop offset="1" stopColor="#CBD5E1" stopOpacity="0.9"/>
                      </linearGradient>
                    </defs>

                    {/* cup outline */}
                    <rect x="18" y="10" width="84" height="100" rx="12" fill="none" stroke="url(#g)" strokeWidth="3"/>
                    {/* wine glass inside */}
                    <path d="M60 30c-8 0-14 6-14 14 0 6 4 10 9 12v8h10v-8c5-2 9-6 9-12 0-8-6-14-14-14z" fill="url(#g)"/>
                    {/* ship at bottom */}
                    <path d="M30 86h60l-6 10H36l-6-10z" fill="url(#g)"/>
                    <rect x="52" y="72" width="16" height="8" rx="1" fill="url(#g)"/>
                  </svg>
                </div>

                <div className="mt-6 text-center text-slate-400">
                  <div className="font-semibold text-white">Sip & Ship</div>
                  <p className="text-sm">Premium delivery of beverages • India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer / copyright */}
      <footer className="bg-[#0b1220] text-slate-400 py-6 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm">
            © {new Date().getFullYear()} Sip&Ship Pvt. Ltd. All rights reserved. Enjoy responsibly.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NotAllowedPage;
