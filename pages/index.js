import Head from "next/head";
import axios from "axios";
import FeaturedNewsSection from "@/components/FeaturedNewsSection";
import NewsSection from "@/components/NewsSection";
import WeatherSection from "@/components/WeatherSection";
import FeaturedListSection from "@/components/FeaturedListSection";
import { BASE_URL } from "@/components/Helpers";

export default function Home(props) {
  return (
    <React.Fragment>
      <Head>
        <title>Home - Namuna News</title>
        <meta title="description" content="" />
      </Head>
      <FeaturedNewsSection breakingNews={props.breakingNews} todaysNews={props.todaysNews} nepalNews={props.nepalNews} />
      <NewsSection title="Sports" news={props.sportsNews} />
      <NewsSection title="Technology" news={props.technologyNews} />
      <WeatherSection weatherData={props.weatherData} />
      <NewsSection title="Education" news={props.educationNews} />
      <NewsSection title="Worklife" news={props.worklifeNews} />
      <FeaturedListSection featuredNews={props.featuredNews} videoResources={props.videoResources} />
    </React.Fragment>
  );
}

export async function getStaticProps(context) {
  const apiUrl = BASE_URL + "/api";
  
  // Fetch weather data through API
  const cities = ["Galkot", "Kathmandu", "Tokyo", "Melbourne"];
  const weatherData = await Promise.all([
                        fetch("http://api.weatherapi.com/v1/current.json?key=755449ef75734ac0bc634701203107&q=" + cities[0]).then(res => res.json()),
                        fetch("http://api.weatherapi.com/v1/current.json?key=755449ef75734ac0bc634701203107&q=" + cities[1]).then(res => res.json()),
                        fetch("http://api.weatherapi.com/v1/current.json?key=755449ef75734ac0bc634701203107&q=" + cities[2]).then(res => res.json()),
                        fetch("http://api.weatherapi.com/v1/current.json?key=755449ef75734ac0bc634701203107&q=" + cities[3]).then(res => res.json())
                      ]);

  // Fetch news data through API
  let newsData = null;
  let breakingNews = null;
  let todaysNews = null;
  let featuredNews = null;
  try {
    const response = await axios.get(`${apiUrl}/news/all`);
    newsData = response.data;
  } catch (err) {
    console.error(err);
  }

  // Get breaking news and grab the first 3 news items
  breakingNews = newsData.data.filter(newsItem => newsItem.news_label.toLowerCase() == "breaking");
  breakingNews = breakingNews.slice(0, 3);
  // Get today's news and grab the first 4 news items
  todaysNews = newsData.data.filter(newsItem => /*newsItem.created_at.substring(0, 10) == todaysDate &&*/ newsItem.news_label.toLowerCase() == "featured");
  todaysNews = todaysNews.slice(0, 4);
  // Get featured news and grab the first 4 items
  featuredNews = newsData.data.filter(newsItem => newsItem.news_label.toLowerCase() == "featured");
  featuredNews = featuredNews.slice(0, 4);

  // Fetch resources data through API
  let resourcesData = null;
  let videoResources = null;
  try {
    const response = await axios.get(`${apiUrl}/resources/all`);
    resourcesData = response.data;
  } catch (err) {
    console.error(err);
  }
  // Get video resources and grab the first 2 items
  videoResources = resourcesData.data.filter(item => item.type == "video");
  videoResources = videoResources.slice(0, 2);

  // Fetch categories data using an API call
  let categoriesData = null;
  try {
    const response = await axios.get(`${apiUrl}/categories/all`);
    categoriesData = response.data;
  } catch (err) {
    console.error(err);
  }

  // Initialise category news lists
  let nepalNews = [];
  let sportsNews = [];
  let technologyNews = [];
  let educationNews = [];
  let worklifeNews = [];
  // Populate each category news list with the corresponding news from the categories data
  for (let i=0; i<categoriesData.data.length; i++) {
    let category = categoriesData.data[i];

    if (category.slug.toLowerCase() == "nepal") {
      let newsList = category.news[0];
      for (let i=0; i<newsList.length; i++) {
        const newsData = await fetch(`${apiUrl}/news/${newsList[i].id}`).then(res => res.json());
        nepalNews.push(newsData.data);
      }
    }
    if (category.slug.toLowerCase() == "sports") {
      let newsList = category.news[0];
      for (let i=0; i<newsList.length; i++) {
        const newsData = await fetch(`${apiUrl}/news/${newsList[i].id}`).then(res => res.json());
        sportsNews.push(newsData.data);
      }
    }
    if (category.slug.toLowerCase() == "technology") {
      let newsList = category.news[0];
      for (let i=0; i<newsList.length; i++) {
        const newsData = await fetch(`${apiUrl}/news/${newsList[i].id}`).then(res => res.json());
        technologyNews.push(newsData.data);
      }
    }
    if (category.slug.toLowerCase() == "education") {
      let newsList = category.news[0];
      for (let i=0; i<newsList.length; i++) {
        const newsData = await fetch(`${apiUrl}/news/${newsList[i].id}`).then(res => res.json());
        educationNews.push(newsData.data);
      }
    }
    if (category.slug.toLowerCase() == "worklife") {
      let newsList = category.news[0];
      for (let i=0; i<newsList.length; i++) {
        const newsData = await fetch(`${apiUrl}/news/${newsList[i].id}`).then(res => res.json());
        worklifeNews.push(newsData.data);
      }
    }
  }

  return {
    props: {
      newsData: newsData,
      weatherData: weatherData,
      breakingNews: breakingNews,
      todaysNews: todaysNews,
      nepalNews: nepalNews,
      sportsNews: sportsNews,
      technologyNews: technologyNews,
      educationNews: educationNews,
      worklifeNews: worklifeNews,
      featuredNews: featuredNews,
      videoResources: videoResources
    }
  }
}
