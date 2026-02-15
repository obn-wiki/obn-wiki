---
title: "@obn/advisor — The OBN Skill"
description: An OpenClaw skill that keeps your agent updated, audits your skills, and proposes learnings back to the community.
---

## Install

```bash
openclaw skills install @obn/advisor
```

That's it. Your agent now has access to the entire OBN pattern library and can keep itself updated.

## Commands

| Command | What it does |
|---------|-------------|
| `@obn status` | Scan your config, check your OpenClaw version, show which patterns apply and which need updating |
| `@obn update` | Propose specific config changes based on new patterns or OpenClaw releases — with diffs |
| `@obn skills audit` | Scan installed skills against known-bad lists, check for updates, flag risks |
| `@obn report` | Show how your applied patterns are performing (error rates, token spend, cron reliability) |
| `@obn propose` | Draft a learning from your production experience and submit it as a PR to OBN (with your approval) |

## How it works

### Consume: Stay Updated

The skill fetches the OBN pattern index and your OpenClaw version. It compares what you're running against what's available:

```
@obn status

  OpenClaw version: v2026.2.12
  Patterns applied: 8 of 36
  Updates available: 2
    - Gateway Hardening: v2026.2.12 adds SSRF deny policy (you don't have urlAllowlist configured)
    - Cron Reliability: new pattern — your cron config would benefit from isolated: true

  Run @obn update to see proposed changes.
```

### Observe: Track Performance

The skill watches how patterns perform in your setup:

- **Heartbeat miss rate** — are cron jobs running on schedule?
- **Token spend** — did the cost optimization pattern actually reduce costs?
- **Error rate** — did the security patterns reduce security incidents?
- **Context loss** — did the memory patterns reduce post-compaction confusion?

```
@obn report

  Last 7 days:
  - Heartbeat: 336/336 runs (100% reliability, up from 89% before cron hardening)
  - Token spend: $4.20/day avg (down from $18.50 before model coordinator)
  - Security: 0 injection attempts succeeded, 3 blocked by guardrails
  - Context: 2 compactions, 0 critical state lost
```

### Propose: Contribute Back

When the skill detects something noteworthy — a new failure mode, a config tweak that improved results, an edge case not covered — it can draft a learning:

```
@obn propose

  I've noticed something worth sharing:

  Pattern: Cron Reliability Hardening
  Observation: When running 5+ isolated cron jobs with different models,
  the scheduler occasionally uses the wrong model for the first run after
  a gateway restart. Subsequent runs use the correct model.

  Proposed addition to Failure Modes:
  | Model mismatch on first run after restart | Scheduler loads model config
  before isolated job config is fully parsed | Workaround: add a 30-second
  delay to first cron job after gateway start |

  Submit this as a PR to obn-wiki/patterns? [yes/no]
```

**Safety guarantees:**
- The skill **never submits without your explicit approval**
- Proposals are **anonymized** — no domain names, API keys, or personal data
- **Rate limited** to 1 proposal per week per instance
- PRs go through **normal community review** before merging

### Skill Audit: Watch Your Dependencies

```
@obn skills audit

  Installed skills: 7
  ✅ @weather/forecast v2.1.0 — no known issues
  ✅ @calendar/sync v1.4.2 — no known issues
  ⚠️  @email/gmail v3.0.1 — update available (v3.0.3 fixes credential leak)
  ❌ @tools/web-scraper v1.2.0 — flagged by VirusTotal (2 detections)
  ✅ @obn/advisor v1.0.0 — you're on latest

  Recommendation: Update @email/gmail immediately. Remove @tools/web-scraper
  and replace with @tools/browser-fetch (vetted alternative).
```

The audit cross-references:
- **VirusTotal** SHA-256 fingerprint database
- **OBN community reports** — operators flag good/bad skills
- **ClawHub changelogs** — detect security-relevant updates
- **The Skill/Plugin Security Vetting pattern** — checks against the three-gate process

## The Learning Loop

Every operator running `@obn/advisor` is running an experiment. The aggregate observations make the patterns better:

```
Install @obn/advisor
        │
        ▼
┌─────────────────┐
│  CONSUME         │  Fetch patterns, check version, propose config changes
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  OBSERVE         │  Track metrics: did the pattern actually work?
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  PROPOSE         │  Agent drafts a learning, operator approves
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  COMMUNITY       │  PR reviewed by peers, merged into patterns
│  REVIEW          │
└────────┬────────┘
         │
         ▼
   Back to CONSUME — every agent gets the improvement
```

**The more operators, the better the patterns.** If 50 people apply the cron reliability pattern and 3 discover a new failure mode, the learning propagates to all 50.

## Privacy and Security

- **No telemetry.** The skill runs locally. No data is sent anywhere unless you explicitly `@obn propose`.
- **No API keys needed.** The skill fetches the public pattern index from obn.wiki. The chat features (if you use the website) use BYOK.
- **Proposals are opt-in and anonymized.** You review every proposal before submission. Config values, domains, and personal data are stripped.
- **Open source.** The skill code is at [obn-wiki/advisor](https://github.com/obn-wiki/advisor). Audit it yourself.

## Requirements

- OpenClaw v2026.2.6+ (for skill installation support)
- Internet access (to fetch pattern index from obn.wiki)
- GitHub account (only if you want to submit proposals)

## Source

[obn-wiki/advisor on GitHub](https://github.com/obn-wiki/advisor) — Apache 2.0
