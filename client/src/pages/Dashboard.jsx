import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { posts } from "../data/posts";
import { analyzeComments } from "../services/api";

export default function Dashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analyzed, setAnalyzed] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedPost = posts.find((p) => String(p.id) === id);

  const sentimentCounts = useMemo(() => {
    return (analysis?.results || []).reduce((counts, item) => {
      counts[item.sentiment] = (counts[item.sentiment] || 0) + 1;
      return counts;
    }, {});
  }, [analysis]);

  const combinedSummary = useMemo(() => {
    const summaries = (analysis?.results || [])
      .map((item) => item.summary)
      .filter(Boolean);

    return summaries.length
      ? summaries.join(" ")
      : "No summary was generated for these comments.";
  }, [analysis]);

  if (!selectedPost) {
    return (
      <div className="text-red-500 text-center mt-10 font-semibold text-lg">
        Post not found.
      </div>
    );
  }

  const comments = selectedPost.comments || [];
  const imageClasses = "rounded-lg w-full max-w-full object-contain";

  async function handleAnalyze() {
    setLoading(true);
    setError("");

    try {
      const data = await analyzeComments(comments);
      setAnalysis(data);
      setAnalyzed(true);
    } catch (err) {
      setError(err.message || "Unable to analyze comments.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-white text-gray-800 flex flex-col items-center py-6 px-4 space-y-6">
      <div className="w-full max-w-4xl bg-white rounded-xl p-6 shadow-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          {selectedPost.title}
        </h1>
        <p className="text-gray-700 mb-4">{selectedPost.description}</p>
        {!analyzed && (
          <button
            onClick={handleAnalyze}
            disabled={loading || comments.length === 0}
            className="px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-gray-300 transition-colors duration-200"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        )}
        {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
      </div>

      {analyzed && (
        <>
          <div className="w-full max-w-4xl flex flex-col items-center rounded-xl p-4">
            <h2 className="text-2xl font-semibold text-emerald-600 mb-3">
              Word Cloud
            </h2>
            {analysis?.graphs?.wordcloud ? (
              <img
                src={`data:image/png;base64,${analysis.graphs.wordcloud}`}
                alt="Word Cloud"
                className={imageClasses}
              />
            ) : (
              <p className="text-gray-500">Word cloud is not available.</p>
            )}
          </div>

          <div className="w-full max-w-4xl rounded-xl p-4">
            <h2 className="text-2xl font-semibold text-emerald-600 mb-2">
              Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {combinedSummary}
            </p>
          </div>

          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center rounded-xl p-3">
              <h2 className="text-xl font-semibold text-emerald-600 mb-3 text-center">
                Graph Visualization
              </h2>
              {analysis?.graphs?.bar_graph ? (
                <img
                  src={`data:image/png;base64,${analysis.graphs.bar_graph}`}
                  alt="Sentiment distribution graph"
                  className={imageClasses}
                />
              ) : (
                <p className="text-gray-500">Graph is not available.</p>
              )}
            </div>
            <div className="flex flex-col items-center rounded-xl p-3">
              <h2 className="text-xl font-semibold text-emerald-600 mb-3 text-center">
                Model Response
              </h2>
              <div className="w-full space-y-2">
                {Object.entries(sentimentCounts).map(([sentiment, count]) => (
                  <div
                    key={sentiment}
                    className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-gray-800"
                  >
                    <span className="font-medium">{sentiment}</span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full max-w-4xl rounded-xl p-4">
            <h2 className="text-2xl font-semibold text-emerald-600 mb-3">
              Comments
            </h2>
            <div className="space-y-2">
              {(analysis?.results || []).slice(0, 2).map((result, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg text-gray-800">
                  <p>{result.comment}</p>
                  <p className="mt-2 text-sm font-semibold text-emerald-700">
                    {result.sentiment}
                  </p>
                </div>
              ))}
              <button
                onClick={() =>
                  navigate(`/comments/${selectedPost.id}`, {
                    state: { comments: analysis?.results || [] },
                  })
                }
                className="mt-3 px-6 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors duration-200"
              >
                Show All Comments
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
