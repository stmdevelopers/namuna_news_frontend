import Head from "next/head";
import { BASE_URL } from "@/components/Helpers";
import SingleProvince from "@/components/SingleProvince";

export default function ProvincePage(props) {

  return (
    <React.Fragment>
      <Head>
        <title>{props.provincePageData.slug} News - Namuna News</title>
        <meta title="description" content="" />
      </Head>
      <SingleProvince title={props.provincePageData.slug} featuredProvinceNews={props.featuredProvinceNews} />
    </React.Fragment>
  )
}

export async function getStaticPaths() {
  const apiUrl = BASE_URL + "/api";

  // Fetch the list of all the provinces id through the API to pre-render province pages
  const response = await fetch(`${apiUrl}/province/all`);

  let provinceData;
  if (response.ok) {
    provinceData = await response.json();
  } else {
    return null;
  }

  // Filter only the active provinces
  provinceData = provinceData.data.filter(province => province.display_status == 1);
  // Create a list of all the province pages paths
  const provincePaths = provinceData.map(province => ({
    params: { province_id: province.id.toString() },
  }));

  return {
    paths: provincePaths,
    fallback: true
  }
}

export async function getStaticProps(context) {
  const apiUrl = BASE_URL + "/api";

  // Fetch the list of news for all the available province pages through the API
  const response = await fetch(`${apiUrl}/province/${context.params.province_id}`)
  
  let provinceData;
  if (response.ok) {
    provinceData = await response.json();
  } else {
    return null;
  }

  // Get the list of all the news for this province
  let newsList = provinceData.data.news[0];
  // Filter only the news that are active
  newsList = newsList.filter(newsItem => newsItem.status == "active");

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
    },
    revalidate: 1
  }
}