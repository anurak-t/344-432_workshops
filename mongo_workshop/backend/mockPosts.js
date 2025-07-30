const mongoose = require('mongoose');

const posts = [
  {
    title: 'Introduction to MongoDB',
    content: 'MongoDB is a NoSQL database for modern apps.',
    author: 'alice',
    tags: ['mongodb', 'database', 'nosql'],
    createdAt: new Date(),
    views: 10,
    comments: [
      { user: 'bob', text: 'Great intro!', createdAt: new Date() }
    ]
  },
  {
    title: 'CRUD Operations in MongoDB',
    content: 'Learn how to create, read, update, and delete documents.',
    author: 'bob',
    tags: ['mongodb', 'crud'],
    createdAt: new Date(),
    views: 5,
    comments: []
  },
  {
    title: 'Aggregation Framework',
    content: 'Powerful data processing in MongoDB.',
    author: 'carol',
    tags: ['mongodb', 'aggregation'],
    createdAt: new Date(),
    views: 8,
    comments: []
  },
  {
    title: 'Indexing in MongoDB',
    content: 'Improve query performance with indexes.',
    author: 'dave',
    tags: ['mongodb', 'index'],
    createdAt: new Date(),
    views: 12,
    comments: []
  },
  {
    title: 'Schema Design Best Practices',
    content: 'Tips for designing flexible schemas.',
    author: 'eve',
    tags: ['mongodb', 'schema'],
    createdAt: new Date(),
    views: 7,
    comments: []
  },
  {
    title: 'Transactions in MongoDB',
    content: 'Multi-document transactions explained.',
    author: 'frank',
    tags: ['mongodb', 'transaction'],
    createdAt: new Date(),
    views: 6,
    comments: []
  },
  {
    title: 'MongoDB Atlas Overview',
    content: 'Cloud MongoDB with Atlas.',
    author: 'grace',
    tags: ['mongodb', 'atlas', 'cloud'],
    createdAt: new Date(),
    views: 9,
    comments: []
  },
  {
    title: 'Data Modeling in MongoDB',
    content: 'Embed vs Reference.',
    author: 'alice',
    tags: ['mongodb', 'modeling'],
    createdAt: new Date(),
    views: 11,
    comments: []
  },
  {
    title: 'Working with Arrays',
    content: 'Array operators and queries.',
    author: 'bob',
    tags: ['mongodb', 'array'],
    createdAt: new Date(),
    views: 4,
    comments: []
  },
  {
    title: 'Text Search in MongoDB',
    content: 'Full-text search features.',
    author: 'carol',
    tags: ['mongodb', 'text', 'search'],
    createdAt: new Date(),
    views: 13,
    comments: []
  },
  {
    title: 'Geospatial Queries',
    content: 'Location-based data in MongoDB.',
    author: 'dave',
    tags: ['mongodb', 'geo'],
    createdAt: new Date(),
    views: 3,
    comments: []
  },
  {
    title: 'Change Streams',
    content: 'Real-time data changes.',
    author: 'eve',
    tags: ['mongodb', 'change', 'stream'],
    createdAt: new Date(),
    views: 2,
    comments: []
  },
  {
    title: 'Backup and Restore',
    content: 'How to backup and restore MongoDB.',
    author: 'frank',
    tags: ['mongodb', 'backup', 'restore'],
    createdAt: new Date(),
    views: 5,
    comments: []
  },
  {
    title: 'Sharding in MongoDB',
    content: 'Scale out with sharding.',
    author: 'grace',
    tags: ['mongodb', 'sharding'],
    createdAt: new Date(),
    views: 6,
    comments: []
  },
  {
    title: 'Replication',
    content: 'High availability with replica sets.',
    author: 'alice',
    tags: ['mongodb', 'replication'],
    createdAt: new Date(),
    views: 7,
    comments: []
  },
  {
    title: 'Security Best Practices',
    content: 'Keep your data safe.',
    author: 'bob',
    tags: ['mongodb', 'security'],
    createdAt: new Date(),
    views: 8,
    comments: []
  },
  {
    title: 'Performance Tuning',
    content: 'Optimize your MongoDB.',
    author: 'carol',
    tags: ['mongodb', 'performance'],
    createdAt: new Date(),
    views: 9,
    comments: []
  },
  {
    title: 'Working with Dates',
    content: 'Date queries and operators.',
    author: 'dave',
    tags: ['mongodb', 'date'],
    createdAt: new Date(),
    views: 10,
    comments: []
  },
  {
    title: 'MongoDB with Node.js',
    content: 'Integrate MongoDB in Node.js apps.',
    author: 'eve',
    tags: ['mongodb', 'nodejs'],
    createdAt: new Date(),
    views: 11,
    comments: []
  },
  {
    title: 'Monitoring MongoDB',
    content: 'Tools and techniques for monitoring.',
    author: 'frank',
    tags: ['mongodb', 'monitoring'],
    createdAt: new Date(),
    views: 12,
    comments: []
  }
];

module.exports = posts;
