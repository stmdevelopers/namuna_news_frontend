import Head from "next/head";
import axios from "axios";
import { BASE_URL } from "@/components/Helpers";
import SingleProvince from "@/components/SingleProvince";

export default function ProvincePage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>{props.provincePageData ? props.provincePageData.slug : ""} News - Namuna News</title>
        <meta title="description" content="" />
      </Head>
      
      <SingleProvince title={props.provincePageData ? props.provincePageData.slug : ""} featuredProvinceNews={props.featuredProvinceNews} />
    </React.Fragment>
  )
}

// export async function getStaticPaths() {
//   const apiUrl = BASE_URL + "/api";

//   // Fetch the list of all the provinces id through the API to pre-render province pages
//   let provinceData = null;
//   try {
//     const response = await axios.get(`${apiUrl}/province/all`);
//     provinceData = await response.data;
//   } catch (err) {
//     console.log(err);
//   }

//   // Filter only the active provinces
//   provinceData = provinceData.data.filter(province => province.display_status == 1);
//   // Create a list of all the province pages paths
//   const provincePaths = provinceData.map(province => ({
//     params: { province_id: province.id.toString() },
//   }));

//   return {
//     paths: provincePaths,
//     fallback: true
//   }
// }

export async function getServerSideProps(context) {
  const apiUrl = BASE_URL + "/api";

  // Fetch the list of news for all the available province pages through the API
  let provinceData = null;
  try {
    const response = await axios.get(`${apiUrl}/province/${context.params.province_id}`);
    provinceData = await response.data;
  } catch (err) {
    console.log(err);
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
    // revalidate: 1
  }
}