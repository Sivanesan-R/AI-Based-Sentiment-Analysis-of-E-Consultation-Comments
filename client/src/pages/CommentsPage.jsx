import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function CommentsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const comments = location.state?.comments || [];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-3xl mx-auto bg-white/90 border border-gray-300 rounded-xl p-6 shadow-md space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-emerald-600 text-center">
          All Comments (Post {id})
        </h1>

        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-emerald-300/40 transition"
              >
                <p>{typeof comment === "string" ? comment : comment.comment}</p>
                {typeof comment !== "string" && (
                  <div className="mt-3 space-y-1 text-sm">
                    <p className="font-semibold text-emerald-700">
                      Sentiment: {comment.sentiment}
                    </p>
                    {comment.summary && (
                      <p className="text-gray-600">Summary: {comment.summary}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No comments available.</p>
        )}

        <div className="text-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 shadow-md transition"
          >
            Back to Post
          </button>
        </div>
      </div>
    </div>
  );
}
