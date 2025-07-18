# 🚀 DevHub

DevHub is a React TypeScript application to search GitHub users and explore their repositories. It utilizes GitHub's public API and provides an interactive and modern UI for developers to browse projects easily.

---

## 🧰 Tech Stack

- ⚛️ React (TypeScript)
- 🎨 Material UI (MUI)
- 🔍 React Query
- 🧪 Jest + React Testing Library (RTL)
- 🍃 Axios
- 📦 CRA

---

## 📦 Features

- 🔍 Search GitHub users
- 📁 Expand to see user repositories
- ⭐ See repository stars and descriptions
- ✅ Smooth UX with loading, error, and empty states
- 🧪 Full test coverage with Jest + RTL
- 🌐 GitHub API integration (with token support)

---

## ⚙️ Getting Started

### 1. Clone the Repo

git clone https://github.com/ersaadgp/DevHub.git
cd devhub

### 2. Install Dependencies

npm install

# or

yarn

### 3. Set Up Environment Variables

- reate a .env file by copying the .env.example
  cp .env.example .env

- Then update your .env:
  VITE_GITHUB_TOKEN=your_personal_access_token

---

### 🚀 Running the App

npm start

# or

yarn start

---

### 🧪 Running Tests (with coverage)

npm test -- --coverage

# or

yarn test --coverage

---

### 🛠️ Scripts

start -> Start development server
build -> Create production build
test -> Run unit tests

---

### 📁 Folder Structure

**test**/ # Unit tests
src/
├── components/ # UI Components
├── hooks/ # Custom React Hooks (e.g., useGetUsers, useGetUserRepos)
├── pages/ # App pages (Home, UserProjects, NotFound)
├── utils/ # Axios instance, formatters
├── App.tsx # Main app entry
└── main.tsx # ReactDOM renderer
