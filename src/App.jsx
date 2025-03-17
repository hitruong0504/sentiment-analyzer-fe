import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  
  useEffect(() => {
    document.title = "Sentiment Feedback Analyzer";
  }, []);

  const [feedback, setfeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/feedback")
      .then((response) => setFeedbackList(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:8080/api/feedback",
      feedback,
      {
        headers: { "Content-Type": "text/plain" },
      }
    );
    setFeedbackList([...feedbackList, response.data]);
    setfeedback("");
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "POSITIVE":
        return "bg-green-100";
      case "NEGATIVE":
        return "bg-red-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-10">
        <div className="w-full max-w-5xl bg-white/80 backdrop-blur-md shadow-2xl rounded-lg p-8">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center drop-shadow-lg">
            Sentiment Feedback Analyzer
          </h1>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-2 gap-8">
            {/* Left: Feedback Form */}
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Submit Feedback</h2>
              <form onSubmit={handleFeedbackSubmit}>
                <textarea
                  value={feedback}
                  onChange={(e) => setfeedback(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400 focus:outline-none transition-all"
                  placeholder="Enter your feedback..."
                  rows="5"
                ></textarea>
                <button
                  type="submit"
                  className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:scale-105 transform transition-all shadow-md">
                  Submit Feedback
                </button>
              </form>
            </div>

            {/* Right: Feedback History */}
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Feedback History</h2>
              <div className="overflow-auto max-h-[400px]">
                <table className="w-full text-sm text-left border border-gray-300 rounded-lg">
                  <thead className="text-gray-800 bg-gray-200">
                    <tr>
                      <th className="p-3 border-b">Feedback</th>
                      <th className="p-3 border-b">Score</th>
                      <th className="p-3 border-b">Sentiment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbackList.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-100 transition">
                        <td className="p-3">{item.content}</td>
                        <td className="p-3">{item.sentimentScore}</td>
                        <td className={`p-3 font-semibold ${getSentimentColor(item.sentiment)}`}>
                          {item.sentiment}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default App;
