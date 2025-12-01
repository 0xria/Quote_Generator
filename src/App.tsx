import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [fade, setFade] = useState(false);

  async function getQuote() {
    setFade(false);

    try {
      const res = await fetch("https://api.quotable.io/random");
      const data = await res.json();

      setTimeout(() => {
        setQuote(data.content);
        setAuthor(data.author);
        setFade(true);
      }, 150);

      changeBackground();
    } catch {
      setQuote("Could not fetch quote 😭");
      setAuthor("");
    }
  }

  function changeBackground() {
    const colors = [
      "#000080",
      "#2C2C54",
      "#2C2C54",
      "#4ECCA3",
      "#3B3C98",
      "#2D6E7E",
      "#41436A",
      "#C879FF",
      "#4D9DE0",
    ];
    const random = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = random;
  }

  function copyQuote() {
    navigator.clipboard.writeText(`"${quote}" — ${author}`);
  }

  function tweetQuote() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote}" — ${author}`
    )}`;
    window.open(url, "_blank");
  }

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="container">
      <p className="quote-text" style={{ opacity: fade ? 1 : 0 }}>
        "{quote}"
      </p>
      <p className="quote-author">— {author}</p>

      <div className="actions">
        <button onClick={getQuote}>New Quote</button>
        <button onClick={copyQuote}>Copy</button>
        <button onClick={tweetQuote}>Tweet</button>
      </div>
    </div>
  );
}

export default App;
