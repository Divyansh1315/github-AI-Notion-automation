# Setup Guide
This guide helps you set up and run the complete automation system that converts GitHub repositories into structured insights stored in Notion.

## Goal

By the end of this setup, you will be able to:
- Send a GitHub repo name
- Automatically fetch README
- rocess it using AI
- Store structured outputs in Notion
- Generate reusable professional content

## Prerequisites

Before starting, ensure you have:
- Accounts Required
- GitHub account
- Notion account
- n8n instance (cloud or self-hosted)
- OpenAI API key (or any LLM provider)

## API & Access Setup

### 1) GitHub Personal Access Token

Used for accessing private/public repos via API.

**Steps:**
- Go to GitHub → Settings
- Developer Settings → Personal Access Tokens
- Generate new token
- Enable scopes:
  - repo
  - read:org
- Save token for later use.

### 2) Notion Integration Setup

**Steps:**
- Go to Notion → Settings → Integrations
- Create new integration
- Copy Internal Integration Token

**Now connect database:**
- Open your Notion database
- Click Share
- Add integration access

### 3) OpenAI / LLM API Key

Used for AI processing node.

**Steps:**
- Create API key from provider dashboard
- Store inside n8n credentials

## n8n Workflow Setup

Create the following nodes in order:

<pre>
Webhook
↓
GitHub README API Call
↓
IF Node
↓
README Content HTTP Node
↓
Decode README Code Node
↓
AI Processing Node
↓
Output Formatter
↓
Notion Node
</pre>

## Node Configuration

### 1) Webhook Node

**Purpose**: Trigger automation.

**Method:** POST

**Example payload:**

`{
  "repo": "Atliq-Hardware-Business-Analysis"
}
`

### 2) GitHub README API Node

HTTP Request configuration:

**Method:**

`GET`

**URL:**

`https://api.github.com/repos/<username>/{{$json.repo}}/readme`

**Headers:**

Authorization: `Bearer <GitHub Token>`

Accept: `application/vnd.github+json`

### 3) IF Node

Condition: `data exists`

**Prevents:**
- broken runs
- empty READMEs

### 4) README Content Node

Fetch full content from:
`{{$json.download_url}}`

Method: `GET`

### 5) Decode README Code Node

Use JavaScript to clean text:

<pre>
  let readme = $json.data;

if (!readme) return [];

try {
  readme = Buffer.from(readme, 'base64').toString('utf8');
} catch (e) {}

const cleaned = readme
  .replace(/<[^>]*>/g, '')
  .replace(/\n+/g, ' ')
  .trim();

return [
  {
    json: {
      repo_name: $node["Webhook"].json.repo,
      readme_text: cleaned
    }
  }
];
</pre>


### 6) AI Processing Node

Prompt should extract:
- Hook
- Problem
- Approach
- Learnings
- Outcomes
- LinkedIn content
- Portfolio summary
- Resume bullet points

Expected structured output:

<pre>
  {
  "hook_line": "",
  "linkedin_post": "",
  "twitter_thread": "",
  "hashtags": "",
  "resume_bullet": "",
  "portfolio_description": "",
  "date_time": ""
}
</pre>

### 7) Output Formatter

Standardize fields:
- clean formatting
- schema validation
- remove unwanted text

### 8) Notion Node

Map fields:
| Notion Column         | AI Field                        |
| --------------------- | ------------------------------- |
| LinkedIn Post         | {{$json.linkedin_post}}         |
| Twitter Thread        | {{$json.twitter_thread}}        |
| Resume Bullet         | {{$json.resume_bullet}}         |
| Portfolio Description | {{$json.portfolio_description}} |
| Repo                  | {{$json.repo_name}}             |
| Status                | Draft                           |

## Testing the Workflow

### Manual Test
Send request via Postman: `POST /webhook`
Body:
`{
  "repo": "Atliq-Hardware-Business-Analysis"
}
`

### Expected result:
- README fetched
- AI output generated
- Entry created in Notion

## Common Errors & Fixes

### Issue: README not fetched
Fix:
- verify repo name
- check GitHub token

### Issue: Base64 decode fails
Fix:
- ensure encoding exists
- fallback handling

### Issue: Notion entry fails
Fix:
- check database access
- verify field mapping

### Issue: AI output inconsistent
Fix:
- enforce structured prompt
- validate JSON output

## Security Best Practices
- Never expose API keys
- Use environment variables
- Limit GitHub token permissions
- Restrict Notion integration access

## Final Outcome

Once setup is complete, you will have a system that:
- reads GitHub projects
- converts them into insights
- creates professional content
- builds your portfolio automatically
- saves everything into Notion

This becomes your personal AI-powered documentation and personal branding engine.
