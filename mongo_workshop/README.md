# MongoDB Workshop: CRUD & Aggregation

## 1. Project Setup

1.1 Clone or download this repository.

1.2 ติดตั้ง Node.js และ npm (ถ้ายังไม่มี)

1.3 ติดตั้ง dependencies backend:
```sh
cd backend
npm install
```

1.4 ติดตั้ง MongoDB ด้วย Docker (แนะนำ):
```sh
cd ../mongodb_docker
docker-compose up -d
```

1.5 ตรวจสอบว่า MongoDB รันอยู่ที่ `mongodb://localhost:27017`

---

## 2. โครงสร้างโปรเจกต์

- backend/ (Node.js + Express)
- frontend/ (HTML/JS/CSS)
- mongodb_docker/ (docker-compose สำหรับ MongoDB)

---

## 3. Workshop: CRUD & Aggregation

### 3.1 เชื่อมต่อ MongoDB
- เปิดไฟล์ `backend/app.js`
- เพิ่มโค้ดเชื่อมต่อ MongoDB ด้วย mongoose
- ตัวอย่าง (เติม code ในช่องว่าง):

```js
// [WORKSHOP] เชื่อมต่อ MongoDB
const mongoose = require('mongoose');
// TODO: connect mongo db ที่ mongodb://localhost:27017/mongoworkshop
// await mongoose.connect('mongodb://localhost:27017/mongoworkshop');
```

---

### 3.2 สร้าง Schema และ Model
- สร้าง schema สำหรับ post (title, content, author, tags, createdAt, views, comments)
- ตัวอย่าง (เติม code ในช่องว่าง):

```js
// [WORKSHOP] สร้าง Schema
const postSchema = new mongoose.Schema({
  // TODO: กำหนด field ต่างๆ
});
const Post = mongoose.model('Post', postSchema);
```

---

### 3.3 CRUD API
- แก้ไข endpoint `/posts`, `/posts/:id`, `/tags`, `/posts/:id/comments`, `/posts/:id/views` ให้ query กับ MongoDB
- ตัวอย่าง (เติม code ในช่องว่าง):

```js
// [WORKSHOP] GET /posts
app.get('/posts', async (req, res) => {
  // TODO: query ข้อมูลจาก MongoDB
});
```

---

### 3.4 Aggregate Tags
- ใช้ aggregate pipeline เพื่อรวม tag และนับจำนวน post ต่อ tag
- ตัวอย่าง (เติม code ในช่องว่าง):

```js
// [WORKSHOP] GET /tags
app.get('/tags', async (req, res) => {
  // TODO: aggregate tags
});
```

---

### 3.5 Seed Mock Data
- สร้าง script สำหรับ seed mock data 20 รายการ (ดูไฟล์ `seed.js`)
- ตัวอย่าง (เติม code ในช่องว่าง):

```js
// [WORKSHOP] สร้าง seed.js
// TODO: สร้าง mock data 20 รายการ เกี่ยวกับ MongoDB
```
