import Link from "next/link";
import { ArticleCard, ArticleCover } from "@/components/ArticleCard";
import { Newsletter } from "@/components/Newsletter";
import { getAllArticles, getFeatured } from "@/lib/articles";

const deskCopy = {
  Parents: "Clear guidance for adults raising children who use Roblox.",
  Industry: "The companies, money, rules and business decisions shaping Roblox.",
  Games: "The experiences people play, how they work and why they matter.",
  Studios: "The teams and businesses building Roblox experiences.",
  Education: "How schools, teachers and learners use and respond to Roblox.",
};

export default async function Home() {
  const articles = await getAllArticles(false);
  const featured = await getFeatured();
  const latest = articles.filter((article) => article.slug !== featured?.slug).slice(0, 6);

  return (
    <>
      <h1 className="sr-only">The Bloxline, The Adult’s Guide to Roblox</h1>
      {featured && (
        <section className="section container homepage-lead">
          <div className="section-heading">
            <h2>Featured story</h2>
            <Link className="text-link" href="/latest">All stories</Link>
          </div>
          <article className="featured">
            <Link href={`/articles/${featured.slug}`} tabIndex={-1}>
              <ArticleCover article={featured} large />
            </Link>
            <div>
              <span className="eyebrow">{featured.primaryDesk}</span>
              <h2><Link href={`/articles/${featured.slug}`}>{featured.title}</Link></h2>
              <p className="summary">{featured.excerpt}</p>
              <div className="meta featured-meta">
                <span className="byline">By {featured.author}</span>
                <span className="meta-divider" aria-hidden="true">•</span>
                <time dateTime={featured.publishedAt}>
                  {new Date(`${featured.publishedAt}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </time>
                <span className="meta-divider" aria-hidden="true">•</span>
                <span className="reading-time">{featured.readingTime}</span>
              </div>
              <p><Link className="text-link" href={`/articles/${featured.slug}`}>Read article</Link></p>
            </div>
          </article>
        </section>
      )}

      <section className="section container">
        <div className="section-heading"><h2>Latest stories</h2><Link className="text-link" href="/latest">View latest</Link></div>
        <div className="article-grid">{latest.map((article) => <ArticleCard key={article.slug} article={article} />)}</div>
      </section>

      <section className="section container">
        <div className="section-heading"><h2>Browse by desk</h2></div>
        <div className="desk-grid">
          {Object.entries(deskCopy).map(([desk, copy]) => (
            <Link className="desk-link" href={`/${desk.toLowerCase()}`} key={desk}>
              <div><h3>{desk}</h3><p>{copy}</p></div><span className="text-link">Explore</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="statement">
        <div>
          <h2>Roblox is bigger than most adults realise</h2>
          <p>Millions of children play Roblox, but it is also home to businesses, studios, jobs, communities and brands.</p>
          <p>The Bloxline helps adults understand what is happening without asking them to become Roblox experts first.</p>
        </div>
      </section>

      <section className="section container">
        <div className="promo">
          <div><span className="eyebrow">New to Roblox?</span><h2>Start with the essentials</h2><p>A clear introduction to Roblox, its games, money, culture and risks.</p></div>
          <Link className="button" href="/start-here">Read the Start Here guide</Link>
        </div>
      </section>
      <section className="container" style={{ paddingBottom: 64 }}><Newsletter /></section>
    </>
  );
}
