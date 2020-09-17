import SectionHeading from "./SectionHeading";
import Link from "next/link";
import { BASE_URL, getPublishedDate, getPublishedTime } from "./Helpers";

export default function NewsSection(props) {
  const baseUrl = BASE_URL;

  // Grab the first 4 news to display
  const newsList = props.news ? props.news.slice(0, 4) : [];

  return (
    <div className="container">
      <div className="row news-content-section">
        <section className={`${props.title.toLowerCase()}-news-section`}>
          <SectionHeading value={props.title} />
          <div className="row">
            {newsList && newsList.map(newsItem => {
              return (
              <div className="col-sm-6 col-lg-3" key={newsItem.id}>
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
            )})}
          </div>
        </section>
      </div>
    </div>
  );
}