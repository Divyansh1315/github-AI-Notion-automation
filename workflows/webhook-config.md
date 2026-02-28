# Webhook Configuration Documentation

## Overview

The GitHub Content Engine exposes an HTTP POST webhook endpoint that acts as the entry point for content generation.

This endpoint accepts a repository identifier and returns structured AI-generated personal branding content.

---

# 1. Endpoint Details

Method: POST  
Path: /generate-content  
Content-Type: application/json  

Example URL (local development):
http://localhost:5678/webhook-test/generate-content

Example URL (production):
https://your-domain.com/webhook/generate-content

---

# 2. Request Payload

## Required JSON Body

{
  "repo": "username/repository-name"
}

### Field Description

repo (string)  
Format: owner/repository  
Example: Divyansh1315/github-content-engine  

---

# 3. Request Validation Rules

• repo must be a non-empty string  
• repo must follow GitHub format: owner/repo  
• Repository must be publicly accessible  
• Repository must contain a README  

If validation fails, the workflow exits early without triggering AI.

---

# 4. Success Response Structure

On successful execution:
<pre>
{
  "Status": "success",
  "repo": "username/repository-name",
  "generated_content": {
    "repo_name": "",
    "hook_line": "",
    "linkedin_post": "",
    "twitter_thread": "",
    "hashtags": "",
    "resume_bullet": "",
    "portfolio_description": ""
  },
  "timestamp": "ISO Date"
}
</pre>
---

# 5. Failure Response Structure

If README is missing or repository is invalid:
<pre>
{
  "Status": "Failed",
  "Reason": "README not found or repository invalid",
  "repo": "username/repository-name",
  "timestamp": "ISO Date"
}
</pre>
---

# 6. Execution Flow

1. Webhook receives POST request
2. Extracts repository name
3. Calls GitHub API
4. Validates README existence
5. Decodes and cleans README
6. Sends cleaned content to AI model
7. Validates structured JSON output
8. Pushes content to Notion
9. Returns response to caller

---

# 7. Testing the Webhook

## Using Postman

Method: POST  
URL: http://localhost:5678/webhook/generate-content  
Body: Raw JSON

{
  "repo": "username/repository-name"
}

---

## Using cURL

curl -X POST http://localhost:5678/webhook/generate-content \
  -H "Content-Type: application/json" \
  -d '{"repo":"username/repository-name"}'

---

# 8. Security Considerations

In production, implement:
- Webhook authentication token
- Rate limiting
- IP whitelisting
- HTTPS only
- Input sanitization
- GitHub API authentication to prevent rate limits

Recommended pattern ->

Add header validation:

Authorization: Bearer YOUR_SECRET_TOKEN

Reject requests without valid token.

---

# 9. Rate Limiting Strategy

GitHub unauthenticated API limit:
60 requests per hour

With token:
5,000 requests per hour

AI cost protection:
- Validate README before AI call
- Limit max token usage
- Prevent duplicate processing

---

# 10. Idempotency Strategy

To avoid duplicate content creation:
- Check if repo already exists in Notion
- Skip regeneration if Status = Published
- Add execution logging

---

# 11. Integration Options

The webhook can be triggered by:
- GitHub Actions
- Custom frontend dashboard
- Backend microservice
- CLI tool
- Zapier/Make
- Postman
- Internal automation platform

---

# 12. Example Use Case

Developer pushes new repository →  
GitHub Action triggers webhook →  
Content auto-generated →  
Notion stores structured posts →  
User reviews →  
Posts published on LinkedIn & Twitter

---

# 13. Production Hardening (Future Enhancements)
- Request signature verification
- Queue-based execution
- Async processing
- Multi-tenant support
- Audit logs
- Usage tracking

It transforms technical documentation into professional branding assets using a secure and scalable workflow.

