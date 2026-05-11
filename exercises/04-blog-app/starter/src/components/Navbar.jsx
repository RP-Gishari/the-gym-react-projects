import { Search, Bookmark } from "lucide-react";
import { Button } from "./ui";

// I implemented the Blogify navbar with navigation links to the home pages,
// a search action button, and a bookmark button displaying an initial count of 0.

export default function Navbar() {
  return (
    <nav className="bg-paper border-b border-edge px-8 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-ink">Blogify</h1>
          <div className="flex items-center gap-4">
            <button className="text-sm text-muted hover:text-ink">Posts</button>
            <button className="text-sm text-muted hover:text-ink">Authors</button>
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