/**
 * decode-readme.js
 *
 * Decodes GitHub README content.
 * Handles:
 * - Base64 encoded content (GitHub API default)
 * - Plain text fallback
 * - Safe error handling
 *
 * Usage:
 * const decodeReadme = require('./decode-readme');
 * const decoded = decodeReadme(apiResponse.content);
 */

function decodeReadme(content) {
  if (!content) {
    throw new Error("No README content provided.");
  }

  try {
    // GitHub API returns base64 by default
    const buffer = Buffer.from(content, "base64");
    const decoded = buffer.toString("utf8");

    // If decoding produces readable text, return it
    if (decoded && decoded.length > 0) {
      return decoded;
    }

    // Fallback if already plain text
    return content;

  } catch (error) {
    console.warn("Base64 decode failed. Returning original content.");
    return content;
  }
}

module.exports = decodeReadme;

/** The above code show how decoding is done in Readme text decode node
