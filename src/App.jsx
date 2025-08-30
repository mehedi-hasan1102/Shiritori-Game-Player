import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [playerTurn, setPlayerTurn] = useState("player1");
  const [wordHistory, setWordHistory] = useState([]);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [currentWord, setCurrentWord] = useState("");
  const [timer, setTimer] = useState(30);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) {
      setScores({ ...scores, [playerTurn]: scores[playerTurn] - 1 });
      nextTurn();
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Switch turn
  const nextTurn = () => {
    setPlayerTurn(playerTurn === "player1" ? "player2" : "player1");
    setTimer(30);
    setCurrentWord("");
  };

  // Validation
  const isValidStart = (word) => {
    if (wordHistory.length === 0) return true;
    const lastWord = wordHistory[wordHistory.length - 1].word;
    return lastWord.slice(-1).toLowerCase() === word[0].toLowerCase();
  };

  const isValidStructure = (word) => word.length >= 4 && !wordHistory.map(w => w.word).includes(word);

  const checkWordMeaning = async (word) => {
    try {
      const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      return res.data && res.data.length > 0;
    } catch {
      return false;
    }
  };

  // Handle word submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validMeaning = await checkWordMeaning(currentWord);
    const isValid = isValidStart(currentWord) && isValidStructure(currentWord) && validMeaning;

    // Update word history
    setWordHistory([
      ...wordHistory,
      { word: currentWord, valid: isValid }
    ]);

    // Update score
    setScores({
      ...scores,
      [playerTurn]: isValid ? scores[playerTurn] + 1 : scores[playerTurn] - 1
    });

    nextTurn();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Shiritori Game</h1>
{/* How to Play */}
<div className="max-w-3xl w-full bg-white p-5 rounded-lg shadow-md mb-6">
  <h2 className="text-2xl font-semibold mb-2 text-gray-800">How to Play</h2>
  <ul className="list-disc list-inside text-gray-700">
    <li>Players take turns entering words.</li>
    <li>Each new word must start with the last letter of the previous word.</li>
    <li>Words cannot be repeated.</li>
    <li>Each word must be a valid English word (checked via DictionaryAPI).</li>
    <li>Minimum 4 letters per word.</li>
    <li>Correct words earn +1 point; invalid words earn 0 points.</li>
    <li>Timer: each player has 30 seconds per turn.</li>
    <li>The game ends when you stop entering words, and the player with highest score wins.</li>
  </ul>
</div>

      {/* Scoreboard */}
      <div className="flex w-full max-w-3xl justify-between mb-6 gap-4">
        {["player1", "player2"].map((player) => (
          <div
            key={player}
            className={`flex-1 p-5 rounded-lg text-white shadow-lg transition-colors duration-300
              ${playerTurn === player ? (player === "player1" ? "bg-blue-600" : "bg-green-600") : "bg-gray-400"}`}
          >
            <h2 className="text-2xl font-semibold">{player === "player1" ? "Player 1" : "Player 2"}</h2>
            <p className="text-xl mt-2">Score: {scores[player]}</p>
          </div>
        ))}
      </div>

      {/* Timer */}
      <div className="w-full max-w-3xl h-5 bg-gray-300 rounded mb-6 overflow-hidden shadow-inner">
        <div
          className={`h-5 ${playerTurn === "player1" ? "bg-blue-500" : "bg-green-500"} transition-all duration-1000`}
          style={{ width: `${(timer / 30) * 100}%` }}
        ></div>
      </div>

      {/* Input Section */}
      <form onSubmit={handleSubmit} className="flex w-full max-w-3xl mb-6">
        <input
          type="text"
          value={currentWord}
          onChange={(e) => setCurrentWord(e.target.value)}
          className="flex-1 border border-gray-400 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          placeholder="Enter word"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-r-lg font-semibold transition-colors"
        >
          Submit
        </button>
      </form>

      {/* Word History */}
      <div className="max-w-3xl w-full bg-white p-5 rounded-lg shadow-lg overflow-y-auto max-h-64">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Word History</h2>
        <div className="flex flex-wrap gap-3">
          {wordHistory.map((entry, index) => (
            <span
              key={index}
              className={`px-4 py-2 rounded-full text-white shadow-sm ${
                entry.valid ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {entry.word}
            </span>
          ))}
        </div>

        
      </div>
      
    </div>
  );
}

export default App;
