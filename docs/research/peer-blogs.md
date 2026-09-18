# Peer blogs — frontend architecture, scale, platform engineering

Scan date: 2026-09-17. Criterion: individual-author blogs in the same niche as
sordyl.dev, still publishing. Third column tracks the AI-content trend — whether
the author has moved into AI architecture/adoption writing, with a link.

## Direct niche match — frontend architecture

**https://frontendatscale.com/** — Maxi Ferreira
Frontend architecture and software design principles aimed at engineers, not
beginners. Long-form essays plus interactive guides (TanStack DB, SPA-vs-MPA).
The closest structural sibling to sordyl.dev in scope and tone.
*AI:* heavy and recent — ["The Cure for Slop"](https://frontendatscale.com/) (Apr 2026), ["Good Vibes Only"](https://frontendatscale.com/) (Mar 2026), ["Fear and Curiosity and AI"](https://frontendatscale.com/issues/46/) (Apr 2025).

**https://frontendmastery.com/**
Deep dives on frontend product engineering: state management, component design,
CSS architecture, framework trade-offs. Few posts, each substantial — the
opposite of a high-cadence blog.
*AI:* ["Navigating the future of frontend"](https://frontendmastery.com/posts/navigating-the-future-of-frontend/) frames the jagged frontier of product engineering in the age of AI.

**https://blog.isquaredsoftware.com/** — Mark Erikson (Redux maintainer)
Maintainer-level detail on React/Redux internals, performance, and why libraries
are shaped as they are. Sourced from actually maintaining the thing.
*AI:* two-part series, May 2026 — [Part 1: Fears, Opinions, Mental Journey](https://blog.isquaredsoftware.com/2026/05/ai-thoughts-part-1-fears-opinions-journey/), [Part 2: Agent Setup, Workflow, and Tools](https://blog.isquaredsoftware.com/2026/05/ai-thoughts-part-2-ai-thoughts-part-2-agent-workflow-tools/).

**https://overreacted.io/** — Dan Abramov
First-principles explanations of React and JS semantics. Recently drifted toward
protocol/architecture writing (atproto, RSC Explorer).
*AI:* none. Notable as a counter-signal — a top-tier frontend voice with no AI content.

**https://www.joshwcomeau.com/** — Josh W. Comeau
Interactive CSS/React/animation tutorials, best-in-class explanatory craft.
Value is pedagogy and interactive explainers, not architecture opinion.
*AI:* none listed. Second counter-signal.

## Architecture and engineering practice

**https://martinfowler.com/** — Martin Fowler + Thoughtworks authors
The reference point for architecture writing: patterns, refactoring, team
topologies, evolutionary design. Long shelf life per post.
*AI:* now a dominant theme — ["I don't like LLMs"](https://martinfowler.com/) (Sep 2026), ["An Accidental Blackboard"](https://martinfowler.com/) (Sep 2026), ["Maybe We Shouldn't Be Reviewing All This Code"](https://martinfowler.com/) (Sep 2026).

**https://addyosmani.com/blog/** — Addy Osmani (Google Chrome)
Was the performance/Core Web Vitals reference; has pivoted almost entirely to
agentic engineering. Highest-volume serious writer on AI-era engineering practice.
*AI:* essentially the whole 2026 archive — [Agentic Code Quality](https://addyosmani.com/blog/), [Own the Outer Loop](https://addyosmani.com/blog/), [Agentic Autonomy Levels](https://addyosmani.com/blog/), [Agentic Code Review](https://addyosmani.com/blog/).

**https://www.seangoedecke.com/** — Sean Goedecke
Near-daily short essays on shipping software inside big tech: what actually gets
projects delivered, how expertise is judged. Sharp, opinionated, low fluff.
*AI:* the majority of output — ["Tell agents the why, not just the how"](https://www.seangoedecke.com/), ["Slow developer experience will bottleneck fast models"](https://www.seangoedecke.com/), ["AI is breaking our proxies for expertise"](https://www.seangoedecke.com/) (all Sep 2026).

**https://blog.pragmaticengineer.com/** — Gergely Orosz
Industry-level reporting on how engineering orgs actually operate: hiring, comp,
migrations, platform decisions. Sourced from insiders, not speculation.
*AI:* central topic — ["We need to talk about migrations with AI"](https://blog.pragmaticengineer.com/) (Aug 2026), ["Meta wanted to reduce teams by 60% because of AI"](https://blog.pragmaticengineer.com/) (Sep 2026).

**https://www.rrees.me/** — Richard Rees
Public-sector digital transformation, Python/Ruby, databases. Useful as a
skeptical counterweight — writes about AI adoption pressure critically.
*AI:* critical stance on adoption; "Reverse Centaurs" framing, AI transcription in social care (May 2026).

## Design systems and web platform

**https://bradfrost.com/blog/** — Brad Frost
Atomic Design's author. Design systems, component architecture, design tokens —
the structural layer between design and frontend code.
*AI:* substantial — ["Agentic Design Systems in 2026"](https://bradfrost.com/blog/), ["AI and Design Systems"](https://bradfrost.com/blog/), ["Design systems in the time of AI"](https://bradfrost.com/blog/), plus a full AI & Design Systems course.

**https://blog.jim-nielsen.com/** — Jim Nielsen
Short, frequent, opinionated posts on web craft, interface design, and platform
values. "Opinions with a shelf life" — deliberately of-the-moment.
*AI:* no dedicated AI track on the homepage; occasional commentary. Counter-signal.

**https://www.matuzo.at/blog/** — Manuel Matuzović
Accessibility and HTML/CSS correctness, at a depth few match. Directly relevant
to the WCAG driver in this repo.
*AI:* not verified this pass — site returned HTTP 500. Recheck.

## Adjacent — AI engineering as the primary subject

**https://simonwillison.net/** — Simon Willison
Daily-cadence coverage of LLM capability, tooling, and agent security incidents.
The de facto log of record for what AI tooling can and can't do this week.
*AI:* ~80-85% of all entries. Model releases, agent security, AI-assisted dev practice.

**https://www.swyx.io/** — Shawn Wang (swyx)
Coined "AI Engineer" as a discipline. Career strategy, ecosystem analysis, and
the boundary between research and product.
*AI:* ["The Rise of the AI Engineer"](https://www.swyx.io/), ["The Year in Agents"](https://www.swyx.io/), ["The Impossible Triangle of LLM Infra"](https://www.swyx.io/). Also Latent Space podcast.

**https://leerob.com/** — Lee Robinson (SpaceX, ex-Cursor, ex-Vercel)
DX and tooling from inside the companies that build it. Short posts, strong
first-hand sourcing.
*AI:* ["Coding agents and complexity budgets"](https://leerob.com/) (Dec 2025), ["Building low-level software with only coding agents"](https://leerob.com/) (Dec 2025), ["How we teach AI models"](https://leerob.com/) (Jul 2026).

**https://www.robinwieruch.de/blog/** — Robin Wieruch
Was React/Next.js tutorials; now largely AI engineering tutorials. Useful as a
model of a full niche pivot.
*AI:* ["Agentic Coding: Bet on the Primitives"](https://www.robinwieruch.de/blog/) (Jul 2026), ["Your AI Output Is Someone Else's Input"](https://www.robinwieruch.de/blog/) (Sep 2026), plus LangChain/AI SDK guides.

**https://kentcdodds.com/blog** — Kent C. Dodds
Testing and React education; has moved to AI product building.
*AI:* ["Introducing Kody: Your Personal Software Factory"](https://kentcdodds.com/blog) (Sep 2026), ["How I used Cursor to Migrate Frameworks"](https://kentcdodds.com/blog) (Feb 2026).

## Corporate, but individually authored — for reference

**https://www.builder.io/blog** — Steve Sewell, Alice Moore et al.
Company blog with named authors writing real technical content.
*AI:* ["How to De-Slop an AI-Generated Codebase"](https://www.builder.io/blog) (Sep 2026), ["How (and why) to build agent-first apps"](https://www.builder.io/blog) (Jul 2026).

# Round two — additional blogs

Scan date: 2026-09-17. No overlap with round one.

## Architecture and systems design

**https://www.industrialempathy.com/** — Malte Ubl (CTO, Vercel)
Large-scale software design from someone running a platform at scale. Posts are
infrequent but dense — connection pooling, serverless architecture, security
boundaries. Rare combination of architecture depth and production evidence.
*AI:* substantial and architectural — ["Security boundaries in agentic architectures"](https://www.industrialempathy.com/) (Feb 2026), ["What we learned building agents at Vercel"](https://www.industrialempathy.com/) (Nov 2025), ["Building secure AI agents"](https://www.industrialempathy.com/) (Jun 2025).

**https://lethain.com/** — Will Larson
Engineering strategy and organizational design — how technical decisions survive
contact with an org. Author of *Staff Engineer* and *An Elegant Puzzle*. The
reference for the business-impact framing of technical decisions.
*AI:* treated as an adoption problem, not a tooling one — ["Building internal agents"](https://lethain.com/) series (Jan 2026), ["Facilitating AI adoption at Imprint"](https://lethain.com/) (Dec 2025), ["How should you adopt LLMs?"](https://lethain.com/) (May 2024).

**https://ferd.ca/** — Fred Hebert
Systems design, distributed systems, incident analysis, and resilience
engineering. Writes about complexity and control as a tension, not a checklist.
The most rigorous operational-thinking blog on this list.
*AI:* considered, not hyped — ["AI: Where in the Loop Should Humans Go?"](https://ferd.ca/) (Mar 2025); ["Control and complexity: tension in systems design"](https://ferd.ca/) (Aug 2026) is adjacent.

**https://matklad.github.io/** — Aleksey Kladov
Compilers, Rust/Zig, LSP and IDE internals, and software architecture from the
systems end. Short posts, unusually high insight density.
*AI:* none. Counter-signal from the systems side.

**https://www.hillelwayne.com/** — Hillel Wayne
Formal methods and software correctness made usable by working engineers.
Author of *Logic for Programmers*. Argues for rigor without academic overhead.
*AI:* none directly; Z3/constraint-solving work is adjacent at most.

## Web platform and performance

**https://csswizardry.com/** — Harry Roberts
Web performance consulting in public: Core Web Vitals, INP, RUM methodology, CSS
architecture. The "Web-Perf Wednesday" series is weekly and data-driven.
Directly relevant to the Core Web Vitals driver in this repo.
*AI:* minimal — one incidental post, ["How to Find an Exact Gmail Thread with Codex or Claude"](https://csswizardry.com/) (Aug 2026). Performance writing stays AI-free.

**https://nolanlawson.com/** — Nolan Lawson (Socket)
Browser performance, web standards, and — increasingly — an honest account of
what AI is doing to the craft. Writes about his own ambivalence rather than
selling a position.
*AI:* a full pivot with a critical edge — ["The asteroid currently hitting frontend web development"](https://nolanlawson.com/) (Aug 2026), ["Using AI to write better code more slowly"](https://nolanlawson.com/) (May 2026), ["The diminished art of coding"](https://nolanlawson.com/) (Mar 2026), ["On not becoming a cyborg"](https://nolanlawson.com/) (Aug 2026).

**https://www.mnot.net/blog/** — Mark Nottingham
HTTP protocol design, web standards, and Internet governance from someone who
writes the specs. Data-backed posts on real deployment behaviour.
*AI:* standards-angle — ["What's Missing in the 'Agentic' Story"](https://www.mnot.net/blog/) (Apr 2026), ["Using AI to Evaluate Internet Standards"](https://www.mnot.net/blog/) (Mar 2026). Also ["Web Feeds in 2026: A Survey"](https://www.mnot.net/blog/) (May 2026), relevant to the RSS work here.

**https://www.zachleat.com/web/** — Zach Leatherman
Eleventy's creator. Web fonts, performance, web components, static site
generation. 478 posts over 19 years — the long-run consistency case.
*AI:* none detected across the archive. Strong counter-signal.

**https://kilianvalkhof.com/** — Kilian Valkhof
CSS/HTML depth, progressive enhancement, accessibility. Builds Polypane.
["Programming principles for front-end developers"](https://kilianvalkhof.com/2026/css-html/programming-principles-for-front-end-developers/) (Jan 2026) is the architecture-adjacent one.
*AI:* none identified.

**https://tkdodo.eu/blog** — Dominik Dorfmeister (Sentry, TanStack maintainer)
React and TypeScript patterns from a library maintainer's vantage. ["The Vertical
Codebase"](https://tkdodo.eu/blog) (Apr 2026) and ["Building Type-Safe Compound Components"](https://tkdodo.eu/blog) (Jan 2026) are
squarely frontend-architecture posts.
*AI:* none identified. Counter-signal.

## Accessibility and design systems

**https://ericwbailey.website/** — Eric Bailey
Accessibility and inclusive design, 208 articles across 21 publications. Writes
about a11y as a systems and process problem, not a checklist.
*AI:* ["Building a general-purpose accessibility agent—and what we learned"](https://ericwbailey.website/) (GitHub Blog) — one of the few people writing on a11y *and* agents.

**https://www.smashingmagazine.com/author/vitaly-friedman/** — Vitaly Friedman
611 articles on UX, interface patterns, and design systems. Not a personal
domain, but a consistent single-author body of work.
*AI:* recent work covers AI integration guidelines and preparing design systems for AI.

## Practice and operations

**https://jvns.ca/** — Julia Evans
The clearest explanatory writing in the field: networking, Linux, git, DNS,
debugging. Also ["Moving away from Tailwind, and learning to structure my CSS"](https://jvns.ca/blog/2026/05/15/moving-away-from-tailwind--and-learning-to-structure-my-css-/) (May 2026).
*AI:* none. The most notable counter-signal on the list — very high output, zero AI content.

**https://chriscoyier.net/** — Chris Coyier
CSS-Tricks founder, now CodePen. Near-daily short posts on web work and running a
dev business. Value is cadence and perspective, not depth per post.
*AI:* none in recent posts.

**https://matthewsanabria.com/** — Matthew Sanabria
Engineering leadership plus hands-on infrastructure: containers, tooling,
developer environments. Smaller blog, practical framing.
*AI:* ["Running Jujutsu with Claude Code Hooks"](https://matthewsanabria.com/) (Jun 2025), ["You Had No Taste Before AI"](https://matthewsanabria.com/) (Jul 2025).

## Round-two counts

15 blogs, no overlap with round one. Seven have a meaningful AI track (Ubl,
Larson, Hebert, Lawson, Nottingham, Bailey, Sanabria, Friedman); seven have
essentially none (Kladov, Wayne, Leatherman, Valkhof, Dorfmeister, Evans,
Coyier), with Roberts incidental.

The split is sharper than round one and falls along the same line: architecture,
strategy and operations writers have engaged with AI; craft and platform writers
have not. Notably, the *frontend*-specific ones in this round — Dorfmeister,
Valkhof, Leatherman — are uniformly in the no-AI column, while the pivot happened
among the systems and leadership writers.

## What the scan shows (round one)

Of 16 individual-author blogs verified, 12 have an active AI content track and
several (Osmani, Goedecke, Wieruch) have made it their primary subject. The
holdouts are the craft-focused ones — Abramov, Comeau, Nielsen — who write about
the platform itself rather than about how software gets built.

The unoccupied position: frontend *architecture* writing that treats AI as one
input among several, rather than either the whole subject or an absent one.
# Round three — additional blogs

Scan date: 2026-09-17. No overlap with rounds one or two.

## Closest to the gap

**https://www.developerway.com/** — Nadia Makarevich
Deep investigative posts on how things actually work — React internals,
rendering, performance — written as investigations rather than tutorials. Now
applying that same method to AI tooling. The closest match on all three rounds to
the position identified as unoccupied: frontend architecture writing that treats
AI as one input among several.
*AI:* a dedicated category, architecture-framed — ["Building the Playground: How to Prep Your Codebase for AI Coders"](https://www.developerway.com/) (May 2026), ["How AI Remembers and Why It Forgets"](https://www.developerway.com/) Parts 1-2 (Apr 2026), ["Debugging with AI: Can It Replace an Experienced Developer?"](https://www.developerway.com/) (Feb 2026).

**https://www.stevekinney.com/writing** — Steve Kinney
Treats agent workflows as an infrastructure problem: sandboxing, cost control,
approval gates, durable workflows. Practical implementation patterns rather than
commentary. Highest-volume writer on agentic systems *as architecture*.
*AI:* essentially the entire recent archive — ["Designing a Build System That Runs Untrusted Code"](https://www.stevekinney.com/writing), ["Multi-Model Agentic Coding"](https://www.stevekinney.com/writing) (Jun 2026), agent memory and loop architecture, the "Ralph Loop" context-window strategy.

**https://crawshaw.io/blog/** — David Crawshaw (Tailscale co-founder)
Go, databases, distributed systems — and a rigorous multi-year log of actually
programming with agents. Writes from building infrastructure, not observing it.
*AI:* a sustained series — ["How I program with LLMs"](https://crawshaw.io/blog/) (Jan 2025), ["How I program with Agents"](https://crawshaw.io/blog/) (Jun 2025), ["Eight more months of agents"](https://crawshaw.io/blog/) (Feb 2026), ["The agent principal-agent problem"](https://crawshaw.io/blog/) (May 2026).

**https://www.geoffreylitt.com/** — Geoffrey Litt (Notion, ex-Ink & Switch)
Malleable software and end-user programming — software people can reshape
themselves. Research-grade thinking, readable prose. ["Understanding is the new
bottleneck"](https://www.geoffreylitt.com/) (Jul 2026) is the single best articulation of the post-AI
engineering constraint on any of these lists.
*AI:* central and conceptual — ["Enough AI copilots! We need AI HUDs"](https://www.geoffreylitt.com/) (Jul 2025), ["Code like a surgeon"](https://www.geoffreylitt.com/) (Oct 2025), ["AI as teleportation"](https://www.geoffreylitt.com/) (Sep 2025), ["Malleable software in the age of LLMs"](https://www.geoffreylitt.com/) (2023).

## Frontend and tooling

**https://antfu.me/posts** — Anthony Fu
Vite, Vue, Nuxt, ESLint, Shiki — maintainer of a large slice of the JS tooling
ecosystem. Writes about DX, tooling design, and open-source sustainability
(including its mental-health cost) from inside the work.
*AI:* only older Stable Diffusion QR-code experiments (2023). Nothing recent on AI and engineering. Counter-signal.

**https://rauchg.com/** — Guillermo Rauch (CEO, Vercel)
Low volume, high shelf life. ["7 principles of rich web applications"](https://rauchg.com/) (2014) and
["Pure UI"](https://rauchg.com/) (2015) still get cited a decade later — the model for writing posts
that outlive their framework.
*AI:* ["The AI Cloud"](https://rauchg.com/) (2025) — strategic/platform framing rather than practice.

**https://kettanaito.com/blog** — Artem Zakharchenko (creator of Mock Service Worker)
Testing architecture, JS/TS internals, and open-source culture. ["Monitoring
JavaScript Bundle Size Changes"](https://kettanaito.com/blog) is directly adjacent to the Sonda work in this
repo.
*AI:* none identified. Counter-signal.

**https://alexkondov.com/** — Alex Kondov (Bulgaria)
Software design and React/Node architecture — author of the "Tao of React" and
"Tao of Node" essays. Also writes about taste and judgment as engineering skills.
*AI:* one skeptical post — ["The AI cool off is slowly starting"](https://alexkondov.com/) (May 2026). Critical rather than engaged.

**https://www.taniarascia.com/** — Tania Rascia
A "digital garden" of 177+ posts: web fundamentals, JS, React, design systems,
auth. Strong on teaching fundamentals clearly; also the best career-change
narrative in this set (professional cook → principal engineer).
*AI:* none identified.

**https://bholmes.dev/** — Ben Holmes
Web development explained via whiteboard-style video plus written posts —
"the hardest parts of web dev." Format-forward; weekly cadence.
*AI:* none evident from the homepage. Post list not fully enumerable from the fetched page.

**https://jason.energy/** — Jason Lengstorf
Now running CodeTV (Learn With Jason, Web Dev Challenge). Ex-frontend architect
at large companies. Relevant more as a model of developer content as production
than as a written-architecture blog.
*AI:* none mentioned.

## Critical and adjacent perspectives

**https://www.baldurbjarnason.com/** — Baldur Bjarnason (Iceland)
The most rigorous *critical* voice on generative AI in web development — author
of *The Intelligence Illusion* (a researched guide to LLM risks) and *Out of the
Software Crisis* (systems thinking for resilient development). Read as the
counterweight to the Osmani/Kinney position.
*AI:* central, and adversarial — ["The story of this blog so far: 'AI', the death of web dev, and feeling like an outsider"](https://www.baldurbjarnason.com/) (Aug 2026), ["'AI' is a dick move, redux"](https://www.baldurbjarnason.com/) (Jan 2026).

**https://interconnected.org/home/** — Matt Webb
Technology, design and culture at an angle nobody else takes — 337 consecutive
weeks of posts, archives back to 2000. Ships odd hardware/software artifacts
(Poem/1, an AI clock) alongside the writing.
*AI:* idiosyncratic and conceptual — ["AI alignment is a red herring"](https://interconnected.org/home/) (Aug 2026), voice-interface design from sci-fi (Jul 2026).

## Round-three counts

13 individual blogs verified, no overlap with earlier rounds. Eight have an
active AI track (Makarevich, Kinney, Crawshaw, Litt, Rauch, Kondov-critical,
Bjarnason-critical, Webb); five have essentially none (Fu, Zakharchenko, Rascia,
Holmes, Lengstorf).

This round breaks the pattern from rounds one and two. Makarevich and Kinney are
both writing frontend/infrastructure architecture *with* AI as a constraint
rather than as the subject — which is the position previously flagged as
unoccupied. It is occupied, by at least two people, and Makarevich's investigative
format is close to what this repo does. Litt and Crawshaw hold the same position
one layer down, in systems rather than frontend.

Second observation: the critical voices (Bjarnason, Kondov, and Lawson from round
two) are now a recognisable cluster, not isolated dissent.


## Rejected

- aleksandra.codes — last post Dec 2023, stale.
- ryanflorence.com — redirects to remix.run.
- ceejbot.com — expired TLS certificate.
- blog.logrocket.com, platformengineering.org — corporate content marketing, rotating freelance authors.

- kentcdodds.com — already covered in round one.
- pushtoprod.dev — domain does not resolve.
- stevesewell.com — TLS SNI error.
- charity.wtf — Substack landing page only; archive returned 404, post list not verifiable.
- blog.bitsrc.io — fetch failed; also corporate.
- vercel.com/blog — corporate, 604 posts, rotating authors. Strong AI/agents content if you want a company reference.
- epicweb.dev / kentcdodds.com — round one duplicate.
- thoughtbot.com/blog, blog.cloudflare.com — corporate, multi-author. Cloudflare is strong on infra/AI if you want a company reference.
