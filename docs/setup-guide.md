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
