import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState({ content: "", author: "" });
  const [fade, setFade] = useState(false);

  async function getQuote() {
    setFade(false);
    try {
      const res = await fetch("https://type.fit/api/quotes");
      const data = await res.json();

      setTimeout(() => {
        setQuote({ content: data.content, author: data.author });
        setFade(true);
      }, 150);

    } catch {
      setQuote({
        content: "Could not fetch quote 😭",
        author: "",
      });
      setFade(true);
    }
  }

  function changeBackground() {
    const colors = [
      "#000080",
      "#2C2C54",
      "#4ECCA3",
      "#3B3C98",
      "#2D6E7E",
      "#41436A",
      "#C879FF",
      "#4D9DE0",
    ];
    document.body.style.background =
      colors[Math.floor(Math.random() * colors.length)];
  }

  function copyQuote() {
    navigator.clipboard.writeText(`"${quote.content}" — ${quote.author}`);
  }

  function tweetQuote() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote.content}" — ${quote.author}`
    )}`;
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
