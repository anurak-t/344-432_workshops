const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// [WORKSHOP] เชื่อมต่อ MongoDB
const mongoose = require('mongoose');
// TODO: connect mongo db ที่ mongodb server
mongoose.connect("ToDo: ใส่ URI ของ MongoDB ที่เชื่อมต่อไว้ที่นี่");

// [WORKSHOP] สร้าง Schema
const postSchema = new mongoose.Schema({
  // TODO: กำหนด field ต่างๆ
  // เฉลย:
  title: String,
  content: String,
  author: String,
  tags: [String],
  createdAt: Date,
  views: Number,
  comments: [{ user: String, text: String, createdAt: Date }]
});
const Post = mongoose.model('Post', postSchema);


// [WORKSHOP] GET /posts?page=1&pageSize=5&tag=xxx
app.get('/posts', async (req, res) => {
  // TODO: query ข้อมูลจาก MongoDB พร้อม filter, pagination
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;
  const tag = req.query.tag;
  const filter = tag ? { tags: tag } : {};
  // TODO: query posts with pagination and filter by tag
  const posts = await Post.find();
  const total = posts.length;
  
  res.json({ posts, total });
});


// [WORKSHOP] GET /tags
app.get('/tags', async (req, res) => {
  // TODO: aggregate tags
  const tags = await Post.aggregate([
    { $unwind: '$tags' },
    // Todo : group by tags and count
  ]);
  res.json(tags);
});


// [WORKSHOP] GET /posts/:id
app.get('/posts/:id', async (req, res) => {
    const id = req.params.id;
  // TODO: query post by id
  const post = null // ToDo: query post by id
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});


// [WORKSHOP] POST /posts
app.post('/posts', async (req, res) => {
  // TODO: create post ใน MongoDB
  const { title, content, author, tags } = req.body;
  const newPost = null // ToDo: create new post
  res.status(201).json(newPost);
});


// [WORKSHOP] POST /posts/:id/comments
app.post('/posts/:id/comments', async (req, res) => {
  // TODO: add comment ใน MongoDB
  // เฉลย:
  const { user, text } = req.body;
  const comment = { user, text, createdAt: new Date() };
  const post = null // ToDo: find post by id and add comment
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.status(201).json(comment);
});


// [WORKSHOP] PUT /posts/:id/views
app.put('/posts/:id/views', async (req, res) => {
  // TODO: update views ใน MongoDB
  // เฉลย:
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json({ views: post.views });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Backend running on port', PORT);
});
