import { Bookmark, SearchIcon } from "lucide-react"
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="border-b border-edge bg-paper">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-ink"
        >
          Blogify
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/posts"
            className="text-sm text-muted hover:text-ink"
          >
            Posts
          </Link>

          <Link
            to="/authors"
            className="text-sm text-muted hover:text-ink"
          >
            Authors
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="rounded-md p-2 hover:bg-subtle">
            <SearchIcon size={18} />
          </button>

          <button className="flex items-center gap-1 rounded-md p-2 hover:bg-subtle">
            <Bookmark size={18} />
            <span className="text-sm">0</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar