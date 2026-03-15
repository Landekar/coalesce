# LUMA — Roadmap

Last updated: 2026-03-16

---

## PHASE 1 — The Reference Library
**Goal:** Make the library undeniable. 12-15 full genres, real assets, polished enough to share publicly.
**Cost:** $0 (GitHub Pages, no backend)

### 1.1 — Content Completion (Timur)
- [ ] Fill remaining game screenshots for all genres (`public/images/titles/`)
- [ ] Add hero image for Hauntology
- [ ] Expand audio library — aim for 3-5 tracks per genre
  - [ ] Gothic Dark Fantasy (3/5 done)
  - [ ] Retro-Futurism (2/5 done)
  - [ ] Analogism (1/5 done)
  - [ ] Cyberpunk (1/5 done)
  - [ ] Pastoral Folk (1/5 done)
  - [ ] Digital Pastoral (2/5 done)
  - [ ] Hauntology (0/5 done)
- [ ] Promote 3-4 coming-soon genres to full genres (write all constituent data):
  - [ ] Dark Ambient
  - [ ] Liminal
  - [ ] Steampunk or High Fantasy (pick based on what you have material for)
  - [ ] One more from any category
- [ ] Write abstracts for newly promoted genres

### 1.2 — Platform Polish (Code)
- [ ] Mobile responsiveness (currently desktop-only)
- [ ] Lazy loading for images and audio (performance at scale)
- [ ] Landing page refinement — make the storefront sell the experience
- [ ] "References" section per genre (books, films, creators to consume — the deeper unfair advantage)
- [ ] SEO basics — meta tags, Open Graph images for social sharing
- [ ] Deploy to GitHub Pages (fresh push)

### 1.3 — Phase 1 Complete Checkpoint
- 12-15 full genres across all 8 categories
- Every genre has: hero image, abstract, 3+ audio tracks, complete constituents, game screenshots
- Mobile works
- Shareable — link looks good when pasted in Discord/Telegram/Twitter
- **Action:** Share publicly. Collect feedback. Feedback determines Phase 2 priorities.

---

## PHASE 2 — Personal Workspace + Editor
**Goal:** Users create their own art directions. This is the retention unlock.
**Cost:** Supabase free tier (auth + database), ~$0-25/month

### 2.1 — Auth + Account System
- [ ] Supabase integration — email/Google sign-in
- [ ] User profile (minimal — name, avatar, bio)

### 2.2 — Art Direction Editor
- [ ] Direction builder — pick/customize constituents per section:
  - Color palette (custom swatches or fork from existing genre)
  - Typography (select fonts, set specimen phrase)
  - Materials (choose from library or describe custom)
  - Shape language (select forms, write principle)
  - Sound references (link tracks or reference from Luma library)
  - Analogues / references (add titles, notes)
  - Abstract (free text)
- [ ] Save to IndexedDB (free tier) / Supabase (paid tier)
- [ ] 2-3 direction limit for free users, unlimited for paid

### 2.3 — Export + Sharing
- [ ] PDF export — client-side generation (jsPDF + html2canvas)
- [ ] Shareable link (compressed JSON URL or hosted page)
- [ ] Stripe integration — unlock export + cloud sync + unlimited directions

### 2.4 — Phase 2 Complete Checkpoint
- Users can sign up, build directions, save locally or to cloud
- Paid users export and share
- Retention metric: do users return to edit their directions?
- **Action:** Monitor usage patterns. Do people publish? Do they want to see others' work?

---

## PHASE 3 — Community Layer
**Goal:** Published directions create a feed. Luma becomes a living ecosystem.
**Cost:** Supabase Pro (~$25/month), asset caching storage (scales with published content)

### 3.1 — Publishing Pipeline
- [ ] "Publish" action on completed directions
- [ ] Completeness threshold (all sections must be filled)
- [ ] Editorial review queue (Timur + trusted curators approve/reject)
- [ ] Published directions appear in community feed

### 3.2 — Discovery + Social
- [ ] Community feed — browse published directions
- [ ] Follow creators
- [ ] Fork a direction (copy someone's published direction as a starting point)
- [ ] Comments / reactions (lightweight)

### 3.3 — Mapper Canvas (stretch)
- [ ] Node-based visual canvas for building art directions
- [ ] Drag constituents from library onto canvas
- [ ] Visual connections between elements
- [ ] Export as presentation-ready document

### 3.4 — Phase 3 Complete Checkpoint
- Community feed with quality-gated published directions
- Users follow each other, fork directions
- Luma has three return reasons: browse library, edit workspace, discover community
- **Action:** Evaluate course layer connection to Obraz. Consider licensing to studios/schools.

---

## GUIDING PRINCIPLES

1. **Content is the product.** Every genre completed makes the platform exponentially more convincing.
2. **Local-first.** No server cost until it's justified by paying users.
3. **Editorial quality over quantity.** Adobe Color proved that unfiltered community = noise.
4. **The structure is the moat.** Anyone can collect images. Nobody else maps art direction as a system of constituents.
5. **Phase 1 must be shareworthy before Phase 2 starts.** Don't build features for users you don't have yet.
