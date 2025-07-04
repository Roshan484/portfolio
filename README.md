# 🧑‍💻 Roshan Aryal – Portfolio

This is the codebase for my **personal developer portfolio**, built using the [T3 Stack](https://create.t3.gg/). It showcases my skills, projects, and development philosophy.

> Designed to be fast, minimal, and scalable – just like the apps I love building.

---

## 🔗 Live Demo

🌍 [https://yourdomain.dev](https://yourdomain.dev)  
*Replace with your actual domain*

---

## 🛠️ Tech Stack

Built using the modern **T3 Stack**:

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, ShadCN UI
- **API Layer**: tRPC + Zod
- **ORM**: Drizzle (PostgreSQL)
- **Deployment**: Vercel
- **Animations**: Framer Motion
- **Environment**: bun, .env, .eslint, Prettier

---

## 🧱 Features

- 🖥️ Responsive design (mobile-first)
- 🚀 Lightning-fast performance
- 🧩 Modular component architecture
- 📂 Clean project structure using `app/` directory
- ⚙️ Easy to maintain and scale
- 🔍 SEO-ready and optimized for sharing

---

## 📁 Project Structure

```bash
.
├── app/                  # App Router pages, layouts
├── components/           # Reusable UI components
├── server/               # tRPC routes, Database schema and server-side logic
├── lib/                  # Utilities (auth, helpers)
├── styles/               # Global styles and Tailwind config
├── public/               # Static files (images, icons, etc.)
├── env.mjs               # Environment variables definition
├── drizzle.config.ts     # Drizzle configs
└── ...


🚀 Getting Started
Clone the repo and install dependencies:

bash
Copy
Edit
git clone https://github.com/roshanaryal/portfolio.git
cd portfolio

bun install
cp .env.example .env # Add your secrets (e.g., DATABASE_URL)

bun db:push         # Push DB schema if needed
bun dev             # Start dev server


🔒 Environment Variables
The .env file should include:

env
Copy
Edit
DATABASE_URL=your_postgres_url
NEXT_PUBLIC_SITE_URL=https://yourdomain.dev


🙋‍♂️ Author
Roshan Aryal
