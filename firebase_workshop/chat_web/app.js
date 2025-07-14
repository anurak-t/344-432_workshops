// Firebase references
const auth = firebase.auth();
const db = firebase.firestore();
const rtdb = firebase.database();
let currentUser = null;
let currentRoom = null;

// UI elements
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginSection = document.getElementById('login-section');
const chatSection = document.getElementById('chat-section');
const roomList = document.getElementById('room-list');
const newRoomName = document.getElementById('new-room-name');
const createRoomBtn = document.getElementById('create-room-btn');
const chatRoom = document.getElementById('chat-room');
const roomTitle = document.getElementById('room-title');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Mobile navigation elements
const backButton = document.querySelector('.back-button');
const chatListContainer = document.querySelector('.chat-list-container');
const messengerInterface = document.querySelector('.messenger-interface');
const userPic = document.getElementById('user-pic'); // nav-avatar

// Google provider (ensure correct usage)
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// Mobile navigation functions
function showChatList() {
  chatRoom.classList.add('hidden');
  chatListContainer.style.display = 'block';
  currentRoom = null;
}

function showChatRoom() {
  chatRoom.classList.remove('hidden');
  chatListContainer.style.display = 'none';
}

// Back button functionality
if (backButton) {
  backButton.onclick = showChatList;
}

// Login
loginBtn.onclick = () => {
  auth.signInWithPopup(provider)
    .then(async (result) => {
      // Save profile to Firestore (ครั้งแรกเท่านั้น)
      const user = result.user;
      const profileRef = db.collection('profiles').doc(user.uid);
      const profileSnap = await profileRef.get();
      if (!profileSnap.exists) {
        await profileRef.set({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
    })
    .catch(alert);
};

// Logout
logoutBtn.onclick = () => auth.signOut();

// Auth state
auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    loginSection.classList.add('hidden');
    chatSection.classList.remove('hidden');
    if (userPic) userPic.src = user.photoURL;
    loadRooms();
    showChatList(); // เริ่มต้นที่หน้าแชทลิสต์
  } else {
    currentUser = null;
    loginSection.classList.remove('hidden');
    chatSection.classList.add('hidden');
    chatRoom.classList.add('hidden');
  }
});

function loadRooms() {
  roomList.innerHTML = '';
  rtdb.ref('rooms').on('value', snap => {
    roomList.innerHTML = '';
    const rooms = snap.val() || {};
    console.log('Rooms loaded:', rooms);
    Object.keys(rooms).forEach(roomId => {
      if (!roomId || !rooms[roomId] || !rooms[roomId].name) return;
      const chatItem = createChatItem(roomId, rooms[roomId]);
      roomList.appendChild(chatItem);
    });
  });
}

function createChatItem(roomId, roomData) {
  const chatItem = document.createElement('div');
  chatItem.className = 'chat-item';
  
  // Avatar
  const avatar = document.createElement('div');
  avatar.className = 'chat-item-avatar';
  avatar.innerHTML = '<i class="fas fa-users"></i>';
  
  // Content
  const content = document.createElement('div');
  content.className = 'chat-item-content';
  
  const name = document.createElement('div');
  name.className = 'chat-item-name';
  name.textContent = roomData.name;
  
  const preview = document.createElement('div');
  preview.className = 'chat-item-preview';
  preview.textContent = 'แตะเพื่อเริ่มการสนทนา';
  
  content.appendChild(name);
  content.appendChild(preview);
  
  // Meta
  const meta = document.createElement('div');
  meta.className = 'chat-item-meta';
  
  const time = document.createElement('div');
  time.className = 'chat-item-time';
  time.textContent = 'ตอนนี้';
  
  meta.appendChild(time);
  
  chatItem.appendChild(avatar);
  chatItem.appendChild(content);
  chatItem.appendChild(meta);
  
  // Click handler
  chatItem.onclick = () => selectRoom(roomId, roomData.name);
  
  if (currentRoom === roomId) {
    chatItem.classList.add('active');
  }
  
  return chatItem;
}

// Create room
createRoomBtn.onclick = () => {
  const name = newRoomName.value.trim();
  if (!name) return;
  const roomRef = rtdb.ref('rooms').push();
  roomRef.set({ name });
  newRoomName.value = '';
};

// Select room (แบบ Messenger)
function selectRoom(roomId, name) {
  currentRoom = roomId;
  roomTitle.textContent = name;
  showChatRoom(); // แสดงหน้าแชท
  loadMessages(roomId);
  
  // Update active state
  Array.from(roomList.children).forEach(item => item.classList.remove('active'));
  const activeItem = Array.from(roomList.children).find(item => 
    item.querySelector('.chat-item-name').textContent === name
  );
  if (activeItem) activeItem.classList.add('active');
}

// Load messages (ปรับปรุงสำหรับ Messenger UI)
function loadMessages(roomId) {
  messagesDiv.innerHTML = '';
  rtdb.ref('messages/' + currentRoom).off();
  rtdb.ref('messages/' + currentRoom).on('child_added', snap => {
    const msg = snap.val();
    const messageElement = createMessageElement(msg);
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
}

// สร้าง message element แบบ Messenger
function createMessageElement(msg) {
  const message = document.createElement('div');
  message.className = 'message' + (msg.uid === currentUser.uid ? ' me' : '');
  
  // Avatar (สำหรับข้อความของคนอื่น)
  if (msg.uid !== currentUser.uid) {
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = msg.displayName.charAt(0).toUpperCase();
    message.appendChild(avatar);
  }
  
  // Message content
  const content = document.createElement('div');
  content.className = 'message-content';
  
  // Bubble
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = msg.text;
  
  // Time
  const time = document.createElement('div');
  time.className = 'message-time';
  time.textContent = timeString(msg.createdAt);
  
  content.appendChild(bubble);
  content.appendChild(time);
  message.appendChild(content);
  
  return message;
}

// Send message (ปรับปรุงสำหรับ UI ใหม่)
sendBtn.onclick = () => {
  if (!currentRoom) return;
  const text = messageInput.value.trim();
  if (!text) return;
  
  rtdb.ref('messages/' + currentRoom).push({
    text,
    uid: currentUser.uid,
    displayName: currentUser.displayName,
    createdAt: firebase.database.ServerValue.TIMESTAMP
  });
  
  messageInput.value = '';
  
  // Auto resize input
  messageInput.style.height = 'auto';
};

// Enter to send (รองรับ Shift+Enter สำหรับขึ้นบรรทัดใหม่)
messageInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendBtn.onclick();
  }
});

// Auto-resize message input
messageInput.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 100) + 'px';
});

// Time display function
function timeString(ts) {
  const d = new Date(typeof ts === 'number' ? ts : (ts && ts.seconds ? ts.seconds * 1000 : Date.now()));
  const now = new Date();
  const diff = now - d;
  
  // ถ้าเป็นวันเดียวกัน แสดงเวลา
  if (diff < 24 * 60 * 60 * 1000 && d.getDate() === now.getDate()) {
    return d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  }
  
  // ถ้าเป็นเมื่อวาน
  const yesterday = new Date(now - 24 * 60 * 60 * 1000);
  if (d.getDate() === yesterday.getDate()) {
    return 'เมื่อวาน';
  }
  
  // แสดงวันที่
  return d.toLocaleDateString('th-TH', { month: 'short', day: 'numeric' });
}

// Update time display every minute
setInterval(() => {
  document.querySelectorAll('.message-time, .chat-item-time').forEach(timeEl => {
    // อัพเดทเวลาถ้าจำเป็น
  });
}, 60000);

// Web Notification (Firebase Cloud Messaging)
let messaging = null;
try {
  messaging = firebase.messaging();
  messaging.onMessage(payload => {
    if (Notification.permission === 'granted') {
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon
      });
    }
  });
} catch (e) {
  // messaging อาจไม่รองรับบน localhost
}
