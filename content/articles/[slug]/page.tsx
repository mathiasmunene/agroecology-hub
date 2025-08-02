import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content/articles'));

  return files.map((filename) => {
    const slug = filename.replace('.md', '');
    return { slug };
  });
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const article = getArticle(params.slug);
  return {
    title: article?.title || 'Article',
  };
}

export default function ArticlePage({ params }: { params: Params }) {
  const article = getArticle(params.slug);
  if (!article) return notFound();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{article.date}</p>
      <div className="prose prose-lg">{article.body}</div>
    </main>
  );
}

function getArticle(slug: string) {
  try {
    const file = fs.readFileSync(path.join(process.cwd(), 'content/articles', `${slug}.md`), 'utf-8');
    const { data, content } = matter(file);
    return {
      title: data.title,
      date: data.date,
      body: content,
    };
  } catch {
    return null;
  }
}
