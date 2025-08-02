// src/app/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface Article {
  slug: string;
  title: string;
  date: string;
}

async function getArticles(): Promise<Article[]> {
  const dir = path.join(process.cwd(), 'content/articles');
  const files = fs.readdirSync(dir);

  return files
    .filter((file) => file.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace('.md', '');
      const file = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const { data } = matter(file);
      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || 'Unknown Date',
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date, newest first
}

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Agroecology Hub</h1>
      <ul className="space-y-4">
        {articles.length === 0 && <p>No articles found.</p>}
        {articles.map((article) => (
          <li key={article.slug} className="border-b pb-4">
            <Link href={`/articles/${article.slug}`} className="text-2xl font-semibold text-blue-600 hover:underline">
              {article.title}
            </Link>
            <p className="text-sm text-gray-500">{article.date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}