// [WORKSHOP] Seed script for MongoDB
const mongoose = require('mongoose');
const posts = require('./mockPosts');

// [WORKSHOP] สร้าง schema และ model (เติม code ด้านล่าง)
const postSchema = new mongoose.Schema({
  // TODO: กำหนด field ต่างๆ
  title: String,
  content: String,
  author: String,
  tags: [String],
  createdAt: Date,
  views: Number,
  comments: [{ user: String, text: String, createdAt: Date }]
});
const Post = mongoose.model('Post', postSchema);

async function seed() {
  const uri = "ToDo: ใส่ URI ของ MongoDB ที่เชื่อมต่อไว้ที่นี่";
  await mongoose.connect(uri);
  await Post.deleteMany({});
  await Post.insertMany(posts);
  console.log('Seeded 20 posts!');
  await mongoose.disconnect();
}

seed();
