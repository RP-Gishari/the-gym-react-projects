// Design System Showcase
//
// This file is a living reference — not part of the app you are building.
// Run `npm run dev` to see all design system components in one place.
// You will create your actual pages in src/pages/ starting from Milestone 2.
//
// Import any component like this:
//   import { Button, Card, Badge } from './components/ui'

import { BookmarkPlus, Search, ArrowRight } from 'lucide-react'
import { Avatar, Badge, Button, Card, Input, Textarea } from './components/ui'

export default function App() {
  return (
    <div className="min-h-screen bg-subtle">

      <header className="bg-paper border-b border-edge px-8 py-4 flex items-center justify-between sticky top-0">
        <span className="text-base font-bold tracking-tight">Blogify</span>
        <span className="text-sm text-muted">Design System — Milestone 1 reference</span>
      </header>

      <main className="max-w-3xl mx-auto px-8 py-12 space-y-16">

        {/* ── Typography ─────────────────────────────────────────── */}
        <section className="space-y-4">
          <SectionLabel>Typography</SectionLabel>
          <Card>
            <div className="space-y-3">
              <p className="text-4xl font-bold text-ink leading-tight">Heading 1</p>
              <p className="text-3xl font-bold text-ink leading-tight">Heading 2</p>
              <p className="text-xl font-semibold text-ink">Heading 3</p>
              <p className="text-base text-ink leading-relaxed">
                Body text. Used for paragraphs and readable content. Line height should
                give the text room to breathe. Max width around 65 characters.
              </p>
              <p className="text-sm text-muted">
                Small / muted text. Used for metadata, timestamps, captions.
              </p>
              <p className="text-xs text-muted uppercase tracking-wider font-medium">
                Label / overline text
              </p>
            </div>
          </Card>
        </section>

        {/* ── Buttons ────────────────────────────────────────────── */}
        <section className="space-y-4">
          <SectionLabel>Button</SectionLabel>
          <Card>
            <div className="space-y-4">
              <Row label="Variants">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </Row>
              <Row label="Sizes">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </Row>
              <Row label="With icon">
                <Button><Search size={14} /> Search</Button>
                <Button variant="secondary"><BookmarkPlus size={14} /> Save</Button>
                <Button variant="ghost">Read more <ArrowRight size={14} /></Button>
              </Row>
              <Row label="Disabled">
                <Button disabled>Primary</Button>
                <Button variant="secondary" disabled>Secondary</Button>
              </Row>
            </div>
          </Card>
        </section>

        {/* ── Badge ──────────────────────────────────────────────── */}
        <section className="space-y-4">
          <SectionLabel>Badge</SectionLabel>
          <Card>
            <Row label="Variants">
              <Badge variant="default">Technology</Badge>
              <Badge variant="solid">Design</Badge>
              <Badge variant="outline">Career</Badge>
            </Row>
          </Card>
        </section>

        {/* ── Avatar ─────────────────────────────────────────────── */}
        <section className="space-y-4">
          <SectionLabel>Avatar</SectionLabel>
          <Card>
            <div className="space-y-4">
              <Row label="Sizes">
                <Avatar name="Sarah Chen" size="sm" />
                <Avatar name="Marcus Reid" size="md" />
                <Avatar name="Lena Okafor" size="lg" />
                <Avatar name="Sarah Chen" size="xl" />
              </Row>
              <Row label="With image">
                <Avatar
                  src="https://api.dicebear.com/9.x/initials/svg?seed=Sarah+Chen&backgroundColor=0a0a0a&fontColor=ffffff"
                  name="Sarah Chen"
                  size="md"
                />
                <Avatar
                  src="https://api.dicebear.com/9.x/initials/svg?seed=Marcus+Reid&backgroundColor=0a0a0a&fontColor=ffffff"
                  name="Marcus Reid"
                  size="md"
                />
              </Row>
            </div>
          </Card>
        </section>

        {/* ── Card ───────────────────────────────────────────────── */}
        <section className="space-y-4">
          <SectionLabel>Card</SectionLabel>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <p className="text-sm font-medium text-ink">Default card</p>
              <p className="text-xs text-muted mt-1">padding={'{true}'} (default)</p>
            </Card>
            <Card hover>
              <p className="text-sm font-medium text-ink">Hoverable card</p>
              <p className="text-xs text-muted mt-1">hover={'{true}'} — try it</p>
            </Card>
          </div>
          <p className="text-xs text-muted">
            In Milestone 2 you will compose Card into a PostCard component.
            See <strong>post-card-reference.png</strong> in the exercise folder for the expected design.
          </p>
        </section>

        {/* ── Form Elements ──────────────────────────────────────── */}
        <section className="space-y-4">
          <SectionLabel>Form elements</SectionLabel>
          <Card>
            <div className="space-y-5">
              <Input
                id="email"
                label="Email address"
                type="email"
                placeholder="you@example.com"
              />
              <Input
                id="search"
                type="search"
                placeholder="Search posts..."
              />
              <Input
                id="error-example"
                label="With validation error"
                placeholder="Enter a value"
                error="This field is required"
              />
              <Textarea
                id="bio"
                label="Bio"
                placeholder="Write a short bio..."
                rows={3}
              />
            </div>
          </Card>
        </section>

      </main>
    </div>
  )
}

// ── Internal helper components ──────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold text-muted uppercase tracking-wider">
      {children}
    </p>
  )
}

function Row({ label, children }) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {label && <span className="text-xs text-muted w-20 shrink-0">{label}</span>}
      {children}
    </div>
  )
}
