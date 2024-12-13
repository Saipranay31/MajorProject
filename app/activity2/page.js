"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import "/public/styles/activity2.css";

const RelaxationActivities = () => {
  const [audio, setAudio] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  // Relaxing Sounds Data
  const relaxingSounds = [
    {
      label: "Ocean Waves 🌊",
      audio: "/assets/ocean.mp3",
      image: "/images/oceanwaves.jpg",
      video: "/videos/oceanwaves.mp4",
    },
    {
      label: "Rainfall 🌧️",
      audio: "/assets/rainfall.mp3",
      image: "/images/rainfall.jpg",
      video: "/videos/rainfall.mp4",
    },
    {
      label: "Forest Ambience 🌲",
      audio: "/assets/forest.mp3",
      image: "/images/forest.jpg",
      video: "/videos/forest.mp4",
    },
  ];

  // Play Sound and Set Video
  const playSound = (audioSrc, videoSrc) => {
    if (audio) {
      audio.pause(); // Stop any currently playing audio
    }
    const newAudio = new Audio(audioSrc);
    newAudio.play();
    setAudio(newAudio); // Save the audio instance
    setCurrentVideo(videoSrc); // Set the video source
  };

  // Stop Audio When Dialog Closes
  const stopAudio = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // Reset audio to the beginning
      setAudio(null); // Clear audio reference
    }
  };

  return (
    <div className="container">
      <h1>Calm Your Mind With These Activities</h1>
      <p className="subtitle">"Find Your Peace"</p>

      {/* Relaxing Sounds Section */}
      <div className="box-container">
        <h2>Relaxing Sounds</h2>
        <p className="description">"Immerse Yourself In Peaceful Sounds"</p>

        <div className="sound-container">
          {relaxingSounds.map((sound, index) => (
            <div className="sound-card" key={index}>
              <img src={sound.image} alt="Cover" className="cover-image" />
              <div className="sound-details">
                <span>{sound.label}</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="play-button"
                      onClick={() => playSound(sound.audio, sound.video)}
                    >
                      ▶
                    </button>
                  </DialogTrigger>
                  <DialogContent className="popup-content" onClose={stopAudio}>
                    <DialogHeader>
                      <DialogTitle>{sound.label} Video</DialogTitle>
                      <DialogDescription>
                        Enjoy the visuals along with the sounds.
                      </DialogDescription>
                    </DialogHeader>
                    <div style={{ width: "100%", textAlign: "center" }}>
                      <video
                        key={currentVideo} // Force video re-render
                        src={currentVideo}
                        controls
                        autoPlay
                        className="popup-video"
                      />
                    </div>
                    <DialogClose asChild>
                      <button className="close-button" onClick={stopAudio}>
                        Close
                      </button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Games Section */}
      <div className="box-container">
        <h2>Games For Relaxation</h2>
        <p className="description">
          "Engage Your Brain And Relax With Simple, Fun Games"
        </p>
        <div className="games-container">
          <div className="game-card">
            <img src="/images/sudoku.jpg" alt="Sudoku" className="cover-image" />
            <span>Sudoku</span>
          </div>
          <div className="game-card">
            <img src="/images/chess.jpg" alt="Chess" className="cover-image" />
            <span>Chess</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelaxationActivities;
