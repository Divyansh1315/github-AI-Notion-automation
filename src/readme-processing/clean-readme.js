/**
 * clean-readme.js
 *
 * Cleans and normalizes README markdown text
 * to make it AI-ready.
 *
 * Removes:
 * - HTML tags
 * - Code blocks
 * - Excess whitespace
 * - Markdown symbols (basic normalization)
 *
 * Usage:
 * const cleanReadme = require('./clean-readme');
 * const cleaned = cleanReadme(rawReadmeText);
 */

function cleanReadme(text) {
  if (!text) {
    throw new Error("No README text provided.");
  }

  let cleaned = text;

  // Remove HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, "");

  // Remove fenced code blocks ``` ```
  cleaned = cleaned.replace(/```[\s\S]*?```/g, "");

  // Remove inline code `code`
  cleaned = cleaned.replace(/`[^`]*`/g, "");

  // Remove markdown headings (#, ##, ###)
  cleaned = cleaned.replace(/^#{1,6}\s*/gm, "");

  // Remove markdown links [text](url)
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // Remove image markdown ![alt](url)
  cleaned = cleaned.replace(/!\[[^\]]*\]\([^)]+\)/g, "");

  // Normalize bullet points
  cleaned = cleaned.replace(/^\s*[-*+]\s+/gm, "");

  // Remove excessive newlines
  cleaned = cleaned.replace(/\n{2,}/g, "\n");

  // Trim leading/trailing whitespace
  cleaned = cleaned.trim();

  return cleaned;
}

module.exports = cleanReadme;

