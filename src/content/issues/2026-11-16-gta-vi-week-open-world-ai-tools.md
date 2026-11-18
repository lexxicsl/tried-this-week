---
issue: 1
title: "GTA VI week: 3 AI tools for building your own open-world systems, tested in Godot"
seoTitle: "GTA VI Week: AI Tools for Open-World Indie Games, Tested"
description: "We installed three AI tools for GTA-style systems (LLM street NPCs, an AI-built procedural city with traffic, and a prompt-to-GLB vehicle model) in Godot 4.7.2."
date: 2026-11-16
updated: 2026-11-17
slug: "gta-vi-week-open-world-ai-tools"
tags:
  - GTA VI
  - open-world game
  - Godot
  - AI NPC dialogue
  - procedural city generation
  - MCP
  - GLB 3D assets
  - local LLM
brief: "GTA VI comes out Thursday with record pre-orders. You can't build Vice City, but you can build the systems that make one feel alive. We installed three AI tools on a CPU-only Linux box with Godot 4.7.2: local-LLM street NPCs that report crimes to a wanted system, an AI agent that builds a procedural city with traffic, and a 4B model that writes 3D vehicles as GLB files."
tools:
  - name: "NobodyWho"
    url: "https://github.com/nobodywho-ooo/nobodywho"
    label: "Tried"
    verdict: "Keep"
    job: "Offline LLM street NPCs that call a report_crime tool for a heat system"
    stack: "Godot 4.7.2, NobodyWho 13.0.0, Qwen3 0.6B and 1.7B GGUF, CPU only"
    license: "EUPL-1.2 (commercial use allowed per README; prebuilt packages include GPL espeak-ng)"
    licenseUrl: "https://github.com/nobodywho-ooo/nobodywho/blob/main/LICENSE"
  - name: "godot-mcp (Coding-Solo)"
    url: "https://github.com/Coding-Solo/godot-mcp"
    label: "Tried"
    verdict: "Keep"
    job: "Let an AI agent build and run a procedural city and traffic scene"
    stack: "Godot 4.7.2, MCP over stdio, GitHub main vs npm 0.1.1"
    license: "MIT"
    licenseUrl: "https://github.com/Coding-Solo/godot-mcp/blob/main/LICENSE"
  - name: "CCORE GLB-3D-Coder 4B"
    url: "https://huggingface.co/ccore/Qwen3.5-4B-GLB-3D-Coder"
    label: "Tried"
    verdict: "Drop"
    job: "Generate a low-poly taxi as a Three.js page with GLB export"
    stack: "Q4_K_M GGUF via NobodyWho Python, CPU only"
    license: "Apache-2.0"
    licenseUrl: "https://huggingface.co/ccore/Qwen3.5-4B-GLB-3D-Coder"
faq:
  - q: "Can a small indie team make a GTA-style open-world game with AI tools?"
    a: "Not a GTA VI, but you can prototype the systems. In our test, NobodyWho ran local-LLM street NPCs inside Godot on a CPU with sub-second replies from a 1.7B model, and godot-mcp let an AI agent build and run a 10x10-block procedural city with 60 simulated cars. Art at scale is still the bottleneck. The 3D asset model we tried did not finish a vehicle on CPU."
  - q: "Do I need to disclose AI NPC dialogue on Steam?"
    a: "Yes. Steam's Content Survey treats content created by AI while the game is running as Live-Generated, and asks you to describe the guardrails that stop it from generating illegal content. Pre-made AI assets that ship with the game count as Pre-Generated. itch.io has a separate Generative AI disclosure field on project pages."
  - q: "Is godot-mcp safe to use?"
    a: "Install it from the GitHub main branch, not from npm, for now. On Nov 16, 2026, npm still had only version 0.1.1 from February 2026. In our test, that version let add_node attach an arbitrary script file, which then ran when the scene ran. The GitHub main branch, which includes the April 2026 fix in pull request 99, rejected the same call."
  - q: "Can I use NobodyWho in a commercial, closed-source game?"
    a: "The NobodyWho README says yes. It is EUPL-1.2, and you may use it in proprietary and commercial projects, but changes to NobodyWho itself must be open-sourced. The README also says the prebuilt packages include espeak-ng (GPL-3.0-or-later) through the default Kokoro text-to-speech feature, and explains how to build without it. Check that with your own legal advice before you ship."
---

**GTA VI launches Thursday, Nov 19.** Rockstar's own [pre-order announcement](https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/rockstar-games-announces-pre-orders-grand-theft-auto-vi/) lists PS5 and Xbox Series X|S, at $79.99 standard and $99.99 Ultimate. Sensor Tower's tracker now estimates [15.88 million digital pre-orders and about $1.54 billion in revenue](https://www.gamespot.com/articles/gta-6-has-sold-almost-8-million-copies-so-far-and-ps5-is-dominating-the-split-of-course/) (GameSpot, Nov 17). That's up from [$1.09 billion on Nov 12](https://www.usatoday.com/story/tech/gaming/2026/11/12/gta-6-presales-1-billion-release-date/92738910007/) (USA TODAY). These are estimates. Take-Two hasn't published its own count. [PlayStation](https://blog.playstation.com/2026/11/10/pre-load-grand-theft-auto-vi-on-ps5-starting-today/) and [Xbox](https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/) both say it's the most pre-ordered game ever on their stores.

You won't out-build Rockstar. But the systems that make an open world feel alive are now within reach of a solo dev: NPCs who talk back, a city that builds itself, and traffic. So this week we tested AI tools for exactly those jobs.

**Test rig:** a CPU-only Linux box (8 cores, no GPU, Mesa llvmpipe) running Godot 4.7.2 stable. Every number below comes from our own logs on Nov 16, 2026. A gaming PC with a GPU will be faster.

## 1. NobodyWho: street NPCs that talk and call the cops. Verdict: Keep

**What it is:** a Godot plugin (also on the [Asset Library](https://godotengine.org/asset-library/asset/2886)) that runs a local LLM inside your game. There's no API key and no per-player server cost. We installed the [13.0.0 release](https://github.com/nobodywho-ooo/nobodywho/releases/tag/nobodywho-godot-v13.0.0).

**What we built:** "Rosa," a taco-truck owner in a fictional coastal city, plus a nervous pedestrian. The pedestrian gets a `report_crime(description, severity)` tool that raises a GTA-style heat level. Both NPCs share one loaded model. We used the [chat](https://docs.nobodywho.ooo/godot/chat/) and [tool-calling](https://docs.nobodywho.ooo/godot/tool-calling/) APIs.

**What happened:**

- **Qwen3 1.7B (thinking off) was the sweet spot.** It loaded in about 1 second. First tokens came in 240 to 350 ms, and full replies took under a second on CPU. Asked for the docks, Rosa said: *"Turn left on Main Street, then follow the waterfront. The docks are on the east side."*
- **The tool call worked.** When the player said *"I just stole that blue truck,"* the witness called `report_crime` and the heat went to 5. Small talk didn't trigger it.
- **Qwen3 0.6B was fast but dumb.** Replies took about 0.4 s, but Rosa offered to help rob a bank. With thinking off, the witness never called the tool. With thinking on, it did, but the reply text was only a `<think>` tag, so you'd have to strip that before showing it.
- **Severity is not stable.** The same confession scored 1, 3, or 5 depending on the model and settings. Clamp it and decide the real penalty in your own game code. Don't let the model set your wanted level directly.

**Shipping cost:** the Linux library alone is 142 MB, and the Windows DLL is 137 MB. The 1.7B model adds 1.28 GB to your download, and the 0.6B adds 484 MB.

**Commercial use:** the license is [EUPL-1.2](https://github.com/nobodywho-ooo/nobodywho/blob/main/LICENSE). The [README](https://github.com/nobodywho-ooo/nobodywho#license) says you may use it in proprietary and commercial projects, but changes to NobodyWho itself must be open-sourced. It also notes that the prebuilt packages include GPL-3.0 espeak-ng through the default Kokoro TTS feature, and shows how to build without it. The Qwen3 [0.6B](https://huggingface.co/Qwen/Qwen3-0.6B) and [1.7B](https://huggingface.co/Qwen/Qwen3-1.7B) models are Apache-2.0.

**Store disclosure:** NPC dialogue generated while the game runs is **Live-Generated** AI under [Steam's Content Survey](https://partner.steamgames.com/doc/gettingstarted/contentsurvey). Steam asks you to describe your guardrails against illegal output. Fill in [itch.io's Generative AI disclosure](https://itch.io/docs/creators/quality-guidelines#ai-disclosure) too.

**Why Keep:** offline, free, and fast enough on a CPU for one-line street barks, and the tool calls connect it to your game's systems. Use 1.7B or bigger, and keep the game logic in your own code.

## 2. godot-mcp: let your AI agent build a city and run it. Verdict: Keep (from GitHub, not npm)

**What it is:** an [MCP server](https://github.com/Coding-Solo/godot-mcp) that lets an AI coding agent (Claude Code, Cursor, and others) launch Godot, create scenes, add nodes, run the project, and read its debug output. It's MIT licensed.

**What we built:** a `CityGenerator` script for a 10x10-block grid of procedural buildings with a 30-second traffic sim (cars, turns, red lights). Then we drove the whole thing only through MCP calls from a script client: `create_scene`, `add_node` (city, sun, camera), `run_project`, `get_debug_output`, and `stop_project`.

**What happened:**

- It connected in about 100 ms and exposed 14 tools. Each scene edit took about 0.2 to 0.7 s, and the full loop took 7.5 s.
- The agent got back the game's own output: **350 buildings, 121 intersections, 60 cars, 399 turns, and 2,480 red-light stops in a 30-second sim that took 237 ms.** That feedback loop is the reason to use it. Your agent can see whether its city works.
- **Gotcha:** the camera `position` we passed as a JSON object was silently dropped from the saved scene. The camera kept its FOV but got no position. Check your .tscn after each edit.
- **Security finding:** `npx @coding-solo/godot-mcp`, the README's install path, pulls [npm 0.1.1](https://www.npmjs.com/package/@coding-solo/godot-mcp), last published Feb 3, 2026. We passed a script file path as `nodeType`, and 0.1.1 attached that script to the scene. Our harmless test script then **ran when the scene ran**. The GitHub main branch includes the [April 2026 fix (PR #99)](https://github.com/Coding-Solo/godot-mcp/pull/99) and rejected the same call with "Invalid nodeType." Until a new npm release ships, clone the repo, build it, and point your agent at `build/index.js`.

**Commercial use:** MIT. It's an editor-side dev tool, so nothing ships in your game.

**Store disclosure:** Steam [says](https://partner.steamgames.com/doc/gettingstarted/contentsurvey) efficiency gains from AI dev tools aren't the focus of its disclosure. What matters is AI-made content that ships and players see. If your agent writes the city generator, disclose any generated content per your own reading of that guidance.

## 3. CCORE GLB-3D-Coder 4B: a taxi from a text prompt? Verdict: Drop (for CPU-only machines)

**What it is:** a [4B model fine-tuned from Qwen3.5-4B](https://huggingface.co/ccore/Qwen3.5-4B-GLB-3D-Coder) that writes a full Three.js page with an "Export GLB" button, so you can drop the asset into Godot. It's Apache-2.0, released Nov 5, 2026.

**What we tried:** "a low-poly yellow taxi with four wheels for a city driving game," using the card's own system prompt and sampling settings, Q4_K_M weights, and CPU only.

**What happened:** we ran it twice for about 57 minutes in total and **never got a finished HTML file.** Run 1 used a 16K-token context and failed after about 16,000 tokens with a "context too small" error. Run 2 stopped at our 8,000-token cap after 23 minutes. Before a long stall partway through run 2, it generated about 13 tokens per second. The output we saved was still planning the car body and window geometry.

**Fair warning:** the [model card](https://huggingface.co/ccore/Qwen3.5-4B-GLB-3D-Coder) says responses average about 20K tokens and recommends thinking on with unlimited output. It says an 8K limit is "too restrictive." We ran thinking off with capped output, so this wasn't a test at its best settings. At our speed, a typical 20K-token answer would take about 25 minutes, and the training examples go up to 72K tokens. The card's showcase ([RIFTWARD](https://huggingface.co/spaces/ccore/RIFTWARD)) shows what it can do on better hardware.

**Commercial use:** Apache-2.0, built on [Qwen3.5-4B](https://huggingface.co/Qwen/Qwen3.5-4B) (Apache-2.0). The generated page loads [Three.js](https://threejs.org/) (MIT).

**Store disclosure:** a GLB you generate and ship is **Pre-Generated** AI content on Steam and needs disclosure on itch.io.

**Why Drop:** if you don't have a GPU, you won't get a vehicle in a work session. We'll re-test it on a GPU with thinking on and unlimited output.

## Skip list

- [Roblox Studio beta: prompt to R15 animation](https://devforum.roblox.com/t/studio-beta-generate-r15-animations-from-a-prompt-plus-optional-r6-motion-rebuilder/4977709). It's Roblox-only, so it's not in our Godot test this week.
- [SpriteKiln](https://github.com/LucasJRamos/spritekiln). It's for 2D sprites, so it's off-theme for an open-world week.

## Disclosures

There are no affiliate links in this issue. None of these three projects has an affiliate program we could find, and all three are free and open source. Nobody paid to be included. Scouting tips came from public X posts by [@SpawnCamper9000](https://x.com/SpawnCamper9000/status/2118859923119383008) (NobodyWho) and [@cutetoxicguy](https://x.com/cutetoxicguy/status/2118689870474306019) (GLB-3D-Coder). GTA VI sales figures are third-party estimates. This issue isn't affiliated with Rockstar Games or Take-Two Interactive.

## Sources

- GTA VI: [Take-Two/Rockstar press release](https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/rockstar-games-announces-pre-orders-grand-theft-auto-vi/), [GameSpot on Sensor Tower, Nov 17](https://www.gamespot.com/articles/gta-6-has-sold-almost-8-million-copies-so-far-and-ps5-is-dominating-the-split-of-course/), [USA TODAY, Nov 12](https://www.usatoday.com/story/tech/gaming/2026/11/12/gta-6-presales-1-billion-release-date/92738910007/), [Sensor Tower tracker](https://sensortower.com/grand-theft-auto-VI/sales-tracker)
- NobodyWho: [repo](https://github.com/nobodywho-ooo/nobodywho), [docs](https://docs.nobodywho.ooo/godot/), [NobodyWho Qwen3 1.7B GGUF](https://huggingface.co/NobodyWho/Qwen_Qwen3-1.7B-GGUF)
- godot-mcp: [repo](https://github.com/Coding-Solo/godot-mcp), [PR #99](https://github.com/Coding-Solo/godot-mcp/pull/99), [npm package](https://www.npmjs.com/package/@coding-solo/godot-mcp)
- GLB-3D-Coder: [model card](https://huggingface.co/ccore/Qwen3.5-4B-GLB-3D-Coder)
- Engine: [Godot 4.7.2-stable](https://github.com/godotengine/godot/releases/tag/4.7.2-stable) ([MIT](https://godotengine.org/license/))
- Store rules: [Steamworks Content Survey](https://partner.steamgames.com/doc/gettingstarted/contentsurvey), [itch.io AI disclosure](https://itch.io/docs/creators/quality-guidelines#ai-disclosure)
