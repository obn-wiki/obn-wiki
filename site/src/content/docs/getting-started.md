---
title: Getting Started
description: Pick your problem. Follow the path. Get to production.
---

## The fastest way to start

Install the OBN advisor skill and let your agent tell you what to do:

```bash
openclaw skills install @obn/advisor
```

Then ask your agent: `@obn status` — it'll scan your config, check your OpenClaw version, and recommend which patterns to apply first. [Learn more about the skill](/skill/).

Or pick your path below.

---

## Secure my agent

If your agent is on a server, processes email, or runs unattended — this is your first stop. Follow in order:

### 1. Lock down the network

**[Gateway Hardening](/patterns/security/gateway-hardening/)** — Bind to localhost or Tailscale IP. Set auth token. Enable firewall. This alone blocks 90% of attacks.

```json
{ "gateway": { "host": "127.0.0.1", "port": 18789 } }
```

### 2. Restrict tool access

**[Tool Policy Lockdown](/patterns/security/tool-policy-lockdown/)** — Whitelist only the tools your agent needs. Block `rm -rf`, `curl | bash`, and credential access.

### 3. Defend against prompt injection

**[Prompt Injection Defense](/patterns/security/prompt-injection-defense/)** — Define who can give instructions in SOUL.md. DATA is not INSTRUCTIONS.

### 4. Layer system guardrails (v2026.2.1+)

**[Native Guardrails Integration](/patterns/security/native-guardrails-integration/)** — OpenClaw's built-in defenses. Layer on top of your SOUL.md rules.

### 5. SSRF protection (v2026.2.12+)

**[SSRF Defense](/patterns/security/ssrf-defense/)** — Hostname allowlists for URL fetching. Blocks internal network access.

### 6. Secure your hooks (v2026.2.12+)

**[Hook Security](/patterns/security/hook-security/)** — Session isolation for webhooks. Signature verification. Auth throttling.

### 7. Vet your skills

**[Skill/Plugin Security Vetting](/patterns/security/skill-plugin-security-vetting/)** (v2026.2.6+) — Three-gate process before installing any ClawHub skill.

**Also see:** [Secret Management](/patterns/security/secret-management/), [Two-Agent Untrusted Content](/patterns/security/two-agent-untrusted-content/)

---

## Deploy to cloud

Get an OpenClaw node running on AWS or GCP with zero public inbound access.

### Prerequisites

- [OpenTofu](https://opentofu.org/) installed (`brew install opentofu`)
- AWS credentials configured (`aws configure`) or GCP (`gcloud auth application-default login`)
- [Tailscale](https://tailscale.com/) account with a reusable auth key

### Quick deploy

```bash
git clone https://github.com/obn-wiki/claw-form.git
cd claw-form/environments/dev
cp ../../tofu.tfvars.example tofu.tfvars
# Edit tofu.tfvars with your VPC, subnet, and Tailscale key
tofu init && tofu plan && tofu apply
```

Your node appears in your Tailscale dashboard. SSH in:

```bash
ssh ubuntu@claw-dev-node
```

### What you get

- **AWS:** Graviton ARM64 instance (`t4g.medium`) — optimized for price-performance
- **GCP:** Tau T2D instance — ARM equivalent
- **Security:** Zero public inbound. All access via Tailscale mesh. UFW + Fail2ban hardened.
- **Identity:** IAM roles/service accounts — no static API keys

### After deploy

Apply the [Gateway Hardening](/patterns/security/gateway-hardening/) pattern, then the [Heartbeat Checklist](/patterns/operations/heartbeat-checklist-design/) for monitoring. The `@obn/advisor` skill will tell you what else to configure.

Full docs: [obn-wiki/claw-form on GitHub](https://github.com/obn-wiki/claw-form)

---

## Reduce costs

The biggest wins, in order of impact:

### 1. Cheap Model Coordinator (70-80% savings)

**[Cheap Model Coordinator](/patterns/operations/cheap-model-coordinator/)** — Use Haiku as the default model for routine tasks. Escalate to Sonnet/Opus only for complex work. This is the single highest-ROI change.

### 2. Session history caps (v2026.2.6+)

Built into OpenClaw — caps session history to prevent runaway token consumption. See [Cost Optimization Strategies](/patterns/operations/cost-optimization-strategies/) Strategy 6.

### 3. Heartbeat on a budget

**[Heartbeat Checklist Design](/patterns/operations/heartbeat-checklist-design/)** — Design concise, specific checks. Use Haiku model. Stop burning Opus tokens on health checks.

### 4. Full cost playbook

**[Cost Optimization Strategies](/patterns/operations/cost-optimization-strategies/)** — 7 strategies ranked by ROI with a monthly cost estimator. From model tiering to context window management.

---

## Run 24/7 reliably

Moving from interactive use to always-on operation:

### 1. Health monitoring

**[Heartbeat Checklist Design](/patterns/operations/heartbeat-checklist-design/)** — Periodic checks that your agent is alive, healthy, and doing its job. Not just "is it running" but "is it running well."

### 2. Cron reliability (v2026.2.12+)

**[Cron Reliability Hardening](/patterns/operations/cron-reliability-hardening/)** — 12+ scheduler fixes in v2026.2.12. Isolated jobs, no more skips, no more duplicate fires.

### 3. Overnight execution

**[Overnight Autonomous Execution](/patterns/operations/overnight-autonomous-execution/)** — Decision framework for unattended operation. What to automate, what to queue for morning review.

### 4. Monitoring pyramid

**[Health Monitoring and Alerting](/patterns/operations/health-monitoring-and-alerting/)** — Four-level pyramid: heartbeat → metrics → anomaly detection → incident response.

### 5. Production deployment

**[Production Gateway Deployment](/patterns/gateway/production-gateway-deployment/)** — systemd, Docker, or cloud configs. Choose your stack.

**Also see:** [Daemon Stack](/stacks/daemon/), [Docker Stack](/stacks/docker/)

---

## Use a pattern

Every pattern follows the same structure:

1. **Read the Problem** — confirm this matches your situation
2. **Check Context** — "Use when" / "Don't use when" / "Prerequisites"
3. **Check the Version** — make sure your OpenClaw version meets the minimum ([Version Matrix](/reference/version-matrix/))
4. **Copy the Implementation** — each pattern has copy-paste-ready configs
5. **Run the Test Harness** — validate: `./test-harnesses/framework/runner.sh --test <category>/<pattern>`
6. **Review Failure Modes** — know what can still go wrong
7. **Follow cross-links** — patterns reference related patterns for defense-in-depth

---

## Contribute

OBN is community-contributed. Every pattern, config, and test harness comes from operators running OpenClaw in production.

### Write a pattern

1. Fork [obn-wiki/patterns](https://github.com/obn-wiki/patterns)
2. Copy `PATTERN_TEMPLATE.md` to `patterns/<category>/your-pattern.md`
3. Fill in all sections (Problem, Context, Implementation, Failure Modes, Test Harness, Evidence)
4. Submit a PR

You don't need to know anything about the site build — just write markdown. The site rebuilds automatically on merge.

### Let your agent contribute

Install `@obn/advisor` and run `@obn propose` — your agent drafts learnings from production observations and submits them as PRs (with your approval). [Learn more](/skill/).

### Other ways to contribute

- **Report a bug** in a pattern — open an issue
- **Improve a test harness** — add edge cases
- **Add a deployment stack** — Kubernetes, NixOS, etc.
- **Contribute to claw-form** — new cloud providers, modules

See [Contributing](/contributing/) for the full guide.
