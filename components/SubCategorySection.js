import Link from "next/link";
import axios from "axios";
import { BASE_URL } from "./Helpers";
import NewsSection from "./NewsSection";
import useSWR from "swr";

// Fetcher function for useSWR hook
const fetcher = apiUrl => axios.get(apiUrl).then(res => res.data);

function getSubcategoriesData(categoriesData, currentCategory) { 
  // Filter the categories list to get the list of all the subcategories of the current category
  const subCategoriesList = categoriesData.filter(category => category.display_status == 1 && category.parent_id == currentCategory.id);
  // Initialise an array for storing all the subcategories data
  let subCategoriesData = [];
  // Foreach category in subcategories list
  for (let i=0; i<subCategoriesList.length; i++) {
    // Grab the active news list for that category
    const newsList = subCategoriesList[i].news[0].filter(newsItem => newsItem.status == "active");
    // Add the category to our subCategoriesData array along with the list of all the news for that category
    subCategoriesData.push({ id: subCategoriesList[i].id, slug: subCategoriesList[i].slug, news: newsList });
  }
  // Return the subCategories data
  return subCategoriesData;
}

export default function SubCategorySection(props) {
  const baseUrl = BASE_URL;
  // Get the category id from the query parameters
  const cat_id = props.category.id;

  // Get the list of all the categories from the API
  const baseApiUrl = BASE_URL + "/api";
  const newsApiUrl = `${baseApiUrl}/categories/all`;
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

  // Extract all the categories data from the response data
  const categoriesData = data.data;
  // Extract all the subcategories data for the given category using our categories data
  const subCategoriesData = getSubcategoriesData(categoriesData, props.category);

  return (
    <React.Fragment>
      {subCategoriesData && subCategoriesData.map(subCategory => (
        <NewsSection key={subCategory.id} title={subCategory.slug} news={subCategory.news} />
      ))}
    </React.Fragment>
  )
}
