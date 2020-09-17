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
      <h4 className="text-center mx-1 my-5">Something went wrong! Please try again.</h4>
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
        <title>{newsItem.news_translations[0].title} - Namuna News</title>
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