import { Search, Bookmark } from "lucide-react";
import { Button } from "./ui";
import { Link } from "react-router-dom"

// I implemented the Blogify navbar with navigation links to the home pages,
// a search action button, and a bookmark button displaying an initial count of 0.

export default function Navbar() {
  return (
    <nav className="bg-paper border-b border-edge px-8 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold text-ink">Blogify</Link>
          <div className="flex items-center gap-4">
            <Link to="/posts" className="text-sm text-muted hover:text-ink">Posts</Link>
            <Link to="/authors/1" className="text-sm text-muted hover:text-ink">Author</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost"><Search size={16} /></Button>
          <Button variant="ghost"><Bookmark size={16} /> 0 </Button>
        </div>
      </div>
    </nav>
  );
}