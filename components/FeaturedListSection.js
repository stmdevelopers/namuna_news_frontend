import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { BASE_URL, getPublishedDate, getPublishedTime } from "./Helpers";

export default function FeaturedListSection(props) {  
  const baseUrl = BASE_URL;

  return (
    <div className="container">
      <div className="row news-content-section">

        <div className="col-lg-6">
          <div className="row">
            <section className="featured-news">
              <h4 className="featured-news-heading">Featured</h4>
              <div className="featured-news-list">
                {props.featuredNews && props.featuredNews.map(newsItem => (
                  <article className="news-item" key={newsItem.id}>
                    <div className="row">
                      <div className="col-sm-6 col-lg-12 col-xl-6">
                        <div className="news-img-area">
                          <img className="img-fluid" src={`${baseUrl}${newsItem.featured_image}`} />
                          <span className="news-time">{getPublishedTime(newsItem.created_at)}</span>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-12 col-xl-6">
                        <div className="d-flex flex-column justify-content-between h-100">
                          <Link href={`/news/${newsItem.id}`}>
                            <a className="news-title mt-sm-0 mt-lg-3 mt-xl-0">
                              {newsItem.news_translations[0].title}
                            </a>
                          </Link>
                          <p className="news-meta">
                            <ion-icon name="calendar-outline"></ion-icon> 
                            <span>{getPublishedDate(newsItem.created_at)}</span> | 
                            <span>{newsItem.category.slug}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row">
            <section className="video-news">
              <SectionHeading value="Videos" />
              <div className="video-news-list">
                {props.videoResources && props.videoResources.map(videoItem => (
                  <article className="video-item" key={videoItem.id}>
                    <iframe width="100%" height="275" src={`https://www.youtube.com/embed/${videoItem.url.replace("https://www.youtube.com/watch?v=", "")}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <p className="news-title">
                      {videoItem.translations[0][0] ? videoItem.translations[0][0].description : ""}
                    </p>
                    <p className="news-meta">
                      <ion-icon name="calendar-outline"></ion-icon> 
                      <span>{getPublishedDate(videoItem.translations[0][0] ? videoItem.translations[0][0].created_at : videoItem.created_at)}</span> | 
                      <span>{videoItem.keywords}</span>
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
        
      </div>
    </div>
  );
}