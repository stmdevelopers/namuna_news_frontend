import Head from "next/head";
import axios from "axios";
import { BASE_URL } from "@/components/Helpers";
import SingleCategory from "@/components/SingleCategory";
import useSWR from "swr";

// Fetcher function for useSWR hook
const fetcher = apiUrl => axios.get(apiUrl).then(res => res.data);

export default function CategoryPage(props) {
  // Get the category id from the query parameters
  const cat_id = props.cat_id;

  // Fetch the list of news for the given category_id through the API
  const baseApiUrl = BASE_URL + "/api";
  const newsApiUrl = `${baseApiUrl}/categories/${cat_id}`;
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

  // Set the category page data from the response data
  const categoryPageData = data.data;
  
  return (
    <React.Fragment>
      <Head>
        <title>{categoryPageData.slug} News - Namuna News</title>
        <meta title="description" content="" />
      </Head>
      
      <SingleCategory category={categoryPageData} />
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      cat_id: context.params.cat_id
    }
  }
}