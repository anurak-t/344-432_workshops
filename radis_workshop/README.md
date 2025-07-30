# 🚀 Redis Workshop

## 🔍 What is Redis?

**Redis** (Remote Dictionary Server) is an open-source, in-memory data store used as a **database**, **cache**, and **message broker**. Because Redis stores data in memory (RAM), it delivers extremely fast read/write performance.

👉 **In short**: Redis is super fast and perfect for use cases that need real-time access.

---

## 🧰 Key Features of Redis

| Feature              | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| 🧠 In-Memory Storage  | Stores all data in RAM for ultra-fast access.                              |
| 💾 Persistence        | Supports saving data to disk using RDB snapshots or AOF logs.              |
| 🧱 Data Structures     | Offers strings, lists, sets, sorted sets, hashes, streams, and more.       |
| 🔁 Replication        | Master-slave replication for improved availability and scalability.        |
| 📣 Pub/Sub Messaging  | Enables real-time messaging using publish/subscribe patterns.              |
| 🔄 Transactions       | Executes multiple commands as an atomic operation.                         |
| 🧙 Lua Scripting      | Allows server-side logic using Lua scripts.                                |
| 🛡 High Availability  | Redis Sentinel monitors instances and handles automatic failover.          |
| 🌐 Clustering         | Redis Cluster enables sharding and horizontal scaling across nodes.        |

---

## 📦 Common Use Cases

| Use Case         | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| ⚡ Caching         | Temporarily store frequently accessed data (e.g., API results, DB queries). |
| 📬 Message Queue   | Use Redis Lists or Streams for inter-service communication.                |
| 🔐 Session Store   | Save user session data for web or mobile applications.                     |

---

## 🧪 Hands-on Lab

> In this lab, you'll implement caching using Redis.

### Instructions:

1. Open your terminal.
2. Navigate to the lab folder:
   ```bash
   cd ./caching_workshop
3. Follow to README.md
