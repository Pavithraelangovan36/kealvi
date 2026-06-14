"use client";

import { useState } from "react";

type Question = {
  id: string;
  body: string;
  author: string | null;
  votes: number;
};

export default function QuestionsList({
  initialQuestions,
}: {
  initialQuestions: Question[];
}) {
  const [questions, setQuestions] = useState(initialQuestions);

  const increaseVote = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, votes: q.votes + 1 } : q
      )
    );
  };

  return (
    <div className="p-4">
      <h1>Live Q&A</h1>

      <h2>Questions Count: {questions.length}</h2>

      {questions.map((q) => (
        <div
          key={q.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{q.body}</h3>

          <p><strong>Author:</strong> {q.author}</p>

          <p><strong>Votes:</strong> {q.votes}</p>

          <button onClick={() => increaseVote(q.id)}>
            👍 Vote
          </button>
        </div>
      ))}
    </div>
  );
}