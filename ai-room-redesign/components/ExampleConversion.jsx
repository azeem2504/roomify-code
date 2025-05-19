import React from "react";

export default function ExampleConversion() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-black text-center">
        See How AI Converts Your Room
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col items-center">
          <img
            src="/showcaseold.jpg"
            alt="Original Room"
            className="rounded-lg shadow-md w-full h-64 object-cover"
          />
          <p className="text-center text-black mt-2 font-medium">Original Room</p>
        </div>

        {/* Funky animated arrow as flex item */}
        <div className="hidden md:flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 text-gray-700"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>



        </div>

        <div className="flex-1 flex flex-col items-center">
          <img
            src="/modern.png"
            alt="AI Redesigned Room"
            className="rounded-lg shadow-md w-full h-64 object-cover"
          />
          <p className="text-center text-black mt-2 font-medium">AI Redesigned Room</p>
        </div>
      </div>
    </div>
  );
}
