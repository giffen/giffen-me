import type { VercelRequest, VercelResponse } from "@vercel/node";

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const GITHUB_TOKEN = process.env.GITHUB_PAT!;
const ALLOWED_USER_ID = 8596347397;
const GITHUB_REPO = "giffen/giffen-me";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body ?? {};
  if (!message?.text || message.from?.id !== ALLOWED_USER_ID) {
    return res.status(200).json({ ok: true });
  }

  const text = message.text.trim();
  if (text.startsWith("/start")) {
    await sendTelegram(message.chat.id, "Ready. Send me an article idea and I'll file it as a GitHub Issue.");
    return res.status(200).json({ ok: true });
  }

  const firstLine = text.split("\n")[0].slice(0, 120);
  const title = firstLine;
  const body = text.length > firstLine.length
    ? text
    : firstLine;

  try {
    const issue = await createGitHubIssue(title, body);
    await sendTelegram(message.chat.id, `Filed as issue #${issue.number}: ${issue.html_url}`);
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    await sendTelegram(message.chat.id, `Failed to create issue: ${errorMsg}`);
  }

  return res.status(200).json({ ok: true });
}

async function createGitHubIssue(title: string, body: string) {
  const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({ title, body, labels: ["idea"] }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API ${response.status}: ${text}`);
  }

  return response.json();
}

async function sendTelegram(chatId: number, text: string) {
  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}
