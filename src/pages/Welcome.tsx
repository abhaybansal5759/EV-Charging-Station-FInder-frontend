import React from "react";
import Navbar from "../components/Navbar";
import { getUser } from "../utils/authUtils";

export default function Welcome() {
  const user = getUser();

  const features = [
    {
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
      title: "Find Stations",
      description: "Locate nearby EV charging stations with real-time availability"
    },
    {
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      title: "Fast Charging",
      description: "Access high-speed DC fast chargers for quick power-ups"
    },
    {
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "24/7 Available",
      description: "Round-the-clock charging stations for your convenience"
    },
    {
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      title: "Verified Network",
      description: "Trusted and verified charging infrastructure partners"
    }
  ];

  const stats = [
    { label: "Charging Stations", value: "50K+", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { label: "Active Users", value: "100K+", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
    { label: "Cities Covered", value: "500+", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Content */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome back, <span className="text-slate-700">{user?.name}</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover and navigate to EV charging stations with ease
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <svg className="w-7 h-7 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {features.map((feature, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-md transition group">
                <div className="inline-flex p-3 rounded-lg bg-slate-100 mb-4 group-hover:bg-slate-200 transition">
                  <svg className="w-7 h-7 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Charge?</h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Discover thousands of charging stations and plan your next electric journey
            </p>
            <button className="bg-white text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg">
              Explore Stations Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}