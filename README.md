# TriageAssist: AI-Powered Support Message Triaging

TriageAssist is a Next.js web application designed to automatically categorize and prioritize incoming customer support messages. It provides a clean dashboard interface to view, filter, and manage support tickets, leveraging an AI model through the OpenRouter API for intelligent triage.

## Features

- **AI-Powered Triage**: Automatically assigns a `category` (Bug, Billing, Feature Request, General) and a `priority` (High, Medium, Low) to new messages.
- **Interactive Dashboard**: A central place to view all support messages in a filterable and sortable table.
- **Summary Cards**: Get a quick overview of key metrics like open tickets, high-priority issues, and resolved messages.
- **Message Filtering**: Easily filter the message list by category, priority, or status (Open/Resolved).
- **Message Details**: Click on any message to view its full content and details in a dialog.
- **Status Management**: Mark messages as "Resolved" or "Re-open" them with a single click.
- **Simulate New Messages**: An integrated form allows you to add new messages and see the AI triage in real-time.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN/UI](https://ui.shadcn.com/)
- **AI Integration**: [OpenRouter API](https://openrouter.ai/) for access to various large language models.
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### 1. Set Up Your Environment

This project requires an API key from OpenRouter to power the AI triage functionality.

1.  Create a file named `.env.local` in the root of the project.
2.  Add your OpenRouter API key to this file:

    ```.env.local
    OPENROUTER_API_KEY="your_openrouter_api_key_here"
    ```

    You can get a free API key from the [OpenRouter website](https://openrouter.ai/keys).

### 2. Install Dependencies

Open your terminal, navigate to the project directory, and run the following command to install the required packages:

```bash
npm install
```

### 3. Run the Development Server

Once the dependencies are installed, you can start the Next.js development server:

```bash
npm run dev
```

The application will now be running at [http://localhost:9003](http://localhost:9003).

## How the AI Triage Works

The core AI logic is located in `src/lib/triage.ts`.

When a new message is submitted, the `triageMessageWithAI` function is called. This function sends the message title and content to an AI model via the OpenRouter API.

The prompt instructs the AI to act as an expert support triage system and return a JSON object containing a `category` and a `priority` based on a strict set of rules defined within the prompt. This ensures that the triage process is both intelligent and consistent. If the API call fails or the API key is missing, the system gracefully falls back to a default "General" / "Low" classification.
