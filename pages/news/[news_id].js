import Head from "next/head";
import axios from "axios";
import SingleNews from "@/components/SingleNews";
import { BASE_URL } from "@/components/Helpers";

export default function NewsPage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>{props.newsItem ? props.newsItem.news_translations[0][0].title : ""} - Namuna News</title>
        <meta title="description" content="" />
      </Head>
      <SingleNews newsItem={props.newsItem} relatedNews={props.relatedNews} />
    </React.Fragment>
  )
}

export async function getStaticPaths() {
  const apiUrl = BASE_URL + "/api";

  // Fetch the list of all the news items through the API to pre-render news pages
  let newsItems;
  try {
    const response = await axios.get(`${apiUrl}/news/all`);
    newItems = response.data;
  } catch (err) {
    console.error(err);
  }

  // Filter only the active news items
  newsItems = newsItems ? newsItems.data.filter(item => item.status == "active") : [];
  // Create a list of all the news pages paths
  const newsPaths = newsItems.map(newsItem => ({
    params: { news_id: newsItem.id.toString() }
  }));

  return {
    paths: newsPaths,
    fallback: true
  }
}

export async function getStaticProps(context) {
  const apiUrl = BASE_URL + "/api";

  // Get the news_id from the query parameters
  const news_id = context.params.news_id;
  // Fetch the news for the given news_id through the API
  let newsItem;
  try {
    const response = await axios.get(`${apiUrl}/news/${news_id}`);
    newsItem = response.data;
  } catch (err) {
    console.error(err);
  }

  // Grab the news data for the current news
  newsItem = newsItem.data;
  // Fetch the related news for the current newsItem
  let relatedNews;
  try {
    const response = await axios.get(`${apiUrl}/categories/${newsItem.category.id}`);
    relatedNews = response.data;
  } catch (err) {
    console.error(err);
  }

  // Filter the related news to exclude the current newsItem as well as the news that are not active
  relatedNews = relatedNews ? relatedNews.data.news[0].filter(item => item.id != news_id && item.status == "active") : [];

  // Fetch the data for each of the related news item and append it to the relatedNewsList
  let relatedNewsList = [];
  for (let i=0; i<relatedNews.length; i++) {
    const newsData = await fetch(`${apiUrl}/news/${relatedNews[i].id}`).then(res => res.json());
    relatedNewsList.push(newsData.data);
  }
  
  return {
    props: {
      newsItem: newsItem,
      relatedNews: relatedNews
    },
    revalidate: 1
  }
}