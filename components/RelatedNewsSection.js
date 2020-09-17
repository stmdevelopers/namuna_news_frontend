import Link from "next/link";
import axios from "axios";
import { BASE_URL, getPublishedDate, getPublishedTime } from "./Helpers";
import useSWR from "swr";

// Fetcher function for useSWR hook
const fetcher = apiUrl => axios.get(apiUrl).then(res => res.data);

export default function RelatedNewsSection(props) {
  const baseUrl = BASE_URL;
  
  // Fetch the related news data through the API
  const baseApiUrl = BASE_URL + "/api";
  const relatedNewsApiUrl = `${baseApiUrl}/categories/${props.newsItem.category.id}`;
  const { data, error } = useSWR(relatedNewsApiUrl, fetcher);

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

  // Fetch the related news data from the response data
  let relatedNews = data.data.news[0];
  // Filter the related news to exclude the current newsItem as well as the news that are not active
  relatedNews = relatedNews.filter(item => item.id != props.newsItem.id && item.status == "active");

  // Grab the first 6 news to display
  let newsList = relatedNews.slice(0, 6);

  return (
    <section className="related-news-section">
      <h3 className="featured-section-heading">Related News</h3>
      <div className="row">
        {newsList && newsList.map(newsItem => (
          <div className="col-sm-6 col-lg-4" key={newsItem.id}>
            <article className="news-item">
              <div className="news-img-area">
                <img className="img-fluid" src={`${baseUrl}${newsItem.featured_image}`} />
                <span className="news-time">{getPublishedTime(newsItem.created_at)}</span>
              </div>
              <Link href={`/news/${newsItem.id}`}>
                <a className="news-title">
                  {newsItem.news_translations[0].title}
                </a>
              </Link>
              <p className="news-meta">
                <ion-icon name="calendar-outline"></ion-icon> 
                <span>{getPublishedDate(newsItem.created_at)}</span> | 
                <span>{newsItem.category.slug}</span>
              </p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}