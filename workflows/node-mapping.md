# Node Mapping Documentation

## Overview

This document explains the logical flow and responsibility of each node inside the "GitHub Content Engine" n8n workflow.

The system transforms a GitHub repository into recruiter-ready personal branding content and stores it in Notion.

Flow:

Webhook → Repo Extraction → GitHub API → Validation → Decode → AI Generation → Notion → Response

---

# 1. Webhook

Type: n8n-nodes-base.webhook  
Method: POST  
Path: /generate-content  

## Purpose
Acts as the entry point of the automation.

## Expected Input
{
  "repo": "username/repository-name"
}

## Output
Passes request body to next node.

## Why It Exists
Decouples external trigger (API call) from internal logic.
Enables integration with:
- GitHub Actions
- Custom UI
- Postman
- Backend systems

---

# 2. Set Repo Name

Type: Set Node  

## Purpose
Extracts and standardizes the repository name.

## Input
Webhook body

## Output
{
  "repo": "username/repository-name"
}

## Why It Exists
Prevents downstream dependency on raw request structure.
Creates a stable internal data contract.

---

# 3. GitHub README API

Type: HTTP Request  

## Purpose
Fetches README content from GitHub API.

## Endpoint
https://api.github.com/repos/{repo}/readme

## Output
Full GitHub API response including:
- Base64 encoded content
- Metadata
- HTTP status

## Why It Exists
Separates data retrieval from processing.
Implements retry logic for API resilience.

---

# 4. README Exists? (Conditional Node)

Type: IF Node  

## Purpose
Validates README availability before processing.

## Condition
Checks if body.content exists and is not empty.

## True Path
Proceeds to decoding.

## False Path
Returns failure response.

## Why It Exists
Prevents unnecessary AI calls.
Saves cost and avoids runtime crashes.

---

# 5. Decode README

Type: Code Node  

## Responsibilities
- Decode Base64 content
- Remove HTML tags
- Normalize whitespace
- Clean formatting artifacts

## Input
{
  "body": { "content": "base64_string" }
}

## Output
{
  "repo_name": "",
  "readme_text": "cleaned text"
}

## Why It Exists
AI quality depends on clean input.
Prevents markdown noise affecting output.

---

# 6. Generate Content (OpenAI Node)

Type: LangChain OpenAI Node  

## Purpose
Transforms technical README into structured personal branding content.

## Model
gpt-4.1-mini

## Key Configuration
- JSON Schema enforced
- Strict output format
- 1500 max tokens

## Output Structure
{
  "repo_name": "",
  "hook_line": "",
  "linkedin_post": "",
  "twitter_thread": "",
  "hashtags": "",
  "resume_bullet": "",
  "portfolio_description": ""
}

## Why It Exists
Core intelligence layer.
Converts technical documentation into business storytelling.

---

# 7. Notion Posts Database

Type: Notion Node  

## Purpose
Stores structured AI output into Notion database.

## Property Mapping

repo_name → Title  
hook_line → Hook Line  
linkedin_post → LinkedIn Post  
twitter_thread → Twitter Thread  
hashtags → Hashtags  
resume_bullet → Resume Bullet  
portfolio_description → Portfolio Description  

## Why It Exists
Creates centralized content repository.
Enables content reuse across platforms.

---

# 8. Respond to Webhook

Type: RespondToWebhook  

## Purpose
Returns final execution result to API caller.

## Success Response
Includes generated content metadata.

## Failure Response
Includes error message and repository name.

## Why It Exists
Makes workflow API-ready.
Supports frontend or backend integrations.

---

# Error Handling Strategy

1. README validation before AI call
2. Retry logic on GitHub API
3. Controlled schema-based AI output
4. Graceful webhook response

---

# Architectural Principles Used

- Separation of concerns
- Input validation before processing
- AI schema enforcement
- Idempotent execution
- Retry-based resilience
- Business-focused transformation layer

---

# Business Thinking Behind Design

This is not just automation.

It demonstrates:

- API orchestration
- Data transformation pipeline
- Structured AI generation
- Cost-aware AI execution
- Personal branding automation
- Content systemization

---

# Future Enhancements (Scalable Architecture)

- Queue-based processing
- Multi-repo batch mode
- Slack/Email failure alerts
- Prompt version control
- AI output scoring layer
- Usage analytics tracking
- Multi-model fallback

