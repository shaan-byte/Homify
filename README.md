🏡 Homify - Hotel Booking Web App
Homify is a full-stack hotel and stay booking platform, inspired by modern booking services 
Users can explore listings, add their own properties, edit, review, delete, and interact with dynamic features powered by real-time data and cloud services.

🚀 Features

🖼️ Add, edit, and delete property listings (CRUD Operations)

🔎 Search functionality to find listings based on name, location, or keywords

🏷️ Category-based listings for easy browsing (e.g., beach stays, mountain retreats, city hotels)

🌍 Location-based services powered by Mapbox Geocoding API

📸 Cloud image uploads and storage via Cloudinary

💵 Price toggle with GST/Tax calculations

🛡️ Server-side validation for clean and secure data

🧹 Clean and modular MVC architecture

🧑‍🤝‍🧑 User authentication & authorization using Passport.js

✨ Flash messages for real-time user feedback

📄 RESTful APIs for structured backend operations

---
🛠️ Technologies Used

Frontend: HTML, CSS, JavaScript, Bootstrap, EJS

Backend: Node.js, Express.js

Database: MongoDB Atlas

Templating Engine: EJS

Authentication: Passport.js

Maps & Location Services: Mapbox Geocoding API

Cloud Storage: Cloudinary

Architecture Pattern: MVC (Model-View-Controller)

---

## 📦 Installation & Setup (Run Locally)

### 1. Clone the Repository
<pre> git clone URL </pre>

### 2. Install the Dependencies
<pre> npm install </pre>

### 3.Configure Environment Variables in root directory
<pre>```env
SECRET=yourSessionSecret
ATLASDB_URL=yourMongoDBAtlasURL
MAP_TOKEN=yourMapboxAccessToken

CLOUD_NAME=yourCloudinaryCloudName
CLOUD_API_KEY=yourCloudinaryAPIKey
CLOUD_API_SECRET=yourCloudinaryAPISecret
```env</pre>

### 4.Run the Server
<pre> ``` node app.js ``` </pre>>

