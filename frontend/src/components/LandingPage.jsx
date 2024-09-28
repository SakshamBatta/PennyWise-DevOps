import { useEffect, useState } from "react";

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle logout and update localStorage
  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    setIsLoggedIn(false);
  };

  // Check login status when component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem("authToken");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  // Adjust chart height based on data attribute
  useEffect(() => {
    const charts = document.querySelectorAll(".chart");
    charts.forEach((chart) => {
      const chartHeight = chart.getAttribute("data-height");
      chart.style.height = `${chartHeight}%`;
    });
  }, []);

  return (
    <div className="min-h-screen font-sans">
      {/* Header with Parallax Effect */}
      <header className="relative bg-gradient-to-r from-blue-600 to-indigo-600 h-screen text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/path-to-image.jpg')",
            backgroundAttachment: "fixed",
          }}
        />

        <div className="absolute top-4 right-4 z-20 flex space-x-4">
          {isLoggedIn ? (
            <>
              <a
                href="/dashboard"
                className="bg-transparent border-2 border-yellow-400 text-white px-4 py-2 rounded-lg text-md hover:bg-yellow-400 hover:text-blue-800"
              >
                Dashboard
              </a>
              <button
                onClick={handleLogout}
                className="bg-transparent border-2 border-yellow-400 text-white px-4 py-2 rounded-lg text-md hover:bg-yellow-400 hover:text-blue-800"
              >
                Logout
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="bg-transparent border-2 border-yellow-400 text-white px-4 py-2 rounded-lg text-md hover:bg-yellow-400 hover:text-blue-800"
            >
              Login
            </a>
          )}
        </div>

        <div className="container mx-auto flex flex-col items-center justify-center h-full relative z-10">
          <h1 className="text-5xl font-extrabold text-center leading-tight animate-fade-in">
            Manage Your Finances Like a Pro
          </h1>
          <p className="mt-4 text-lg max-w-2xl text-center opacity-90 animate-slide-up">
            Track, analyze, and control your expenses effortlessly.
          </p>
          <div className="flex space-x-4 mt-8">
            <a
              href="/signup"
              className="bg-yellow-400 text-blue-800 px-6 py-3 rounded-lg text-xl transition-transform duration-300 hover:bg-yellow-500 hover:scale-105 animate-bounce"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="bg-transparent border-2 border-yellow-400 text-white px-6 py-3 rounded-lg text-xl transition-all duration-300 hover:bg-yellow-400 hover:text-blue-800"
            >
              Login
            </a>
          </div>
        </div>
      </header>

      {/* Key Features Section */}
      <section className="bg-white py-20 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-10">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: "📊",
                title: "Budgeting",
                text: "Set goals and stick to your budget easily.",
              },
              {
                icon: "📈",
                title: "Expense Analytics",
                text: "Get detailed reports of your spending habits.",
              },
              {
                icon: "💵",
                title: "Real-Time Tracking",
                text: "Track your spending in real-time, anywhere.",
              },
            ].map(({ icon, title, text }) => (
              <div
                key={title}
                className="group hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-6xl mb-4 transition-transform group-hover:scale-110 duration-300">
                  {icon}
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-gray-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="py-20 bg-gray-100 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-10">Your Financial Growth</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                color: "bg-blue-500",
                height: "70",
                label: "Monthly Income Growth",
              },
              {
                color: "bg-green-500",
                height: "50",
                label: "Expenses Reduced",
              },
            ].map(({ color, height, label }) => (
              <div key={label} className="relative">
                <div
                  className={`chart ${color} rounded-lg w-40 mx-auto`}
                  data-height={height}
                >
                  <span className="absolute text-white text-lg font-semibold bottom-0 left-1/2 transform -translate-x-1/2 mb-2">
                    {height}%
                  </span>
                </div>
                <p className="mt-4">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-200 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: "1",
                title: "Sign Up",
                text: "Create your free account in minutes.",
              },
              {
                step: "2",
                title: "Add Expenses",
                text: "Log income and expenses effortlessly.",
              },
              {
                step: "3",
                title: "Analyze Spending",
                text: "Get insights with detailed reports.",
              },
            ].map(({ step, title, text }) => (
              <div
                key={step}
                className="transform transition-transform hover:scale-105 duration-300"
              >
                <div className="text-5xl font-bold text-indigo-500">{step}</div>
                <h3 className="text-xl font-semibold mt-4">{title}</h3>
                <p className="mt-2 text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-12 text-center">
        <h3 className="text-3xl font-bold">
          Ready to take control of your finances?
        </h3>
        <br />
        <br />
        <a
          href="/signup"
          className="mt-6 bg-yellow-400 text-blue-800 py-3 px-6 rounded-lg text-xl transition-transform duration-300 hover:scale-105 hover:bg-yellow-500"
        >
          Create an Account
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-white text-center">
        <p>&copy; 2024 Expense Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}
