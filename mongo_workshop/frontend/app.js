document.addEventListener('DOMContentLoaded', function() {
  // Backend API URL
  const API_URL = 'http://localhost:3001';

  // Pagination variables
  let page = 1;
  const pageSize = 5;
  let totalPages = 1;
  let postsCache = [];
  let currentTag = null;

  // Fetch and render tags
  async function fetchTags() {
    const res = await fetch(`${API_URL}/tags`);
    const tags = await res.json();
    document.getElementById('aggregateTags').innerHTML = '<b>Top Tags:</b> ' + tags.map(t => `<span class="tag tag-clickable" data-tag="${t._id}">${t._id} (${t.count})</span>`).join(' ');
    // Add click event for tag filter
    document.querySelectorAll('.tag-clickable').forEach(el => {
      el.onclick = function() {
        handleTagFilter(this.getAttribute('data-tag'));
      };
    });
  }

  // Fetch and render posts
  async function fetchPosts() {
    let url = `${API_URL}/posts?page=${page}&pageSize=${pageSize}`;
    if (currentTag) {
      url += `&tag=${encodeURIComponent(currentTag)}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    postsCache = data.posts;
    totalPages = Math.ceil(data.total / pageSize);
    renderPosts();
    renderPagination();
    renderTagFilterInfo();
  }

  function renderTagFilterInfo() {
    const infoDiv = document.getElementById('tagFilterInfo');
    if (!infoDiv) return;
    if (currentTag) {
      infoDiv.innerHTML = `กำลังกรองด้วยแท็ก <b>${currentTag}</b> <button id=\"clearTagFilter\" class=\"clear-tag-filter\">ล้างตัวกรอง</button>`;
      document.getElementById('clearTagFilter').onclick = function() {
        currentTag = null;
        page = 1;
        fetchPosts();
      };
    } else {
      infoDiv.innerHTML = '';
    }
  }

  function handleTagFilter(tag) {
    currentTag = tag;
    page = 1;
    fetchPosts();
  }

  function renderPosts() {
    document.getElementById('postList').innerHTML = postsCache.map(post => `
      <div class="post">
        <div class="post-title" onclick="showPost('${post._id}')">${post.title}</div>
        <div class="post-meta">โดย ${post.author} | ${new Date(post.createdAt).toLocaleString()} | <span>${post.views} views</span></div>
        <div class="post-content">${post.content.length > 120 ? post.content.slice(0,120)+'...' : post.content}</div>
        <div class="tags">${(post.tags||[]).map(tag => `<span class='tag'>${tag}</span>`).join(' ')}</div>
      </div>
    `).join('');
  }
 
  function renderPagination() {
    let html = '';
    if (totalPages > 1) {
      html += `<button ${page === 1 ? 'disabled' : ''} onclick="handlePageChange(${page - 1})">&lt;</button> `;
      for (let i = 1; i <= totalPages; i++) {
        html += `<button ${i === page ? 'class=\'active\'' : ''} onclick="handlePageChange(${i})">${i}</button> `;
      }
      html += `<button ${page === totalPages ? 'disabled' : ''} onclick="handlePageChange(${page + 1})">&gt;</button>`;
    }
    document.getElementById('pagination').innerHTML = html;
  }

  window.handlePageChange = function(newPage) {
    if (newPage < 1 || newPage > totalPages) return;
    page = newPage;
    fetchPosts();
  }

  // Modal แสดงรายละเอียดกระทู้ (dynamic)
  window.showPost = async function(id) {
    // update view count
    await fetch(`${API_URL}/posts/${id}/views`, { method: 'PUT' });
    const res = await fetch(`${API_URL}/posts/${id}`);
    const post = await res.json();
    let commentsHtml = (post.comments||[]).map(c => `
      <div class=\"comment\"><span class=\"comment-user\">${c.user}</span><span class=\"comment-date\">${new Date(c.createdAt).toLocaleString()}</span>: ${c.text}</div>
    `).join('');
    if (!commentsHtml) commentsHtml = '<i>ยังไม่มีคอมเมนต์</i>';
    document.getElementById('modalContent').innerHTML = `
      <h2>${post.title}</h2>
      <div class=\"post-meta\">โดย ${post.author} | ${new Date(post.createdAt).toLocaleString()} | <span>${post.views} views</span></div>
      <div class=\"post-content\">${post.content}</div>
      <div class=\"tags\">${(post.tags||[]).map(tag => `<span class='tag'>${tag}</span>`).join(' ')}</div>
      <div class=\"comments\">
        <b>ความคิดเห็น</b>
        ${commentsHtml}
      </div>
    `;
    document.getElementById('modal').style.display = 'flex';
    // Show comment form
    const addCommentForm = document.getElementById('addCommentForm');
    if (addCommentForm) {
      addCommentForm.style.display = '';
      addCommentForm.onsubmit = async function(e) {
        e.preventDefault();
        const user = document.getElementById('commentUser').value.trim();
        const text = document.getElementById('commentText').value.trim();
        if (!user || !text) return;
        await fetch(`${API_URL}/posts/${id}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user, text })
        });
        addCommentForm.reset();
        // reload post detail
        window.showPost(id);
      };
    }
  };
  document.getElementById('closeModal').onclick = () => { document.getElementById('modal').style.display = 'none'; };
  window.onclick = e => { if (e.target === document.getElementById('modal')) document.getElementById('modal').style.display = 'none'; };

  // Submit new post
  document.getElementById('postForm').onsubmit = async function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;
    const tags = document.getElementById('tags').value;
    await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, author, tags })
    });
    page = 1;
    await fetchPosts();
    await fetchTags();
    document.getElementById('postForm').reset();
  };

  // Initial load
  fetchTags();
  fetchPosts();
});
