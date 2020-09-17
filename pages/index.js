import Head from "next/head";
import axios from "axios";
import FeaturedNewsSection from "@/components/FeaturedNewsSection";
import NewsSection from "@/components/NewsSection";
import WeatherSection from "@/components/WeatherSection";
import FeaturedListSection from "@/components/FeaturedListSection";
import { BASE_URL } from "@/components/Helpers";
import { useEffect, useState } from "react";

export default function Home(props) {

  // State declarations
  const [breakingNews, setBreakingNews] = useState([]);
  const [todaysNews, setTodaysNews] = useState([]);
  const [nepalNews, setNepalNews] = useState([]);
  const [sportsNews, setSportsNews] = useState([]);
  const [technologyNews, setTechnologyNews] = useState([]);
  const [educationNews, setEducationNews] = useState([]);
  const [worklifeNews, setWorklifeNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [videoResources, setVideoResources] = useState([]);

  // Use effect function to run on the initial page load
  useEffect(() => {
    const apiUrl = BASE_URL + "/api";

    // Fetch news data through API    
    axios.get(`${apiUrl}/news/all`)
    .then(res => res.data)
    .then(newsData => {
      // Get breaking news and grab the first 3 news items
      let breakingNews = newsData.data.filter(newsItem => newsItem.news_label.toLowerCase() == "breaking" && newsItem.status == "active");
      breakingNews = breakingNews.slice(0, 3);
      setBreakingNews(breakingNews);
      // Get today's news and grab the first 4 news items
      let todaysNews = newsData.data.filter(newsItem => /*newsItem.created_at.substring(0, 10) == todaysDate &&*/ newsItem.news_label.toLowerCase() == "featured" && newsItem.status == "active");
      todaysNews = todaysNews.slice(0, 4);
      setTodaysNews(todaysNews);
      // Get featured news and grab the first 4 items
      let featuredNews = newsData.data.filter(newsItem => newsItem.news_label.toLowerCase() == "featured" && newsItem.status == "active");
      featuredNews = featuredNews.slice(0, 4);
      setFeaturedNews(featuredNews);
    })
    .catch(err => console.log(err));

    // Fetch resources data through API
    axios.get(`${apiUrl}/resources/all`)
    .then(res => res.data)
    .then(resourcesData => {
      // Get video resources and grab the first 2 items
      let videoResources = resourcesData.data.filter(item => item.type == "video");
      videoResources = videoResources.slice(0, 2);
      setVideoResources(videoResources);
    })
    .catch(err => console.log(err));

    // Fetch categories data using an API call
    axios.get(`${apiUrl}/categories/all`)
    .then(res => res.data)
    .then(categoriesData => {
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
          nepalNews = category.news[0];
        }
        if (category.slug.toLowerCase() == "sports") {
          sportsNews = category.news[0];
        }
        if (category.slug.toLowerCase() == "technology") {
          technologyNews = category.news[0];
        }
        if (category.slug.toLowerCase() == "education") {
          educationNews = category.news[0];
        }
        if (category.slug.toLowerCase() == "worklife") {
          worklifeNews = category.news[0];
        }
      }

      setNepalNews(nepalNews);
      setSportsNews(sportsNews);
      setTechnologyNews(technologyNews);
      setEducationNews(educationNews);
      setWorklifeNews(worklifeNews);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Home - Namuna News</title>
        <meta title="description" content="" />
      </Head>
      
      <FeaturedNewsSection breakingNews={breakingNews} todaysNews={todaysNews} nepalNews={nepalNews} />
      <NewsSection title="Sports" news={sportsNews} />
      <NewsSection title="Technology" news={technologyNews} />
      <WeatherSection />
      <NewsSection title="Education" news={educationNews} />
      <NewsSection title="Worklife" news={worklifeNews} />
      <FeaturedListSection featuredNews={featuredNews} videoResources={videoResources} />
    </React.Fragment>
  );
}
