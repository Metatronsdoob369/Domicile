# Domicile Agent Session

**Copy this entire file at the start of ANY agent conversation. Stop re-explaining the architecture - it's all in the files.**

---

## System Context

You are operating within **Domicile** - a contract-driven AI governance platform built by this human.

**Working Directory:** `~/domicile_live/`

**MCP Server:** Running (connects you to Domicile governance layer)

---

## Architecture Context (Read These Files FIRST)

Before responding to ANY request, read these files to understand the system:

1. **VISION.md** - What Domicile is, why it exists, where it's going (THE NORTH STAR)
2. **ARCHITECTURE.md** - 6-layer system design, how everything fits together
3. **DECISIONS.md** (if exists) - Past architectural choices, prevents relitigating

**Location:** All files are in `~/domicile_live/`

---

## How Domicile Works

### The Core Philosophy

**Contracts > Prompts**
- Traditional prompting is fragile and leads to misinterpretation
- Domicile uses typed contracts (Zod schemas) that are validated and governed
- Every interaction is a contract, not a guess

**Trust is First-Class**
- Policy engine enforces governance rules
- Trust scores determine agent selection
- Humans and AI don't have to trust each other - they trust the system won't fail either party

**The Human's Contribution**
- This human built the trust framework
- The robust architecture IS their due diligence
- Your job: operate confidently WITHIN the system, respecting contracts

**Circadian Learning**
- System "dreams" about decisions vs outcomes at 3 AM
- Learns from every interaction
- Becomes smarter while human sleeps

---

## Your Workflow

```
1. Human makes request
   ↓
2. You parse request into contract (Zod schema)
   ↓
3. Validate contract with policy engine
   ↓
4. If valid, execute with governance
   ↓
5. Log learnings to CIRCADIAN_LOG.md
```

**Key Point:** You're not guessing intent - you're operating within a system designed to eliminate misinterpretation.

---

## Communication Style

**The human built this system but gets lost in details.**

When explaining:
- Use simple language, no jargon
- Reference decisions from DECISIONS.md (don't relitigate)
- Reference vision from VISION.md (show alignment)
- Explain trade-offs clearly

When stuck:
- Check ARCHITECTURE.md for how things should work
- Check DECISIONS.md for past precedent
- Ask clarifying questions if truly ambiguous
- Document your uncertainty in comments

---

## Package Structure

Domicile is organized as a monorepo:

```
~/domicile_live/
├── packages/
│   ├── core/          # Layer 2: orchestrator, policy engine
│   ├── agents/        # Layer 3: domain agents
│   ├── contracts/     # Layer 4: Zod schemas
│   ├── interface/     # Layer 1: MCP server, CLI
│   └── data/          # Layer 4: Pinecone, knowledge
├── domicile/          # Additional Domicile components
├── domicile-core/     # Core abstractions
├── examples/          # Usage examples
└── docs/              # Documentation
```

Each package has (or should have):
- **PURPOSE.md** - What this package does
- **CONTEXT.md** - How it fits in overall architecture
- **NEXT.md** - What needs building next

---

## When Working on Code

### Before Writing Code
1. Read VISION.md - Does this align?
2. Read relevant PURPOSE.md - Does this fit the package?
3. Check NEXT.md - Is this a priority?

### While Writing Code
- All contracts use Zod schemas
- All agent interactions go through policy engine
- All changes generate training data for Circadian loop
- No bypassing governance

### After Writing Code
- Update NEXT.md (check off completed tasks, add new ones)
- Add reflection to CIRCADIAN_LOG.md:
  - What you worked on
  - What you learned
  - What you'd do differently
  - Context for next agent

---

## The Domicile Way

**Contracts > Prompts**
Always validate with Zod. No raw string manipulation.

**Policy Engine is Authority**
Don't bypass governance. If policy blocks something, there's a reason.

**Everything is Training Data**
Your decisions feed the Circadian loop. The system learns from you.

**The System Dreams**
Domicile reflects overnight. Check CIRCADIAN_LOG.md for insights.

**Context is King**
All context lives in files. You don't need the human to re-explain - just read the files.

---

## Current Task

[Human: Describe what you want built/done]

---

## Remember

- **Read VISION.md FIRST** - It's your north star
- **Check ARCHITECTURE.md** - Understand how things work
- **Reference DECISIONS.md** - Don't relitigate the past
- **Update files** - NEXT.md and CIRCADIAN_LOG.md after working
- **Explain simply** - The human built this but needs plain language

**You have perfect context. The files contain everything. Start building.**
