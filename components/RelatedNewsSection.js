import Link from "next/link";
import dateFormat from "dateformat";
import { BASE_URL, getPublishedDate } from "./Helpers";

export default function RelatedNewsSection(props) {
  const baseUrl = BASE_URL;

  // Grab the first 6 news to display
  let newsList = props.news ? props.news.slice(0, 6) : null;

  return (
    <div className="row">
      {newsList && newsList.map(newsItem => (
        <div className="col-sm-6 col-lg-4" key={newsItem.id}>
          <article className="news-item">
            <div className="news-img-area">
              <img className="img-fluid" src={`${baseUrl}${newsItem.featured_image}`} />
              <span className="news-time">{dateFormat(newsItem.updated_at, "H")} hours ago</span>
            </div>
            <Link href={`/news/${newsItem.id}`}>
              <a className="news-title">
                {newsItem.news_translations[0][0].title}
              </a>
            </Link>
            <p className="news-meta">
              <ion-icon name="calendar-outline"></ion-icon> 
              <span>{getPublishedDate(newsItem.created_at.substring(0, 10))}</span> | 
              <span>{newsItem.category.slug}</span>
            </p>
          </article>
        </div>
      ))}
    </div>
  );
}