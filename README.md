# 🏡 Homify - Hotel Booking Web App

Homify is a full-stack **hotel and stay booking platform** inspired by modern booking services like Airbnb. Users can explore listings, Add their listings,Edit,Review,Delete etc and interact with dynamic features powered by real-time data and cloud services.

---

## 🚀 Features

- 🖼️ Add, edit, and delete property listings
- 🌍 Location-based search powered by Mapbox Geocoding API
- 📸 Cloud image uploads via Cloudinary
- 💵 Price toggle with GST/tax calculations
- 🧑‍🤝‍🧑 User authentication & authorization
- ✨ Flash messages for feedback
- 🧹 Clean and modular MVC architecture
- 📄 RESTful APIs for scalable and organized backend

---

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Bootstrap, EJS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Templating Engine**: EJS
- **Cloud Storage**: Cloudinary
- **Maps & Location**: Mapbox Geocoding API
- **Authentication**: Passport.js with sessions
- **Framework Structure**: MVC (Model-View-Controller)

---

## 📦 Installation & Setup (Run Locally)

### 1. Clone the Repository

### 2. Install the Dependencies

### 3.Configure Environment Variables
<pre>```env
SECRET=yourSessionSecret
ATLASDB_URL=yourMongoDBAtlasURL
MAP_TOKEN=yourMapboxAccessToken

CLOUD_NAME=yourCloudinaryCloudName
CLOUD_API_KEY=yourCloudinaryAPIKey
CLOUD_API_SECRET=yourCloudinaryAPISecret
```env</pre>

### 4.Run the Server
```<code>node app.js</code>

