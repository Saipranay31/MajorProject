"use client"
import React, { useState } from "react";


const emotions = [
  { id: 1, label: "Extremely Happy", emoji: "😊" },
  { id: 2, label: "Happy", emoji: "😀" },
  { id: 3, label: "Neutral", emoji: "😐" },
  { id: 4, label: "Sad", emoji: "🙁" },
  { id: 5, label: "Extremely Sad", emoji: "😢" },
];

export default function MoodTracker() {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [note, setNote] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);

  const handleSaveEntry = () => {
    if (!selectedEmotion) return;

    const newEntry = {
      id: Date.now(),
      emoji: selectedEmotion.emoji,
      label: selectedEmotion.label,
      note: note || "No note added.",
      date: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    setMoodHistory([newEntry, ...moodHistory]);
    setSelectedEmotion(null);
    setNote("");
  };

  return (
    <div className="app-container">
      <h1>Track Your Moods, Understand Yourself</h1>
      <p>
        Your Emotions Are Valid. By Tracking How You Feel, You Can Gain Insights
        Into Your Patterns And Build A Healthier Relationship With Your
        Emotions.
      </p>

      {/* Emotion Picker */}
      <div className="mood-picker">
        <h3>Select An Option</h3>
        <div className="emotions">
          {emotions.map((emotion) => (
            <button
              key={emotion.id}
              className={`emotion-button ${
                selectedEmotion?.id === emotion.id ? "selected" : ""
              }`}
              onClick={() => setSelectedEmotion(emotion)}
            >
              <span className="emoji">{emotion.emoji}</span>
              <span>{emotion.label}</span>
            </button>
          ))}
        </div>

        <textarea
          placeholder="Add A Note (Optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>

        <button className="save-entry" onClick={handleSaveEntry}>
          Save Entry
        </button>
      </div>

      {/* Mood History */}
      <div className="mood-history">
        <h3>Mood History</h3>
        {moodHistory.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          moodHistory.map((entry) => (
            <div key={entry.id} className="mood-entry">
              <div className="emoji">{entry.emoji}</div>
              <div>
                <p className="date">{entry.date}</p>
                <p className="note">{entry.note}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
