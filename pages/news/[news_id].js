import Head from "next/head";
import SingleNews from "@/components/SingleNews";
import { BASE_URL } from "@/components/Helpers";

export default function NewsPage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>{props.newsItem.news_translations[0][0].title} - Namuna News</title>
        <meta title="description" content="This is a meta description for the Single News page." />
      </Head>
      <SingleNews newsItem={props.newsItem} relatedNews={props.relatedNews} />
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  const apiUrl = BASE_URL + "/api";

  // Get the news_id from the query parameters
  const news_id = context.params.news_id;
  // Fetch the news for the given news_id through the API
  let newsItem = await fetch(`${apiUrl}/news/${news_id}`).then(res => res.json());
  newsItem = newsItem.data;
  // Fetch the related news for the current newsItem
  let relatedNews = await fetch(`${apiUrl}/categories/${newsItem.category.id}`).then(res => res.json());
  // Filter the related news to exclude the current newsItem
  relatedNews = relatedNews.data.news[0].filter(item => item.id != news_id);

  // Fetch the data for each of the related news item and append it to the relatedNewsList
  let relatedNewsList = [];
  for (let i=0; i<relatedNews.length; i++) {
    const newsData = await fetch(`${apiUrl}/news/${relatedNews[i].id}`).then(res => res.json());
    relatedNewsList.push(newsData.data);
  }
  
  return {
    props: {
      newsItem: newsItem,
      relatedNews: relatedNewsList
    }
  }
}