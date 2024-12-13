"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import "/public/styles/activity3.css";

const RelaxingActivities = () => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  // Workout Data
  const workouts = [
    {
      label: "Running",
      description: "A Great Way To Boost Endorphins And Clear Your Mind.",
      image: "/images/running.jpg",
      content:
        "Running is one of the best ways to enhance cardiovascular health. It also releases endorphins, improving mood and mental clarity. Make sure to wear the right footwear!",
        
    },
    {
      label: "Swimming",
      description: "Feel Lighter And Refreshed With This Full-Body Workout.",
      image: "/images/swimming.jpg",
      content:
        "Swimming works all major muscle groups while being easy on the joints. Enjoy the cool water as you exercise your body and mind.",
    },
    {
      label: "Boxing",
      description: "Release Stress And Channel Your Energy Into Strength.",
      image: "/images/boxing.jpg",
      content:
        "Boxing is a high-intensity workout that improves strength and coordination. It’s a great way to release stress and build self-confidence.",
    },
    {
      label: "Yoga",
      description: "Stretch, Strengthen, And Find Inner Peace.",
      image: "/images/yoga.jpg",
      content:
        "Yoga helps improve flexibility, balance, and mindfulness. Take some time to connect your body and mind through intentional poses and breathing exercises.",
    },
    {
      label: "Dancing",
      description: "Turn Up The Music And Let Loose!",
      image: "/images/dancing.jpg",
      content:
        "Dancing is a fun way to stay fit while enjoying music. Groove to your favorite beats and let your body express itself!",
    },
  ];

  return (
    <div className="container">
      <h1>Get Moving With These Workouts</h1>
      <p className="subtitle">"Explore Activities You Can Do Anytime, Anywhere"</p>

      <div className="box-container">
        {workouts.map((workout, index) => (
          <div className="workout-card" key={index}>
            <div className="workout-image">
              <img src={workout.image} alt={workout.label} />
            </div>
            <div className="workout-details">
              <h3>{workout.label}</h3>
              <p>{workout.description}</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="plus-button"
                  onClick={() => setSelectedWorkout(workout)}
                >
                  +
                </button>
              </DialogTrigger>
              {selectedWorkout && selectedWorkout.label === workout.label && (
                <DialogContent className="popup-content">
                  <DialogHeader>
                    <DialogTitle>{selectedWorkout.label}</DialogTitle>
                    <DialogDescription>
                      Detailed Information About {selectedWorkout.label}.
                    </DialogDescription>
                  </DialogHeader>
                  <img
                    src={selectedWorkout.image}
                    alt={selectedWorkout.label}
                    className="popup-image"
                  />
                  <div className="popup-text">
                    <p>{selectedWorkout.content}</p>
                  </div>
                  <DialogClose asChild>
                    <button
                      className="close-button"
                      onClick={() => setSelectedWorkout(null)}
                    >
                      Close
                    </button>
                  </DialogClose>
                </DialogContent>
              )}
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelaxingActivities;
