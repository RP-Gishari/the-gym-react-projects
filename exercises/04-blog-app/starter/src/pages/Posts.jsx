import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookmarkPlus } from "lucide-react";

import { Card, Input, Button } from "../components/ui";

export default function Posts() {

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {

    async function fetchData() {
      const [postsRes, categoriesRes, usersRes] = await Promise.all([
        fetch("http://localhost:3001/posts"),
        fetch("http://localhost:3001/categories"),
        fetch("http://localhost:3001/users"),
      ]);

      const postsData = await postsRes.json();
      const categoriesData = await categoriesRes.json();
      const usersData = await usersRes.json();
      const publishedPosts = postsData.filter( post => post.status === "published");
      setPosts(publishedPosts);
      setCategories(categoriesData);
      setUsers(usersData);
    }
    fetchData();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" ? true : post.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-ink"> All Posts </h1>
        <p className="text-muted"> Browse all published articles. </p>
      </div>
      <Input type="search" placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} />

      <div className="flex flex-wrap gap-3">
        <Button variant={selectedCategory === "all" ? "primary" : "secondary"} onClick={() => setSelectedCategory("all")}>All</Button>
        {categories.map(category => (
          <Button key={category.id} variant={ selectedCategory === category.id ? "primary": "secondary"}
            onClick={() => setSelectedCategory(category.id)}
          >{category.name}</Button>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="rounded-2xl border border-edge p-10 text-center">
          <p className="text-lg text-muted">No posts found.</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {filteredPosts.map(post => {
          const category = categories.find(cat => cat.id === post.categoryId);
          const author = users.find(user => user.id === post.authorId);

          return (
            <Card key={post.id} hover className="overflow-hidden">
              <Link to={`/posts/${post.slug}`}>
                <img src={post.coverImage} alt={post.title} className="h-56 w-full object-cover"/>
                <div className="space-y-4 p-5">
                  <span className="rounded-full bg-subtle px-3 py-1 text-sm text-muted">{category?.name}</span>
                  <h2 className="text-2xl font-bold text-ink">{post.title}</h2>
                  <p className="leading-7 text-muted">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={author?.avatar} alt={author?.name} className="h-10 w-10 rounded-full object-cover"/>
                      <div>
                        <p className="text-sm font-medium text-ink">{author?.name}</p>
                        <p className="text-xs text-muted">{post.readTime} min read</p>
                      </div>

                    </div>

                    <button className="rounded-md p-2 hover:bg-subtle"><BookmarkPlus size={18} /></button>
                  </div>
                </div>
              </Link>
            </Card>
          );
        })}

      </div>
    </div>
  );
}