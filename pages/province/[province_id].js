import Head from "next/head";
import { BASE_URL } from "@/components/Helpers";
import SingleProvince from "@/components/SingleProvince";

export default function ProvincePage(props) {

  return (
    <React.Fragment>
      <Head>
        <title>{props.provincePageData.slug} News - Namuna News</title>
        <meta title="description" content="This is a meta description for the Single Province page." />
      </Head>
      <SingleProvince title={props.provincePageData.slug} featuredProvinceNews={props.featuredProvinceNews} />
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  const apiUrl = BASE_URL + "/api";

  // Get the province_id from the query parameters
  const province_id = context.params.province_id;
  // Fetch the list of news for the given province_id through the API
  const provinceData = await fetch(`${apiUrl}/province/${province_id}`).then(res => res.json());
  const newsList = provinceData.data.news[0];

  // Initialise province news list
  let featuredProvinceNews = [];
  // Populate each province news list with the corresponding news data from the news list by fetching them from the API
  for (let i=0; i<newsList.length; i++) {
    const newsData = await fetch(`${apiUrl}/news/${newsList[i].id}`).then(res => res.json());
    if (newsData.data.news_label.toLowerCase() == "breaking" || newsData.data.news_label.toLowerCase() == "featured") {
      featuredProvinceNews.push(newsData.data);
    }
  }
  
  return {
    props: {
      provincePageData: provinceData.data,
      featuredProvinceNews: featuredProvinceNews
    }
  }
}