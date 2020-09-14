import Link from "next/link";
import dateFormat from "dateformat";
import { BASE_URL, getPublishedDate } from "@/components/Helpers";
import RelatedNewsSection from "./RelatedNewsSection";

export default function SingleNews(props) {
  const baseUrl = BASE_URL;

  return (
    <React.Fragment>
      <div className="container">
        <section className="single-news">
          <div className="single-news-categories">
            {props.newsItem && (
              <ul>
                <li>
                  <Link href={`/province/${props.newsItem.province.id}`}><a className="">{props.newsItem.province.slug}</a></Link>
                </li>
                <li>
                  <Link href={`/category/${props.newsItem.category.id}`}><a className="">{props.newsItem.category.slug}</a></Link>
                </li>
              </ul>
            )}
          </div>

          <h1 className="news-title">{props.newsItem ? props.newsItem.news_translations[0][0].title : ""}</h1>
          
          <section className="news-meta-section d-flex justify-content-between">
            <p className="news-meta">
              <span className="news-meta-item">
                <ion-icon name="time-outline"></ion-icon>
                <span>{props.newsItem ? dateFormat(props.newsItem.news_translations[0][0].updated_at, "H") : ""} hours ago</span>
              </span>
              <span className="news-meta-item">
                <ion-icon name="calendar-outline"></ion-icon> 
                <span>{props.newsItem ? getPublishedDate(props.newsItem.news_translations[0][0].created_at.substring(0, 10)) : ""}</span>
              </span>
            </p>
            <p className="news-meta-author">
              Posted by {props.newsItem ? props.newsItem.author : ""}
            </p>
          </section>

          <div className="single-news-img-area">
            <img className="img-fluid" src={props.newsItem ? `${baseUrl}${props.newsItem.featured_image}` : ""} />
          </div>

          <div className="news-content" dangerouslySetInnerHTML={{__html: props.newsItem ? props.newsItem.news_translations[0][0].content : "" }}>
            {/* News Content Goes Here... */}
          </div>

          <div className="news-share-section d-flex justify-content-start align-items-center">
            <h5 className="news-share-title">Share:</h5>
            <div className="news-share-icons">
              <a target="_blank" href={`https://www.facebook.com/sharer.php?u=${baseUrl}/news/${props.newsItem ? props.newsItem.id : ""}`}><ion-icon name="logo-facebook"></ion-icon></a>
              <a target="_blank" href={`https://twitter.com/share?text=${props.newsItem ? props.newsItem.news_translations[0][0].title : ""}&url=${baseUrl}/news/${props.newsItem ? props.newsItem.id : ""}&via=${baseUrl}`}><ion-icon name="logo-twitter"></ion-icon></a>
              <a target="_blank" href={`https://www.linkedin.com/shareArticle?mini=true&url=${baseUrl}/news/${props.newsItem ? props.newsItem.id : ""}&title=${props.newsItem ? props.newsItem.news_translations[0][0].title : ""}`}><ion-icon name="logo-linkedin"></ion-icon></a>
            </div>
          </div>
        </section>
        <section className="related-news-section">
          <h3 className="featured-section-heading">Related News</h3>
          <RelatedNewsSection news={props.relatedNews} />
        </section>
      </div>
    </React.Fragment>
  )
}