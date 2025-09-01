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
Create a `.env.local` file in the root of the project with the following keys:
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cGxlYXNlZC1wYXJyb3QtNTUuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_acbOOxX5sE8Bt7qmsAAY2gc6K59tbrM6tgEvobrnZc
UPLOADTHING_TOKEN=your_uploadthing_token_here
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=your_neondb_connection_url_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
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
  ![home](https://github.com/ablahum/sommaire/blob/main/public/home.png)
  ### Upload page
  ![upload](https://github.com/ablahum/sommaire/blob/main/public/upload.png)
  ### Dashboard page
  ![dashboard](https://github.com/ablahum/sommaire/blob/main/public/dashboard.png)
  ### Summary page
  ![summary](https://github.com/ablahum/sommaire/blob/main/public/summary.png)
</details>

## 📬 Contact
For questions, suggestions:
- Email: ablahum@proton.me
- Website: https://tama-dev.vercel.app