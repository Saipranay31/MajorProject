"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "/public/styles/mood.css"; // Adjust the path as per your project structure

const emotions = [
  { id: 1, label: "Extremely Happy", image: "/images/extremely-happy.png" },
  { id: 2, label: "Happy", image: "/images/happy.png" },
  { id: 3, label: "Neutral", image: "/images/neutral.png" },
  { id: 4, label: "Sad", image: "/images/sad.png" },
  { id: 5, label: "Extremely Sad", image: "/images/extremely-sad.png" },
];

export default function MoodTracker() {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [note, setNote] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
    fetchMoodHistory();
  }, []);

  const fetchMoodHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/moods");
      setMoodHistory(response.data);
    } catch (err) {
      console.error("Error fetching mood history", err);
    }
  };

  const handleSaveEntry = async () => {
    if (!selectedEmotion) return;

    const newEntry = {
      image: selectedEmotion.image,
      label: selectedEmotion.label,
      note: note || "No note added.",
      date: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    try {
      await axios.post("http://localhost:5000/api/mood", newEntry);
      setMoodHistory([newEntry, ...moodHistory]);
      setSelectedEmotion(null);
      setNote("");
      fetchMoodHistory();
    } catch (err) {
      console.error("Error saving mood entry", err);
    }
  };

  return (
    <div className="app-container">
      <h1>Track Your Moods, Understand Yourself</h1>
      <p>Your Emotions Are Valid. By Tracking How You Feel, You Can Gain Insights Into Your Patterns And Build A Healthier Relationship With Your Emotions.</p>

      <div className="mood-picker-box">
        <h3>Select an Option</h3>
        <div className="emotions">
          {emotions.map((emotion) => (
            <div key={emotion.id} className="emotion-container" onClick={() => setSelectedEmotion(emotion)}>
              <button className={`emotion-button ${selectedEmotion?.id === emotion.id ? "selected" : ""}`}>
                <img src={emotion.image} alt={emotion.label} className="emotion-image" />
              </button>
              <span className="emotion-label">{emotion.label}</span>
            </div>
          ))}
        </div>

        <textarea placeholder="Add A Note (Optional)" value={note} onChange={(e) => setNote(e.target.value)}></textarea>

        <button className="save-entry" onClick={handleSaveEntry}>
          Save Entry
        </button>
      </div>

      <div className="mood-history-box">
        <h3>Mood History</h3>
        {moodHistory.length === 0 ? <p>No entries yet.</p> : moodHistory.map((entry) => (
          <div key={entry._id} className="mood-entry"> {/* Use entry._id for unique key */}
            <div className="emoji">
              <img src={entry.image} alt={entry.label} className="emotion-image" />
            </div>
            <div>
              <p className="date">{entry.date}</p>
              <p className="note">{entry.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
