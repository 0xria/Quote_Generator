import { useEffect, useState } from "react";
import "./App.css";

export default function QuoteBox() {
  const [quote, setQuote] = useState({ content: "", author: "" });
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    try {
      setError("");

      const res = await fetch("https://type.fit/api/quotes"); // mobile-safe
    
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      // Random quote
      const random = data[Math.floor(Math.random() * data.length)];

      setQuote({
        content: random.text,
        author: random.author || "Unknown",
      });

    } catch (err) {
      console.error(err);
      setError("Could not fetch quote 😭");
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quote-box">
      <p className="quote">
        {error ? error : `"${quote.content}"`}
      </p>

      <p className="author">— {quote.author}</p>

      <div className="buttons">
        <button onClick={fetchQuote}>New Quote</button>
        <button onClick={() => navigator.clipboard.writeText(quote.content)}>
          Copy
        </button>
        <button
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?text="${quote.content}" — ${quote.author}`
            )
          }
        >
          Tweet
        </button>
      </div>
    </div>
  );
}
