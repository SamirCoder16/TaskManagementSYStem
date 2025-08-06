<h1 align="center">📦 Task Management Microservices Architecture</h1>

<p align="center">
  <img src="./taskmanagement.jpg" alt="Architecture Diagram" width="700"/>
</p>

---

<h2>🔧 Tech Stack</h2>

<ul>
  <li><strong>Node.js</strong> - JavaScript runtime</li>
  <li><strong>Express.js</strong> - Web framework for Node.js</li>
  <li><strong>Docker</strong> - Containerization for each microservice</li>
  <li><strong>RabbitMQ</strong> - Message Queue system for async communication</li>
  <li><strong>Mongoose</strong> - MongoDB object modeling for Node.js</li>
  <li><strong>JWT</strong> - Authentication via JSON Web Tokens</li>
  <li><strong>Cookie-Parser</strong> - Parse cookies in incoming requests</li>
  <li><strong>Bcrypt</strong> - Password hashing</li>
  <li><strong>Morgan</strong> - HTTP request logger</li>
  <li><strong>Nodemon</strong> - Auto restart server on changes (dev only)</li>
</ul>

---

<h2>📌 Overview</h2>

This project is a microservices-based task management system where different services handle separate responsibilities. All services are containerized using Docker and communicate via RabbitMQ for async, decoupled message handling.

---

<h2>📈 Data Flow</h2>

<ol>
  <li><strong>Step 1:</strong> User sends API requests from <code>Postman</code> to either <strong>User Service</strong> or <strong>Task Service</strong>.</li>
  <li><strong>Step 2:</strong> 
    <ul>
      <li>The <strong>User Service</strong> interacts with its MongoDB container for user-related data (registration, login, etc).</li>
      <li>The <strong>Task Service</strong> handles task creation, updates, and stores them in its own MongoDB instance.</li>
    </ul>
  </li>
  <li><strong>Step 3:</strong> 
    <strong>Task Service</strong> pushes a message to the <strong>Message Queue (RabbitMQ)</strong> after task creation or update.
  </li>
  <li><strong>Step 4:</strong> 
    <strong>Notification Service</strong> listens to the Message Queue and consumes the task-related event.
  </li>
  <li><strong>Step 5:</strong> 
    Notification Service sends a notification (e.g., email, log, or message) and optionally stores the notification log in its own MongoDB.
  </li>
</ol>

---

<h2>📦 Microservices</h2>

<ul>
  <li><strong>User Service:</strong> Handles user auth (JWT, bcrypt, cookie-parser) and user CRUD.</li>
  <li><strong>Task Service:</strong> Handles creation, update, and retrieval of tasks.</li>
  <li><strong>Notification Service:</strong> Listens to RabbitMQ and sends out notifications.</li>
  <li><strong>Message Queue:</strong> RabbitMQ handles communication between Task → Notification asynchronously.</li>
</ul>

---

<h2>🚀 How to Run (in Dev)</h2>

```bash
# Start all services using Docker
docker-compose up --build
