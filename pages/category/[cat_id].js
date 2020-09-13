import Head from "next/head";
import { BASE_URL, categoryImages } from "@/components/Helpers";
import SingleCategory from "@/components/SingleCategory";

export default function CategoryPage(props) {

  return (
    <React.Fragment>
      <Head>
        <title>{props.categoryData.slug} News - Namuna News</title>
        <meta title="description" content="This is a meta description for the Single Category page." />
      </Head>
      <SingleCategory title={props.categoryData.slug} featuredCategoryNews={props.featuredCategoryNews} subCategoriesData={props.subCategoriesData} />
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  const apiUrl = BASE_URL + "/api";

  // Get the category_id from the query parameters
  const category_id = context.params.cat_id;
  // Fetch the list of news for the given category_id through the API
  const categoryData = await fetch(`${apiUrl}/categories/${category_id}`).then(res => res.json());
  const newsList = categoryData.data.news[0];

  // Initialise category news list
  let featuredCategoryNews = [];
  // Populate each category news list with the corresponding news data from the news list by fetching them from the API
  for (let i=0; i<newsList.length; i++) {
    const newsData = await fetch(`${apiUrl}/news/${newsList[i].id}`).then(res => res.json());
    if (newsData.data.news_label.toLowerCase() == "breaking" || newsData.data.news_label.toLowerCase() == "featured") {
      featuredCategoryNews.push(newsData.data);
    }
  }

  // Get the list of all the categories from the API
  const categoriesData = await fetch(`${apiUrl}/categories/all`).then(res => res.json());
  // Filter the categories list to get the list of all the subcategories of the current category
  const categoriesList = categoriesData.data.filter(category => category.display_status == 1 && category.parent_id == category_id);

  // Initialise subcategories array
  let subCategoriesData = [];
  // Foreach category in categories list
  for (let i=0; i<categoriesList.length; i++) {
    // Grab the news list for that category
    const news = categoriesList[i].news[0];
    // Fetch all the news data of that category
    let newsData = [];
    for (let j=0; j<news.length; j++) {
      const newsItem = await fetch(`${apiUrl}/news/${news[j].id}`).then(res => res.json());
      newsData.push(newsItem.data);
    }
    // Add the category to our subCategoriesData array along with the list of all the news for that category
    subCategoriesData.push({ id: categoriesList[i].id, slug: categoriesList[i].slug, news: newsData });
  }
  
  return {
    props: {
      categoryData: categoryData.data,
      featuredCategoryNews: featuredCategoryNews,
      subCategoriesData: subCategoriesData
    }
  }
}