# Sommaire

**Sommaire** is a personal portfolio SaaS project designed to summarize PDF files using AI. It leverages **Gemini AI** as the primary LLM and **OpenAI** (gpt-3.5-turbo) as a fallback for summarization tasks. The application parses uploaded PDF files and generates concise summaries with key points, providing a seamless and modern AI-powered user experience.

> Live Demo: [Sommaire on Vercel](https://sommaire-ablahum.vercel.app)

## ✨ Features

- Upload and parse PDF files for AI summarization
- Generate concise summaries with key points
- Support for multiple AI models: **Gemini AI** (primary) and **OpenAI GPT-3.5** (fallback)
- Payment integration via **Stripe**
- Modern UI built with **Tailwind CSS** and **ShadCn** components
- Server Actions + API Routes using **Next.js App Router**

---

## 🧰 Tech Stack

| Layer        | Technology                                                                 |
|-------------|----------------------------------------------------------------------------|
| Frontend    | Next.js (App Router), TypeScript, Tailwind CSS, ShadCn                       |
| Backend     | Next.js API Routes & Server Actions, TypeScript                             |
| AI/LLM      | Gemini AI (gemini-2.5-flash), OpenAI GPT-3.5-turbo                          |
| PDF Parsing | LangChain                                                                    |
| Database    | NeonDB                                                                       |
| File Upload | Uploadthing                                                                  |
| Payment     | Stripe                                                                       |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- Environment variables

### Installation
Clone the repository
```bash
git clone https://github.com/ablahum/sommaire.git
cd sommaire
```

### Install dependencies
```
npm install
```

### Environment Setup
Make sure you have the following credentials ready and added to your .env file:
```
DATABASE_URL=your_supabase_postgresql_url
DIRECT_URL=your_supabase_postgresql_direct_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_frontend_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_ROLE_KEY=your_supabase_role_key
XENDIT_MONEY_IN_KEY=your_xendit_money_in_key
XENDIT_WEBHOOK_TOKEN=your_xendit_webhook_token
```

### Running the App
```
npm run dev
```
The app will be available at http://localhost:3000.

## 📸 Screenshots
<details>
  <summary>A glimpse of screenshots of the apps</summary>

  ### Home page
  ![home](https://github.com/ablahum/sommaire/blob/main/server/public/assets/home.png)
  ### Upload page
  ![upload](https://github.com/ablahum/sommaire/blob/main/server/public/assets/upload.png)
  ### Dashboard page
  ![dashboard](https://github.com/ablahum/sommaire/blob/main/server/public/assets/dashboard.png)
  ### Summary page
  ![summary](https://github.com/ablahum/sommaire/blob/main/server/public/assets/summary.png)
</details>

## 📬 Contact
For questions, suggestions:
- Email: ablahum@proton.me
- Website: https://tama-dev.vercel.app