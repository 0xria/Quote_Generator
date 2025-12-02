import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState({ content: "", author: "" });
  const [fade, setFade] = useState(false);

  // Fallback quotes in case the API fails
  const fallbackQuotes = [
    { content: "Keep pushing, queen!", author: "Ria" },
    { content: "Small steps every day.", author: "Ria" },
    { content: "Dream big, start small.", author: "Ria" },
  ];

  async function getQuote() {
    setFade(false);

    try {
      const res = await fetch("https://type.fit/api/quotes");
      const data = await res.json();

      // Make sure we have an array
      const quoteArray = Array.isArray(data) ? data : fallbackQuotes;

      // Pick a random quote
      const random = quoteArray[Math.floor(Math.random() * quoteArray.length)];

      // Some quotes have null authors
      const author = random.author ? random.author : "Unknown";

      setTimeout(() => {
        setQuote({ content: random.text || random.content || random.content, author });
        setFade(true);
      }, 150);
    } catch (err) {
      // If fetch fails, use fallback
      const random = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setQuote(random);
      setFade(true);
    }
  }

  function changeBackground() {
    const colors = [
      "#000080", "#2C2C54", "#4ECCA3", "#3B3C98",
      "#2D6E7E", "#41436A", "#C879FF", "#4D9DE0",
    ];
    document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
  }

  function copyQuote() {
    navigator.clipboard.writeText(`"${quote.content}" — ${quote.author}`);
  }

  function tweetQuote() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.content}" — ${quote.author}`)}`;
    window.open(url, "_blank");
  }

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="container">
      <p className="quote-text" style={{ opacity: fade ? 1 : 0 }}>
        "{quote.content}"
      </p>
      <p className="quote-author">— {quote.author}</p>

      <div className="actions">
        <button onClick={() => { getQuote(); changeBackground(); }}>
          New Quote
        </button>
        <button onClick={copyQuote}>Copy</button>
        <button onClick={tweetQuote}>Tweet</button>
      </div>
    </div>
  );
}

export default App;
