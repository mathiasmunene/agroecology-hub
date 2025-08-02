// src/app/articles/[slug]/page.tsx

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Define the Params interface
interface Params {
  slug: string;
}

// Define the Article type
type Article = {
  title: string;
  date: string;
  content: string;
} | null;

// Define the PageProps type explicitly to match Next.js expectations
interface PageProps {
  params: Promise<Params>;
}

// Generate static params for dynamic routes
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content/articles');
  const files = fs.readdirSync(dir);

  return files
    .filter((file) => file.endsWith('.md'))
    .map((filename) => ({
      slug: filename.replace('.md', ''),
    }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params; // Unwrap the Promise
  const article = await getArticle(slug);

  return {
    title: article?.title || 'Article',
  };
}

// Main page component
export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params; // Unwrap the Promise
  const article = await getArticle(slug);

  if (!article) return notFound();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{article.date}</p>
      <article className="prose prose-lg whitespace-pre-wrap">{article.content}</article>
    </main>
  );
}

// Helper function to fetch article content
async function getArticle(slug: string): Promise<Article> {
  try {
    const file = await fs.promises.readFile(
      path.join(process.cwd(), 'content/articles', `${slug}.md`),
      'utf-8'
    );
    const { data, content } = matter(file);
    return {
      title: data.title,
      date: data.date,
      content,
    };
  } catch {
    return null; // Remove unused `err` variable
  }
}