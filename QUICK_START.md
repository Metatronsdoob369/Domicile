# Domicile Quick Start

**Get building in 5 minutes**

---

## Step 1: Boot Domicile (2 minutes)

```bash
# Start Domicile (MCP server + governance layer)
~/start_domicile.sh

# Check status
~/status_domicile.sh

# If you need to stop it
~/stop_domicile.sh
```

**What this does:**
- Installs dependencies if needed
- Starts MCP server (your trust layer)
- Runs in background
- Creates log at `~/.domicile.log`

---

## Step 2: Understand the Vision (3 minutes)

```bash
cd ~/domicile_live

# Read the north star
cat VISION.md

# Understand the architecture
cat ARCHITECTURE.md | head -100

# See what exists
ls packages/
```

**Key insight:** Domicile is a trust operating system. Contracts > prompts.

---

## Step 3: Start an Agent Session (30 seconds)

In your LLM chat (Claude, ChatGPT, etc.):

```bash
# Copy this file's contents
cat ~/domicile_live/SESSION_START.md

# Paste it into your chat
# Then add your request
```

**Example:**
```
[Paste SESSION_START.md]

Current Task:
I need to understand what agents currently exist in packages/agents/
and what their trust scores are.
```

The agent will:
1. Read VISION.md (understand mission)
2. Read ARCHITECTURE.md (understand structure)
3. Work on your task
4. Update CIRCADIAN_LOG.md with learnings

**You never re-explain the architecture again.** It's all in the files.

---

## Step 4: Check What Needs Building

```bash
cd ~/domicile_live

# See overall architecture
cat ARCHITECTURE.md

# Check what's in packages
ls -la packages/

# See existing code structure
tree -L 2 domicile/
tree -L 2 domicile-core/
```

Most packages are in `domicile/packages/` and `domicile-core/src/`

---

## Common Tasks

### Build the project
```bash
cd ~/domicile_live
npm run build
```

### Run tests
```bash
npm test
```

### Start the demo
```bash
# Set API keys
export OPENAI_API_KEY=sk-...

# Run real-estate demo
npm run demo:real-estate
```

### Check logs
```bash
# Domicile system log
cat ~/.domicile.log

# Dream cycle log (Circadian learning)
cat ~/domicile_live/dream-cycle.log

# Learning reflections
cat ~/domicile_live/CIRCADIAN_LOG.md
```

---

## Key Files for Agents

When starting ANY task, agents should read:

1. **VISION.md** - The north star (read first, always)
2. **ARCHITECTURE.md** - How the system works
3. **SESSION_START.md** - Template to paste in every session
4. **CIRCADIAN_LOG.md** - What the system has learned

These give agents **perfect context** without you re-explaining.

---

## File Structure

```
~/domicile_live/
├── VISION.md                  # 🎯 The north star
├── ARCHITECTURE.md            # 🏗️ System blueprint
├── SESSION_START.md           # 📋 Template for agent sessions
├── CIRCADIAN_LOG.md           # 🌙 Learning reflections
├── QUICK_START.md             # ⚡ This file
├── README.md                  # 📚 Original docs
│
├── packages/                  # Monorepo packages (if structure updated)
├── domicile/                  # Domicile components
├── domicile-core/             # Core abstractions
├── examples/                  # Usage examples
├── docs/                      # Documentation
└── scripts/                   # Helper scripts

~/ (root)
├── start_domicile.sh          # 🚀 Boot Domicile
├── stop_domicile.sh           # 🛑 Stop Domicile
└── status_domicile.sh         # 📊 Check status
```

---

## Workflow

### Daily Workflow
```bash
# Morning: Start Domicile
~/start_domicile.sh

# Work: Use SESSION_START.md for every agent interaction
cd ~/domicile_live
cat SESSION_START.md  # Copy & paste to start sessions

# Evening: Check what was learned
cat CIRCADIAN_LOG.md

# Night: System dreams at 3 AM (automated)
```

### When You Need Something from NODE_OUT_Master
```bash
# Don't organize it - just search and pull
grep -r "thing you need" ~/NODE_OUT_Master/

# Found it? Copy just what you need
cp -r ~/NODE_OUT_Master/some-project ~/domicile_live/

# Keep building
```

---

## Troubleshooting

### Domicile won't start
```bash
# Check what's wrong
cat ~/.domicile.log

# Kill any stale processes
killall node

# Remove stale PID file
rm ~/.domicile.pid

# Try again
~/start_domicile.sh
```

### Dependencies missing
```bash
cd ~/domicile_live
rm -rf node_modules package-lock.json
npm install
```

### Lost context in agent session
```bash
# Just re-paste SESSION_START.md
# All context is in files, not in chat history
cat ~/domicile_live/SESSION_START.md
```

---

## Next Steps

1. ✅ Boot Domicile: `~/start_domicile.sh`
2. ✅ Read VISION.md: `cat ~/domicile_live/VISION.md`
3. ✅ Start building: Use SESSION_START.md in your next agent chat
4. ✅ Pull from NODE_OUT_Master as needed (don't organize first)
5. ✅ Log learnings in CIRCADIAN_LOG.md
6. ✅ Check dream cycle insights each morning

---

**You're ready. Start building in Domicile.**

The system has perfect context. You never re-explain. Just paste SESSION_START.md and describe what you want.

---

*"Fresh folder. Right ingredients. Start building. Find holes by using it."*
