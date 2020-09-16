import Head from "next/head";
import axios from "axios";
import SingleNews from "@/components/SingleNews";
import RelatedNewsSection from "@/components/RelatedNewsSection";
import { BASE_URL } from "@/components/Helpers";
import useSWR from "swr";

// Fetcher function for useSWR hook
const fetcher = apiUrl => axios.get(apiUrl).then(res => res.data);

export default function NewsPage(props) {
  // Get the news_id from the query parameters
  const news_id = props.news_id;

  // Fetch the news data through the API
  const baseApiUrl = BASE_URL + "/api";
  const newsApiUrl = `${baseApiUrl}/news/${news_id}`;
  const { data, error } = useSWR(newsApiUrl, fetcher);

  // Handle errors and loading states
  if (error) {
    return (
      <h4 className="text-center mx-1 my-5">Error fetching data. Please try again.</h4>
    )
  }
  if (!data) {
    return (
      <h4 className="text-center mx-1 my-5">Loading...</h4>
    )
  }

  // Extract the news page data from the response data
  let newsItem = data.data;

  return (
    <React.Fragment>
      <Head>
        <title>{newsItem.news_translations[0][0].title} - Namuna News</title>
        <meta title="description" content="" />
      </Head>
      
      <div className="container">
        <SingleNews newsItem={newsItem} />
        <RelatedNewsSection newsItem={newsItem} />
      </div>
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      news_id: context.params.news_id
    }
  }
}

// export async function getStaticPaths() {
//   const apiUrl = BASE_URL + "/api";

//   // Fetch the list of all the news items through the API to pre-render news pages
//   let newsItems = null;
//   try {
//     const response = await axios.get(`${apiUrl}/news/all`);
//     newsItems = await response.data;
//   } catch (err) {
//     console.log(err);
//   }

//   // Filter only the active news items
//   newsItems = newsItems ? newsItems.data.filter(item => item.status == "active") : [];
//   // Create a list of all the news pages paths
//   const newsPaths = newsItems.map(newsItem => ({
//     params: { news_id: newsItem.id.toString() }
//   }));

//   return {
//     paths: newsPaths,
//     fallback: true
//   }
// }

// export async function getServerSideProps(context) {
//   const apiUrl = BASE_URL + "/api";

//   // Get the news_id from the query parameters
//   const news_id = context.params.news_id;
//   // Fetch the news for the given news_id through the API
//   let newsItem = null;
//   try {
//     const response = await axios.get(`${apiUrl}/news/${news_id}`);
//     newsItem = await response.data;
//   } catch (err) {
//     console.log(err);
//   }

//   // Grab the news data for the current news
//   newsItem = newsItem.data;
//   // Fetch the related news for the current newsItem
//   let relatedNews;
//   try {
//     const response = await axios.get(`${apiUrl}/categories/${newsItem.category.id}`);
//     relatedNews = await response.data;
//   } catch (err) {
//     console.log(err);
//   }

//   // Filter the related news to exclude the current newsItem as well as the news that are not active
//   relatedNews = relatedNews ? relatedNews.data.news[0].filter(item => item.id != news_id && item.status == "active") : [];

//   // Fetch the data for each of the related news item and append it to the relatedNewsList
//   let relatedNewsList = [];
//   for (let i=0; i<relatedNews.length; i++) {
//     const newsData = await fetch(`${apiUrl}/news/${relatedNews[i].id}`).then(res => res.json());
//     relatedNewsList.push(newsData.data);
//   }
  
//   return {
//     props: {
//       newsItem: newsItem,
//       relatedNews: relatedNews
//     },
//     // revalidate: 1
//   }
// }