---
title: "Powrbot – SaaS Data Automation"
slug: "powrbot-saas-data-automation"
description: "SaaS platform that automates company data lookup and enrichment. Upload a list of companies, get structured data back. I led the full-stack build: Django backend, Stripe billing, bulk processing with Celery, and role-based permissions."
tags: "Django, Python, Stripe, REST API"
metrics: "Production SaaS"
year: "2018"
category: "SaaS Platform"
liveUrl: "https://powrbot.com/"
author: "Kishor Kumar Mahato"
featured: "true"
status: "published"
---

# Powrbot: SaaS Platform for Company Data Automation

![Powrbot](https://media.contra.com/image/upload/w_1100,q_auto/jdscjp7vkymzqqt3byzm.avif)

## What is Powrbot?

Powrbot lets sales and marketing teams upload a list of companies and get structured business data back automatically. Instead of manually researching each company, you upload a CSV and Powrbot enriches it with company details, contact info, and other data points.

I was the full-stack developer and project lead on this one, running since 2018.

**Live:** [powrbot.com](https://powrbot.com/)

---

## What I Built

- Complete Django backend with REST APIs
- Stripe subscription billing with plan-based feature gating
- Bulk data processing pipeline using Celery for background jobs
- User management with role-based permissions tied to subscription tiers
- Dashboard UI with step-by-step workflows for non-technical users


---

## The Hard Parts

**Bulk uploads with thousands of records.** You can't process 5,000 company lookups synchronously. I set up Celery workers for background processing, with progress tracking so users know how far along their batch is.

**Keeping Stripe in sync.** Subscription billing needs to be bulletproof. Webhooks handle upgrades, downgrades, cancellations, and failed payments. I built idempotent processing so even if a webhook fires twice, nothing breaks.

**Feature gating by plan.** Different subscription tiers unlock different features. This is enforced at the middleware level in Django, so there's no way to accidentally expose premium features to free users.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Backend | Django (Python) |
| Task Queue | Celery |
| Database | PostgreSQL |
| Payments | Stripe |
| Frontend | Django Templates, JavaScript |
