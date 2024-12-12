"use client";
import React, { useState } from "react";
import "/public/styles/story.css"; // Your custom styles

export default function StoryGenerator() {
  const [userInput, setUserInput] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
  const [showStoryBox, setShowStoryBox] = useState(false);

  // Utility function to sanitize text
  const sanitizeText = (text) => {
    return text
      .replace(/[*]/g, "") // Remove asterisks
      .replace(/[\/]/g, "") // Remove slashes
      .replace(/\n/g, "<br />") // Replace newlines with HTML line breaks
      .trim(); // Remove extra whitespace from the beginning and end
  };

  const handleGenerateStory = async () => {
    if (!userInput) {
      alert("Please enter a prompt!");
      return;
    }

    try {
      console.log("Sending prompt:", userInput);

      // Make the POST request to the API route
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      // Handle unsuccessful API response
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error occurred");
      }

      const data = await response.json();
      console.log("Response data:", data);

      // Sanitize the story content from the API response
      const sanitizedStory = sanitizeText(data.story || "No story generated.");
      setGeneratedStory(sanitizedStory);
      setShowStoryBox(true);
    } catch (error) {
      console.error("Error:", error.message);
      setGeneratedStory(`Error: ${error.message}`);
      setShowStoryBox(true);
    }
  };

  return (
    <div className="app-container">
      <h1>Need A Boost Of Inspiration?</h1>
      <p>
        Discover motivational stories crafted just for you. Let AI brighten your
        day with tales of resilience, hope, and positivity.
      </p>
      <textarea
        className="user-input"
        placeholder="Type your prompt here..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button className="generate-button" onClick={handleGenerateStory}>
        Generate Story
      </button>

      {/* Conditionally render the story box */}
      {showStoryBox && (
        <div className="output-box">
          {/* Use `dangerouslySetInnerHTML` to render sanitized HTML */}
          <p dangerouslySetInnerHTML={{ __html: generatedStory }}></p>
        </div>
      )}
    </div>
  );
}
