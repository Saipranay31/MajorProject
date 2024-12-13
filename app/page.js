import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Welcome to the Application</h1>
      <p>Choose a page to navigate:</p>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "1rem 0" }}>
            <Link href="/mood" style={{ fontSize: "1.2rem", color: "blue", textDecoration: "underline" }}>
              Go to Mood Tracker
            </Link>
          </li>
          <li style={{ margin: "1rem 0" }}>
            <Link href="/story" style={{ fontSize: "1.2rem", color: "blue", textDecoration: "underline" }}>
              Go to Storytelling
            </Link>
          </li>
          <li style={{ margin: "1rem 0" }}>
            <Link href="/activity1" style={{ fontSize: "1.2rem", color: "blue", textDecoration: "underline" }}>
              go to activity
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
