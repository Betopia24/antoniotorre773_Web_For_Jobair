# MANIFEX - AI-Powered English Learning Platform (Client Website)

Welcome to the **MANIFEX Client Web Application**, the public-facing interface of the MANIFEX ecosystem.  
This platform empowers users to **learn English effectively** through AI-driven exercises, personalized tasks, and real-time progress tracking — all within a modern, multilingual experience.

This repository contains the **client-side web app** that users interact with, including both:
- The **public website** (landing pages, pricing, about, contact, etc.).
- The **authenticated learning platform** (for registered and subscribed users).

---

## 🌍 Key Highlights

### 1. **AI-Powered Learning**
- Personalized English learning experiences driven by AI.
- Interactive exercises, quizzes, and conversations tailored to each user’s level.
- Real-time feedback and performance insights.

### 2. **Multi-Language Interface**
- Built-in translation system to support users from different linguistic backgrounds.
- Dynamic text translation across all pages and content.
- Users can easily switch between languages from the interface.

### 3. **Public Pages**
- **Home Page** – Overview of MANIFEX’s features and benefits.  
- **Pricing Page** – Displays available subscription plans and payment options.  
- **About Page** – Information about the platform’s mission, vision, and team.  
- **Contact Page** – Form and details for reaching out to support or inquiries.  
- **FAQ Page** – Common questions about the learning process, billing, and platform usage.

### 4. **User Dashboard (Authenticated Area)**
- Personalized dashboard showing progress, rewards, and recommended lessons.
- Interactive AI tasks such as grammar correction, vocabulary games, and pronunciation exercises.
- Access to premium content for subscribed users.
- Real-time notifications about tasks, achievements, and subscription updates.

### 5. **Subscription & Payments**
- Secure subscription management integrated with Stripe.
- Automatic handling of trials, renewals, and plan upgrades.
- Visual indication of active plans and expiry dates.

### 6. **Rewards System**
- Earn points or rewards for completing daily learning tasks.
- Redeem rewards for access to premium content or exclusive videos.

### 7. **User Profile & Settings**
- Manage personal information, profile picture, and preferences.
- Update password, language, and notification settings.
- View and manage subscription details.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js / React  
- **State Management:** Zustand  
- **Styling:** Tailwind CSS + Shadcn UI  
- **Language Support:** i18next (or similar multi-language framework)  
- **Authentication:** JWT-based with persisted session handling  
- **Payments:** Stripe integration  
- **AI Integration:** OpenAI / Custom NLP APIs for interactive English learning  

---

## 🔒 Authentication Flow

1. **Public Users** can browse the website, explore features, and view pricing.  
2. **Registered Users** can sign in to access learning modules and track progress.  
3. **Subscribed Users** gain full access to premium content and AI-powered features.  

User authentication state is managed using **Zustand** with persistent local storage.

---

## 🌐 Multi-Language Support

The MANIFEX client provides dynamic translation across all major pages and UI elements.  
Languages are automatically loaded based on user preference or browser locale, ensuring a smooth, localized experience.

---

## 📧 Support

If you encounter any issues, please contact our support team at:  
**support@manifex.ai**

---

## 🧠 About MANIFEX

MANIFEX is an AI-driven platform that blends technology and linguistics to create an engaging and personalized English learning journey.  
Whether you’re a beginner or an advanced learner, MANIFEX adapts to your goals and helps you progress effectively.
