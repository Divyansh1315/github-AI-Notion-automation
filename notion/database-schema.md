
# Notion Database Schema

## Overview

This document defines the structure of the Notion database used to store AI-generated project content from the GitHub → AI → Notion automation system.

The database acts as:

- Project documentation repository
- Content management system
- Portfolio backend
- Publishing queue

---

## Database Name

GitHub Content Engine

---

## Properties / Fields

### 1. Repo Name
- Type: Title
- Description: Name of the GitHub repository

---

### 2. Hook Line
- Type: Rich Text
- Description: A hook like for the post

---

### 3. LinkedIn Post
- Type: Rich Text
- Description: AI-generated LinkedIn-ready content

---

### 4. Twitter Thread
- Type: Rich Text
- Description: Structured Twitter/X thread

---

### 5. Resume Bullet
- Type: Rich Text
- Description: Achievement-oriented resume bullet points

---

### 6. Portfolio Description
- Type: Rich Text
- Description: Professional portfolio-ready summary

---

### 7. Status
- Type: Select
- Options:
  - Draft
  - Ready to Publish
  - Published
  - Archived

---

### 9. Date Processed
- Type: Date
- Description: Date automation was executed

---

## Schema Design Principles

- Keep fields structured for reuse
- Separate content from metadata
- Enable filtering by status
- Support future analytics

---

## Future Extensions

- Engagement Metrics (Number)
- Interview Questions Generated (Rich Text)
- Hiring Relevance Score (Number)
- Tags (Multi-select)
