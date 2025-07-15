# Firebase NoSQL Workshop: Realtime Database vs Firestore

## เป้าหมาย
- เข้าใจความแตกต่างระหว่าง Firebase Realtime Database และ Firestore
- รู้จัก Firebase และ บริการต่างๆ ที่เกี่ยวข้อง
- สร้างเว็บแชทด้วย Firebase ที่ใช้ Realtime Database, Firestore, authentication, และ Hosting

---

## เปรียบเทียบ Realtime Database vs Firestore

| คุณสมบัติ                | Realtime Database                | Firestore                        |
|--------------------------|----------------------------------|----------------------------------|
| โครงสร้างข้อมูล          | JSON Tree                        | Collection & Document (NoSQL)    |
| การ Query                | จำกัด, ไม่ซับซ้อน                | Query ซับซ้อนได้, Index อัตโนมัติ|
| Real-time                |    จุดเด่น                       |    รองรับ                       |
| Scaling                  | เหมาะกับข้อมูล real-time         | เหมาะกับข้อมูลขนาดใหญ่          |
| Use Case                 | Chat, Presence, IoT              | Profile, Static, Analytics       |

**ตัวอย่างการเลือกใช้งาน**
- Firestore: เก็บ profile, ข้อมูลผู้ใช้, ข้อมูล static
- Realtime Database: เก็บข้อความแชท, ข้อมูลที่ต้องการ sync real-time

---

## Workshop: สร้างเว็บแชทด้วย Firebase

### ฟีเจอร์
- Login ด้วย Google (Firebase Auth)
- เก็บ profile ผู้ใช้ใน Firestore
- สร้างห้องแชท/แชทตรง
- เก็บข้อความแชทใน Realtime Database
- Deploy ด้วย Firebase Hosting

### โครงสร้างโปรเจกต์
```
firebase_workshop/
  README.md
  chat_web/
    index.html
    style.css
    app.js
    firebase-config.js
```

---

## ขั้นตอน Lab
1. สร้าง Firebase Project และเปิดใช้งาน Auth, Firestore, Realtime Database, Hosting
2. ตั้งค่า Google Login ใน Firebase Auth
3. Clone ตัวอย่างโค้ดใน `chat_web/`
4. ตั้งค่า `firebase-config.js` ด้วย config ของโปรเจกต์
5. ทดสอบ Login, สร้างห้อง, ส่งข้อความ
6. Deploy ขึ้น Firebase Hosting
   - ติดตั้ง Firebase CLI (ครั้งแรก):
     ```
     npm install -g firebase-tools
     ```
   - Login Firebase:
     ```
     firebase login
     ```
   - Init Hosting (ครั้งแรก):
     ```
     firebase init hosting
     ```
     - เลือกโปรเจกต์ Firebase ที่ต้องการ
     - เลือก public directory เป็น `.`
     - ตอบ No สำหรับ SPA rewrite
     - ตอบ No สำหรับ GitHub Action
     - ตอบ No สำหรับ Overwrite index.html
   - Deploy:
     ```
     firebase deploy --only hosting
     ```
   - เปิด URL ที่ Firebase แจ้งหลัง deploy สำเร็จ

---
