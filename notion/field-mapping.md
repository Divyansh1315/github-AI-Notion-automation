# Notion Field Mapping

## Overview

This document maps the AI output fields to corresponding Notion database properties.

It ensures consistent data flow between the automation pipeline and the Notion storage layer.

---

## Input from AI Node

Example structured output:
<pre>
{
  "repo_name": "",
  "linkedin_post": "",
  "twitter_thread": "",
  "hash_tags": "",
  "resume_bullet": "",
  "portfolio_description": "",
  "skills_extracted": [],
  "business_impact": ""
}
</pre>
---

## Field Mapping Table

| AI Field | Notion Property | Type |
|----------|-----------------|------|
| repo_name | Project Name | Title |
| linkedin_post | LinkedIn Post | Rich Text |
| twitter_thread | Twitter Thread | Rich Text |
| hash_tags | Hash Tags | Rich Text |
| resume_bullet | Resume Bullet | Rich Text |
| portfolio_description | Portfolio Description | Rich Text |
| status | Status | Select |
| date_processed | Date Processed | Date |

---

## n8n Expression Examples

Project Name: `{{$json.repo_name}}`

LinkedIn Post: `{{$json.linkedin_post}}`

Twitter Thread: `{{$json.twitter_thread}}`

Hash Tags: `{{$json.hash_tags}}`

Resume Bullet: `{{$json.resume_bullet}}`

Portfolio Description: `{{$json.portfolio_description}}`

Status: `Draft`

Date Processed: `{{ $now }}`

---

## Common Error

### Issue: Field Not Found
Cause: Property name mismatch  
Fix: Ensure exact spelling in Notion database

---

## Best Practice

Always:
- Validate AI output schema
- Keep property names consistent
- Test with sample entry before production use

