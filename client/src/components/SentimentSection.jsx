import React from "react";

export default function SentimentSection() {
  const quotes = [
    "Data is the new oil, but insights are the engine.",
    "Understanding sentiments is understanding people.",
    "Knowledge grows when we analyze and summarize effectively."
  ];

  return (
    <section className="bg-slate-50 text-slate-800 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-4">
          Sentiment Analysis & Monitoring
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-12">
          Insights for Knowledge, Summarization, Highlighting & Analysis
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-200 transition"
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="text-emerald-500 text-3xl">❝</span>
              </div>
              <p className="italic text-gray-700 text-sm sm:text-base leading-relaxed mt-4">
                {quote}
              </p>
              <div className="mt-4 text-right">
                <span className="text-emerald-600 font-medium text-xs sm:text-sm">
                  — Insight Team
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
