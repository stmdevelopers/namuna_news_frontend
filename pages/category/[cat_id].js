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
      <h4 className="text-center mx-1 my-5">Error fetching data. Please try again.</h4>
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

// export async function getStaticPaths() {
//   const apiUrl = BASE_URL + "/api";

//   // Fetch the list of all the categories id through the API to pre-render category pages
//   let categoryData = null;
//   try {
//     const response = await axios.get(`${apiUrl}/categories/all`);
//     categoryData = await response.data;
//   } catch (err) {
//     console.log(err);
//   }

//   // Filter only the active categories
//   categoryData = categoryData.data.filter(category => category.display_status == 1);
//   // Create a list of all the category pages paths
//   const categoryPaths = categoryData.map(category => ({
//     params: { cat_id: category.id.toString() }
//   }));

//   return {
//     paths: categoryPaths,
//     fallback: true
//   }
// }

// export async function getServerSideProps(context) {
//   const apiUrl = BASE_URL + "/api";

//   // Get the cat_id from the query parameters
//   const cat_id = context.params.cat_id;
//   // Fetch the list of news for the given category_id through the API
//   let categoryData = null;
//   try {
//     const response = await axios.get(`${apiUrl}/categories/${cat_id}`);
//     categoryData = await response.data;
//   } catch (err) {
//     console.log(err);
//   }

//   // Get all the news for this category
//   const newsList = categoryData.data.news[0];
//   // Initialise category news list
//   let featuredCategoryNews = [];
//   // Populate each category news list with the corresponding news data from the news list by fetching them from the API
//   for (let i=0; i<newsList.length; i++) {
//     const newsData = await fetch(`${apiUrl}/news/${newsList[i].id}`).then(res => res.json());
//     if (newsData.data.news_label.toLowerCase() == "breaking" || newsData.data.news_label.toLowerCase() == "featured") {
//       featuredCategoryNews.push(newsData.data);
//     }
//   }

//   // Get the list of all the categories from the API
//   let categoriesData = null;
//   try {
//     const response = await axios.get(`${apiUrl}/categories/all`);
//     categoriesData = await response.data;
//   } catch (err) {
//     console.log(err);
//   }
  
//   // Filter the categories list to get the list of all the subcategories of the current category
//   const categoriesList = categoriesData.data.filter(category => category.display_status == 1 && category.parent_id == cat_id);

//   // Initialise subcategories array
//   let subCategoriesData = [];
//   // Foreach category in categories list
//   for (let i=0; i<categoriesList.length; i++) {
//     // Grab the active news list for that category
//     const news = categoriesList[i].news[0].filter(newsItem => newsItem.status == "active");
//     // Fetch all the news data for those news
//     let newsData = [];
//     for (let j=0; j<news.length; j++) {
//       const newsItem = await fetch(`${apiUrl}/news/${news[j].id}`).then(res => res.json());
//       newsData.push(newsItem.data);
//     }
//     // Add the category to our subCategoriesData array along with the list of all the news for that category
//     subCategoriesData.push({ id: categoriesList[i].id, slug: categoriesList[i].slug, news: newsData });
//   }
  
//   return {
//     props: {
//       categoryData: categoryData.data,
//       featuredCategoryNews: featuredCategoryNews,
//       subCategoriesData: subCategoriesData
//     },
//     // revalidate: 1
//   }
// }