import Head from "next/head";
import axios from "axios";
import { BASE_URL } from "@/components/Helpers";
import SingleProvince from "@/components/SingleProvince";
import useSWR from "swr";

// Fetcher function for useSWR hook
const fetcher = apiUrl => axios.get(apiUrl).then(res => res.data);

// Function to extract the province page data and featured province news
const getProvinceData = provinceData => {
  // Get the list of all the news for this province
  let newsList = provinceData.data.news[0];
  // Filter only the news that are active
  newsList = newsList.filter(newsItem => newsItem.status == "active");
  // Initialise featured and normal province news list
  let featuredProvinceNews = [];
  let normalProvinceNews = [];
  // Populate featured and normal province news list with the corresponding news data from the news list
  for (let i=0; i<newsList.length; i++) {
    if (newsList[i].news_label.toLowerCase() == "breaking" || newsList[i].news_label.toLowerCase() == "featured") {
      featuredProvinceNews.push(newsList[i]);
    } else {
      normalProvinceNews.push(newsList[i]);
    }
  }
  return {
    data: provinceData.data,
    featuredProvinceNews: featuredProvinceNews
  }
}

export default function ProvincePage(props) {
  // Get the province_id from the query parameters
  const province_id = props.province_id;

  // Fetch the province data through the API
  const baseApiUrl = BASE_URL + "/api";
  const apiUrl = `${baseApiUrl}/province/${province_id}`;
  const { data, error } = useSWR(apiUrl, fetcher);

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

  // Extract the province page data from the response data
  const provincePageData = getProvinceData(data);

  return (
    <React.Fragment>
      <Head>
        <title>{provincePageData.data.slug} News - Namuna News</title>
        <meta title="description" content="" />
      </Head>

      <SingleProvince title={provincePageData.data.slug} featuredProvinceNews={provincePageData.featuredProvinceNews} />
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      province_id: context.params.province_id
    }
  }
}