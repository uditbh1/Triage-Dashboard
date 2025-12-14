# TriageAssist: AI-Powered Support Message Triaging

TriageAssist is a Next.js web application designed to automatically categorize and prioritize incoming customer support messages. It provides a clean dashboard interface to view, filter, and manage support tickets, leveraging a free AI model through the OpenRouter API for intelligent triage.

## Features

- **AI-Powered Triage**: Automatically assigns a `category` (Bug, Billing, Feature Request, General) and a `priority` (High, Medium, Low) to new messages.
- **Interactive Dashboard**: A central place to view all support messages in a filterable and sortable table.
- **Data Persistence**: Messages are automatically saved to the browser's local storage, so your work is preserved between sessions.
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
- **AI Integration**: [OpenRouter API](https://openrouter.ai/) using the `mistralai/mistral-7b-instruct:free` model.
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation.
- **Data Storage**: Browser Local Storage.

## How It Works

### AI Triage Logic

The core AI logic is located in `src/lib/triage.ts`. When a new message is submitted, the `triageMessageWithAI` function is called. This function sends the message title and content to the `mistralai/mistral-7b-instruct:free` model via the OpenRouter API.

The prompt instructs the AI to act as an expert support triage system and return a JSON object containing a `category` and a `priority` based on a strict set of rules defined within the prompt. This ensures that the triage process is both intelligent and consistent. If the API call fails or the API key is missing, the system gracefully falls back to a default "General" / "Low" classification.

### Data Persistence

The application uses the browser's **local storage** to save and retrieve messages. This means that any new messages you add or changes you make to the status of existing messages will be preserved even if you close the browser tab or refresh the page. The data is loaded from local storage when the dashboard first loads and is automatically updated whenever a change is made.

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

## Future Improvements

This application serves as a strong foundation, but there are many opportunities for enhancement to make it a production-ready system.

- **Email Integration**: Add functionality to automatically create support tickets from incoming emails to a dedicated support address.
- **Proper Backend & Database**: Replace local storage with a robust backend service and a database (like PostgreSQL or MongoDB) to store messages centrally, allowing for multi-user access and data integrity.
- **User Authentication**: Implement an authentication system (e.g., using NextAuth.js or Firebase Auth) to create accounts for support agents, assign tickets, and track ownership.
- **Production-Grade Infrastructure**: Deploy the application on a scalable hosting platform and set up monitoring, logging, and error tracking for a reliable production environment.