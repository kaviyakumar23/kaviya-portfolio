import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllVarigal } from '@/lib/getAllScribbles'

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title>{article.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <Head>
        <title>வரிகள் - Kaviya Kumar</title>
        <meta
          name="description"
          content="Journey through succinct expressions that encapsulate the beauty of emotions and the essence of existence, inviting you to explore the intricacies of love and the tapestry of life."
        />
      </Head>
      <SimpleLayout
        title="என் சொல்லில்..."
        intro="
        அவ்வப்போது தோன்றிய எண்ணங்களின் வெளிப்பாடுகள், எழுத்துக்கள் வாயிலாக."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllVarigal()).map(({ component, ...meta }) => meta),
    },
  }
}
