function shuffle (src) {
  const copy = [...src];
  const length = copy.length;
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

const { useState, useEffect } = React;

const words = [ "designer", "professional", "user", "experience", "development", "managing", "teams", "progress", "projects", "program"];

const max_strikes = 2;

function App () {
  const [i, setI] = useState(0);
  const [scrambled, setScrambled] = useState(words[0] ? shuffle(words[0]) : "")
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [msg, setMsg] = useState("");
  const [over, setOver] = useState(false);

useEffect(() => {
  const save = JSON.parse(localStorage.getItem("game") || "null");
  if (save) {
    setI(save.i);
    setScore(save.score);
    setStrikes(save.strikes);
    setOver(save.over);
    setScrambled(save.scrambled);
  }
}, []);

useEffect(() => {
  localStorage.setItem("game", JSON.stringify({
    i, score, strikes, over, scrambled
  }));
}, [i, score, strikes, over, scrambled]);

function submit(e) {
  e.preventDefault();
  if(over || !words[i]) return;

if (guess === words[i]) {
  setScore(score + 1);
  setMsg("Correct");
  next();
}

else {
let s = strikes + 1;
setStrikes(s);
setMsg("Wrong");

if (s >= max_strikes) setOver(true);
}

setGuess("");

  }

function next() {
  if (i + 1 >=words.length) {
    setOver(true);
    return;
  }

  setI(i + 1);
  setScrambled(shuffle(words[i + 1]));

}

return (
  <div>
    <h2>Scramble</h2>
    <p> Score: {score} Strikes: {strikes}/{max_strikes}</p>
    <p>{over ? "Game Over" : scrambled}</p>
    
    <form onSubmit={submit}>
    <input value={guess} onChange={(e) => setGuess(e.target.value)} disabled={over} />
    <button type="submit" disabled={over}>Submit</button>
    </form> 
    </div>
);
}
const root = ReactDOM.createRoot(document.getElementById("root")); root.render(<App />);