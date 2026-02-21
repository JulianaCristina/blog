# 📘 Blog Platform – Multi-Author CMS + Public Site

A scalable multi-author blog platform built with **React (Vite), TypeScript, Redux Toolkit, TailwindCSS and Firebase**.

This project implements a complete blog system with a private CMS for authors and a public-facing website for readers.

---

## ✨ Features

- 🔐 Authentication (Firebase Auth)
- 📝 Private CMS for authors
- 🌍 Public blog with clean routing
- ❤️ Likes system (optimistic UI updates)
- 💬 Comment system with moderation
- 🏷 Tags and filtering
- 📦 Clean domain-driven architecture
- 🚀 Designed for future backend migration

---


## 🏗 Architecture

This project follows a **Domain + Ports/Adapters architecture**, ensuring:

- Firebase is isolated in the infrastructure layer
- Domain models are database-agnostic
- Repository contracts are defined via interfaces
- Business rules live outside UI components
- Backend can be replaced without rewriting the frontend


---

## 🧠 Technical Highlights

- Normalized Redux state management
- Optimistic updates for likes
- Soft deletes for posts and comments
- Slug reservation system for uniqueness
- Pagination-ready queries
- Role-based access control (admin / author)

---

## 🔮 Roadmap

### Phase 1
SPA with Firebase (Auth + Firestore + Storage)

### Phase 2
Migrate public site to Next.js (SSR / SSG for SEO)

### Phase 3
Replace Firebase with a custom backend (Node + Database)

---

## 🚀 Getting Started

```bash
npm install
npm run dev
