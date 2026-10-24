// Shared by the form (client) and the route handler (server) so both validate
// against the same rules.

export const TOPICS = [
  { value: "role", label: "A front-end role" },
  { value: "freelance", label: "A freelance project" },
  { value: "other", label: "Something else" },
] as const;

export type Topic = (typeof TOPICS)[number]["value"];

export type ContactInput = {
  name: string;
  email: string;
  topic: Topic;
  message: string;
  /** Honeypot: real visitors never see or fill this. */
  company?: string;
};

export type FieldErrors = Partial<Record<"name" | "email" | "topic" | "message", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: Partial<ContactInput>): FieldErrors {
  const errors: FieldErrors = {};
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const message = (input.message ?? "").trim();

  if (!name) errors.name = "Add your name so I know who I’m replying to.";
  else if (name.length > 100) errors.name = "Keep your name under 100 characters.";

  if (!email) errors.email = "Add an email address so I can reply.";
  else if (!EMAIL.test(email) || email.length > 200)
    errors.email = "That email address doesn’t look right — check for typos.";

  if (!TOPICS.some((t) => t.value === input.topic)) errors.topic = "Choose what you’re getting in touch about.";

  if (message.length < 10) errors.message = "Tell me a little more — at least a sentence.";
  else if (message.length > 5000) errors.message = "Keep your message under 5,000 characters.";

  return errors;
}
