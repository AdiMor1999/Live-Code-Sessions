# Live-Code-Sessions
Welcome to Live Code Sessions! 🎉

Live Code Sessions is a real-time online coding web application designed to facilitate remote mentoring and collaborative coding sessions. The application enables a mentor to share code with a student, observe their coding process in real-time. This project is built using modern web technologies including TypeScript, React, Node.js, and MongoDB, and leverages Socket.io for real-time communication.

Features
Lobby Page:
A simple, accessible lobby page where users can choose from a list of pre-defined code blocks.
Each code block is a piece of JavaScript code, presented with a title and content.

Code Block Page:
Role-Based Viewing: The first user to access the code block page is designated as the mentor (view-only mode), while subsequent users are students (editable mode).
Real-Time Collaboration: Code changes made by the student are instantly visible to the mentor and other connected clients via WebSockets.
Syntax Highlighting: Uses Highlight.js to render JavaScript code with syntax highlighting for better readability and learning.

Bonus Feature:
A “solution” feature that recognizes when the student’s code matches a pre-defined solution, displaying a smiley face to indicate success.

Technologies Used
Frontend: React with TypeScript for building a robust, type-safe user interface.
Backend: Node.js with Express to handle API requests and Socket.io for real-time WebSocket communication.
Database: MongoDB for storing and retrieving code blocks.
Deployment: Hosted on free cloud services for both the frontend and backend to ensure easy access and demonstration.

Installation and Setup
To run this project locally, follow these steps:
