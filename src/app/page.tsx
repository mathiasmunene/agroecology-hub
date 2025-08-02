import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type Article = {
  title: string;
  date: string;
  excerpt: string;
};

export default async function Home() {
  const articles = getArticles();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Agroecology Resource Hub</h1>
      <div className="space-y-6">
        {articles.map((article, i) => (
          <div key={i} className="border rounded-lg p-4 shadow">
            <a href={`/articles/${slugify(article.title)}`} className="text-xl font-semibold text-green-700 hover:underline">
              {article.title}
            </a>
            <p className="text-gray-500 text-sm">{article.date}</p>
            <p className="mt-2 text-gray-700">{article.excerpt}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

function getArticles(): Article[] {
  const files = fs.readdirSync(path.join(process.cwd(), 'content/articles'));

  return files.map((filename) => {
    const fileContent = fs.readFileSync(
      path.join(process.cwd(), 'content/articles', filename),
      'utf-8'
    );
    const { data, content } = matter(fileContent);

    return {
      title: data.title,
      date: data.date,
      excerpt: content.slice(0, 150) + '...',
    };
  });
}
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

