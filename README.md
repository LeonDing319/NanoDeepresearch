# Leon Deepresearch

A full stack Deep Research Agent product. Multi agent harness built on LangGraph, paired with a Next.js frontend.

## Features

* **Research mode**: Submit a query, run the full Deep Research pipeline, and stream thinking, tool calls, and sources via SSE into a fully cited structured report.
* **Compare mode**: Run the same query through multiple models in parallel and compare them side by side (stage latency, source count, report length, etc.).

## Agent Architecture

Intent recognition → research brief → Supervisor Agent (planning) → Sub Agents (research) → compression → report.

The Supervisor only plans, reflects, and terminates; it never executes tool calls directly. Each Sub Agent works on one isolated topic and cannot spawn further agents. A three layer state container separates global history, supervisor coordination, and per researcher execution.

## Tech Stack

* Frontend: Next.js 16 (Turbopack), React 19, TypeScript, Tailwind v4
* Backend: FastAPI, LangGraph
* Search tools: DuckDuckGo, arXiv, Linkup, Exa
* Models: Kimi, GLM, DeepSeek, MiniMax, and more

## Quick Start

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python main.py
```

Server starts at `http://localhost:8080`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at `http://localhost:3000`.

## Environment Variables

This project follows a **BYOK (Bring Your Own Key)** pattern. Model API keys are entered through the UI at runtime and forwarded to the backend per request. They are **never stored in the repo or backend env files.**

For the frontend, create `frontend/.env.local` with your own values:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
NEXT_PUBLIC_INSTANTDB_APP_ID=your_instantdb_app_id
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

All `.env*` files are gitignored.

## Project Structure

```
backend/
  main.py                 FastAPI entry point
  open_deep_research/     LangGraph multi agent orchestration
  services/               Service layer
  models/                 Data models
frontend/
  app/                    Next.js routes and pages
  components/             UI components
  lib/                    Client libraries (InstantDB, Google Docs, etc.)
```

## References

* [How we built our multi-agent research system (Anthropic)](https://www.anthropic.com/engineering/multi-agent-research-system)
* [Demystifying evals for AI agents (Anthropic)](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

## License

[MIT](./LICENSE)
