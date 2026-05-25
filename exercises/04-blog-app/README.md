# Blog App

**Concepts across milestones:** React Router v7 · Redux Toolkit · TypeScript · json-server · Real dev workflow

---

## Overview

You are building a minimal, fully functioning blog. Readers can browse posts, filter by category, and visit author profiles. The UI is intentionally simple — the work is in the React layer, not the design.

This project runs across five milestones. Each milestone is a branch. Each branch ends with a working, demo-able app that you can present before moving to the next.

---

## The Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI library |
| Vite 8 | Dev server and build tool |
| Tailwind CSS 4 | Styling via utility classes |
| React Router 7 (library mode) | Client-side routing |
| Redux Toolkit 2 + react-redux | Global state management |
| json-server | Mock REST API (your "backend") |
| Lucide React | Icons |

---

## Design System

The design system is pre-built. You do not style from scratch — you compose from what is there.

### Tokens (defined in `src/index.css`)

| Token | Value | Use for |
|-------|-------|---------|
| `text-ink` / `bg-ink` | `#0a0a0a` | Primary text, filled buttons, nav |
| `text-paper` / `bg-paper` | `#ffffff` | Page background, card backgrounds |
| `text-muted` | `#737373` | Metadata, captions, placeholders |
| `bg-subtle` | `#f5f5f5` | Section backgrounds, hover states |
| `border-edge` | `#e5e5e5` | Borders, dividers |

**Rule:** Do not add new colors. Every color decision in this project must come from the token list above or from Tailwind's built-in `neutral` scale.

### Primitive Components (`src/components/ui`)

Import any component from the barrel export:

```jsx
import { Button, Card, Badge, Input, Textarea, Avatar } from './components/ui'
```

| Component | Key props |
|-----------|-----------|
| `Button` | `variant` (`primary` \| `secondary` \| `ghost`), `size` (`sm` \| `md` \| `lg`) |
| `Card` | `padding` (bool), `hover` (bool) |
| `Badge` | `variant` (`default` \| `solid` \| `outline`) |
| `Input` | `label`, `id`, `error` |
| `Textarea` | `label`, `id`, `rows`, `error` |
| `Avatar` | `src`, `name`, `size` (`sm` \| `md` \| `lg` \| `xl`) |

Run `npm run dev` to see all components rendered in the design system showcase.

---

## API Reference

Start the mock API server:

```bash
npm run api
```

The API runs at `http://localhost:3001`. json-server exposes these endpoints automatically from `api/db.json`:

| Endpoint | Description |
|----------|-------------|
| `GET /posts` | All posts |
| `GET /posts?status=published` | Published posts only |
| `GET /posts?categoryId=1` | Posts in a category |
| `GET /posts?authorId=2` | Posts by an author |
| `GET /posts/:id` | Single post |
| `GET /categories` | All categories |
| `GET /users` | All users (authors) |
| `GET /users/:id` | Single user |

> Run both servers simultaneously with `npm start`.

---

## Git Workflow

```
main     ← stable, the instructor's branch — open PRs here at the end
└── dev  ← your integration branch — all milestone branches merge here
    ├── milestone/01-setup
    ├── milestone/02-routing
    ├── milestone/03-redux
    ├── milestone/04-typescript
    └── milestone/05-auth
```

### Per milestone

```bash
# 1. Always branch off dev, never off main
git checkout dev
git checkout -b milestone/02-routing

# 2. Work. Commit often with descriptive messages
git add src/pages/Home.jsx
git commit -m "feat: add home page with recent posts"

# 3. When the milestone acceptance criteria are all met, push
git push origin milestone/02-routing

# 4. Open a Pull Request: milestone/02-routing → dev
# Your coach reviews. Address feedback. Push new commits.
# The PR updates automatically. Merge when approved.

# 5. Start the next milestone from the updated dev
git checkout dev
git pull origin dev
git checkout -b milestone/03-redux
```

### Commit message convention

```
feat: add category filter to posts page
fix: slug not matching route param
chore: install react-router-dom
refactor: extract PostCard into its own file
```

---

## Page Constraints

These are the layout and content rules for every page you build.
They are not wireframes — the layout is your decision within these boundaries.

**Global constraints (apply to every page):**
- Maximum content width: `1024px`, centered
- Background: `bg-paper` only — no colored backgrounds
- Navigation: every page includes the site Navbar you build in Milestone 1
- Use only the design system tokens and primitive components for all UI elements

**Do not:**
- Use inline `style` attributes
- Install additional UI libraries
- Use colors outside the token list

---

## Milestone 1 — Setup & Design System

**Branch:** `milestone/01-setup`

### What you're building

Get the project running, understand the design system, and build the shared Navbar component that every page will use.

### Getting started

```bash
cd starter
npm install
npm start
```

Two servers start:
- `http://localhost:5173` — your React app (the design system showcase)
- `http://localhost:3001` — the mock API

### Acceptance criteria

1. Both servers start with `npm start`
2. `http://localhost:3001/posts` returns the 10 seeded posts as JSON
3. You have built a `Navbar` component in `src/components/Navbar.jsx` using only the design system primitives
4. The Navbar renders in `App.jsx` above the component showcase

### Navbar requirements

The Navbar must include:
- The site name **Blogify** — styled as a bold link (it will navigate to `/` in Milestone 2)
- Navigation links to: **Posts** and **Authors**
- A **Search** icon button (no behaviour yet)
- A **Bookmark** icon button showing a count of `0` (no behaviour yet)

Use Lucide React for the icons. The layout, spacing, and visual style are your decision — within the global constraints.

### Design decision

Leave a comment at the top of `Navbar.jsx` explaining why you structured the component the way you did. One to three sentences. This is the first thing your coach reads.

---

## Milestone 2 — React Router

**Branch:** `milestone/02-routing`

### Install

```bash
npm install react-router-dom
```

### What you're building

Wire up full client-side navigation. Every public page is reachable by URL. All data comes from the mock API via `fetch`.

### Acceptance criteria

1. `App.jsx` uses `createBrowserRouter` and `RouterProvider` from `react-router-dom`
2. Navigating directly to any route (e.g. refreshing `/posts/the-case-for-boring-technology`) loads the correct page
3. The Navbar links navigate without a full page reload
4. All data is fetched from `http://localhost:3001` — no hardcoded content in components
5. Only published posts (`status: "published"`) appear on public pages
6. A reusable `useApi` custom hook handles fetch requests

### Routes to implement

```
/                    Home
/posts               Posts list
/posts/:slug         Post detail
/categories/:slug    Posts filtered by category
/authors/:id         Author profile
```

### Page requirements

### Post card reference

See [`post-card-reference.png`](./post-card-reference.png) in this folder for the expected design of the post card. Build it yourself using the `Card`, `Badge`, `Avatar`, and `Button` primitives — the implementation is entirely your decision.

**`/` — Home**
- Required sections: site hero (text only, no background images), a grid of the 6 most recent published posts
- Each post card must show: cover image, category badge, title, author name and avatar, read time
- Each post card links to `/posts/:slug`

**`/posts` — Posts list**
- Required sections: a search input, category filter buttons (one per category + an "All" button), post grid
- Search filters by title in real time — no submit button
- Category filter and search work simultaneously
- Show a "No posts found" message when no results match
- Post grid uses the `Card` component

**`/posts/:slug` — Post detail**
- Required sections: cover image, category badge, title, author info (avatar + name + date), read time, post body, a back button
- Post body: render each paragraph on its own (the `content` field uses `\n\n` as the paragraph separator)
- Maximum content width for the body text: `720px`
- The author name links to `/authors/:id`

**`/categories/:slug` — Category**
- Required sections: category name as a heading, post grid of all published posts in that category
- Same post card as the home page

**`/authors/:id` — Author profile**
- Required sections: author avatar (use the `xl` size), name, bio, list of their published posts

### Design decision

Leave a comment in `App.jsx` (the router file) describing your routing structure — how many routes, whether you used nested routes, and why. One to three sentences.

---

## Milestone 3 — Redux

**Branch:** `milestone/03-redux`

### Install

```bash
npm install @reduxjs/toolkit react-redux
```

### What you're building

Add global state for bookmarks. A user can save and unsave any post. Bookmarks persist across page refreshes. The bookmark count in the Navbar stays in sync everywhere.

### Acceptance criteria

1. The Redux store is configured in `src/store/store.js` using `configureStore`
2. `main.jsx` wraps the app in `<Provider store={store}>`
3. A `bookmarksSlice` manages an array of bookmarked post IDs
4. Bookmarks are saved to `localStorage` and restored on page load
5. A bookmark button on every post card and the post detail page adds/removes the post from bookmarks
6. The Navbar shows the live count of bookmarked posts
7. No component receives bookmark data through props — all components read from the store directly with `useSelector`

### Slice requirements

Create `src/features/bookmarks/bookmarksSlice.js`.

The slice state shape:
```js
{ ids: [] }   // array of bookmarked post ID strings
```

Required actions:
- `addBookmark(id)` — adds a post ID if not already saved
- `removeBookmark(id)` — removes a post ID

Required selectors (export these alongside the slice):
- `selectBookmarkIds` — returns the full IDs array
- `selectIsBookmarked(id)` — returns true/false for a given post ID

### localStorage persistence

On app load, read `bookmarks` from `localStorage` and use it as the initial state.
On every store update, write the current IDs array back to `localStorage`.

Do this in `src/store/store.js` — not in a component.

### Design decision

Leave a comment at the top of `bookmarksSlice.js` listing your action names and a one-sentence explanation for each. This mirrors how real teams document reducers.

---

## Milestone 4 — TypeScript Migration

**Branch:** `milestone/04-typescript`

### What you're building

Migrate the entire project from JavaScript to TypeScript. The app behaviour does not change — only the types are added.

### Install

```bash
npm install -D typescript @types/react @types/react-dom
```

Then create a `tsconfig.json` at the project root:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

### Acceptance criteria

1. All `.jsx` files are renamed to `.tsx`, all `.js` files to `.ts`
2. The project compiles with `npx tsc --noEmit` — zero errors
3. Every component has typed props — no `any` is allowed
4. API response shapes are typed in `src/types/api.ts`
5. The Redux store, slice state, and selectors are all typed
6. `useSelector` uses a typed `RootState` — no casting

### Types to define in `src/types/api.ts`

```ts
type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  authorId: string
  categoryId: string
  status: 'published' | 'draft'
  publishedAt: string | null
  readTime: number
  coverImage: string
}

type User = {
  id: string
  name: string
  email: string
  bio: string
  avatar: string
}

type Category = {
  id: string
  name: string
  slug: string
}
```

### Design decision

Leave a comment in `src/types/api.ts` explaining what you learned about TypeScript types during the migration — one honest sentence. This is read by your coach.

---

## Milestone 5 — Authentication (Stretch)

**Branch:** `milestone/05-auth`

> This milestone is optional. Complete it only after Milestone 4 is merged and approved.

### What you're building

Add login/logout. A logged-in user can write new posts and edit their own posts. Protected pages redirect unauthenticated users to `/login`.

### Install

Nothing new — all tools are already in the project.

### How auth works in this app

There is no real auth server. The simulation:
1. On login, query `GET /users?email=EMAIL&password=PASSWORD`
2. If a user is returned, store `{ id, name, email, avatar }` in the Redux auth slice and in `localStorage`
3. On page load, restore the session from `localStorage`
4. On logout, clear both

> **Important:** This is a learning simulation only. Never store passwords or use this pattern in a production application.

### New routes

```
/login           Login page (public)
/dashboard       My posts — drafts and published (protected)
/write           New post editor (protected)
/write/:id       Edit existing post (protected)
```

### Acceptance criteria

1. An `authSlice` manages `{ user: null | User, isAuthenticated: boolean }`
2. Logging in with a valid email/password from `api/db.json` sets the session
3. Protected routes (`/dashboard`, `/write`, `/write/:id`) redirect to `/login` when not authenticated
4. After login, the user is redirected back to the page they tried to visit
5. The Navbar shows the logged-in user's avatar and a logout button when authenticated
6. The post editor (`/write`) sends a `POST /posts` request to json-server
7. The edit page (`/write/:id`) sends a `PATCH /posts/:id` request
8. A user can only edit their own posts

### Protected Route pattern

Create a `ProtectedRoute` component that wraps routes requiring auth:

```tsx
// Usage in your router
{
  path: '/dashboard',
  element: <ProtectedRoute><Dashboard /></ProtectedRoute>
}
```

---

## Resources

| Topic | Link |
|-------|------|
| React Router v7 (library mode) | https://reactrouter.com/start/library/installation |
| Redux Toolkit | https://redux-toolkit.js.org/introduction/getting-started |
| React Redux | https://react-redux.js.org/introduction/getting-started |
| TypeScript for React | https://react.dev/learn/typescript |
| json-server | https://github.com/typicode/json-server |
| Lucide React icons | https://lucide.dev/icons |
| Tailwind CSS v4 | https://tailwindcss.com/docs |
