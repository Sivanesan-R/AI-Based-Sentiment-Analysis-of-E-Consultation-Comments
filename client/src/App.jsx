import React, { useMemo, useState } from "react";
import { FiActivity, FiBarChart2, FiCloud, FiLoader, FiSend } from "react-icons/fi";
import { analyzeComments } from "./services/api";

const sampleText = `Great explanation and useful examples.
This policy is confusing and needs clearer details.
The dashboard looks helpful for public feedback.
The process is too slow and difficult to follow.`;

function splitComments(value) {
  return value
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function getSentimentStyle(sentiment) {
  const normalized = sentiment?.toLowerCase();

  if (normalized === "positive") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (normalized === "negative") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  if (normalized === "neutral") {
    return "border-sky-200 bg-sky-50 text-sky-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
}

export default function App() {
  const [input, setInput] = useState(sampleText);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const comments = useMemo(() => splitComments(input), [input]);

  const sentimentCounts = useMemo(() => {
    return (analysis?.results || []).reduce((counts, item) => {
      counts[item.sentiment] = (counts[item.sentiment] || 0) + 1;
      return counts;
    }, {});
  }, [analysis]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (comments.length === 0) {
      setError("Enter at least one comment.");
      return;
    }

    setLoading(true);

    try {
      const data = await analyzeComments(comments);
      setAnalysis(data);
    } catch (err) {
      setError(err.message || "Could not connect to the sentiment API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              SAMIKSHA
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-950 sm:text-4xl">
              Sentiment Analysis
            </h1>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            <FiActivity aria-hidden="true" />
            Flask API connected through Vite proxy
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <form
          onSubmit={handleSubmit}
          className="rounded-md border border-slate-200 bg-white p-5 shadow-sm"
        >
          <label htmlFor="comments" className="text-lg font-semibold text-slate-950">
            Comments
          </label>
          <textarea
            id="comments"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={14}
            className="mt-3 w-full resize-y rounded-md border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            placeholder="Enter one comment per line"
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">
              {comments.length} comment{comments.length === 1 ? "" : "s"} ready
            </p>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? <FiLoader className="animate-spin" aria-hidden="true" /> : <FiSend aria-hidden="true" />}
              {loading ? "Analyzing" : "Analyze"}
            </button>
          </div>

          {error && (
            <p className="mt-4 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
              {error}
            </p>
          )}
        </form>

        <div className="space-y-6">
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-lg font-semibold text-slate-950">
              <FiBarChart2 aria-hidden="true" />
              Result Summary
            </div>

            {analysis ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {Object.entries(sentimentCounts).map(([sentiment, count]) => (
                  <div
                    key={sentiment}
                    className={`rounded-md border px-4 py-3 ${getSentimentStyle(sentiment)}`}
                  >
                    <p className="text-sm font-medium">{sentiment}</p>
                    <p className="mt-1 text-3xl font-bold">{count}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-600">
                Submit comments to see live model output.
              </p>
            )}
          </div>

          {analysis?.graphs?.bar_graph && (
            <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-lg font-semibold text-slate-950">
                <FiBarChart2 aria-hidden="true" />
                Sentiment Graph
              </div>
              <img
                src={`data:image/png;base64,${analysis.graphs.bar_graph}`}
                alt="Sentiment distribution"
                className="mt-4 w-full rounded-md border border-slate-100"
              />
            </div>
          )}
        </div>
      </section>

      {analysis?.graphs?.wordcloud && (
        <section className="mx-auto max-w-6xl px-5 pb-6">
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-lg font-semibold text-slate-950">
              <FiCloud aria-hidden="true" />
              Word Cloud
            </div>
            <img
              src={`data:image/png;base64,${analysis.graphs.wordcloud}`}
              alt="Word cloud from submitted comments"
              className="mt-4 w-full rounded-md border border-slate-100"
            />
          </div>
        </section>
      )}

      {analysis?.results?.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-10">
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">Comment Results</h2>
            <div className="mt-4 grid gap-3">
              {analysis.results.map((item, index) => (
                <article
                  key={`${item.comment}-${index}`}
                  className="rounded-md border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <p className="text-sm leading-6 text-slate-800">{item.comment}</p>
                    <span
                      className={`shrink-0 rounded-md border px-3 py-1 text-xs font-semibold ${getSentimentStyle(item.sentiment)}`}
                    >
                      {item.sentiment}
                    </span>
                  </div>
                  {item.summary && (
                    <p className="mt-3 border-t border-slate-200 pt-3 text-sm text-slate-600">
                      {item.summary}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
