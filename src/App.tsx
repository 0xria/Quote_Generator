import { useState } from 'react';
import './App.css';

type Quote = {
  content: string;
  author: string;
};

function App() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://api.quotable.io/random"));
      console.log("Response status:", res.status);
      const data: Quote = await res.json();
      console.log("Fetched data:", data);
      if (!res.ok) throw new Error("Failed to fetch quote");
      setQuote(data);
    } catch (err) {
      console.error(err);
      setError("Could not fetch quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Quote Generator</h1>
      <button onClick={fetchQuote} disabled={loading}>
        {loading ? "Loading..." : "Get Quote"}
      </button>

      {error && <p className="error">{error}</p>}

      {quote && (
        <div className="quote-card">
          <p className="quote">"{quote.content}"</p>
          <p className="author">- {quote.author}</p>
        </div>
      )}
    </div>
  );
}

export default App;
