import Link from "next/link";
import dateFormat from "dateformat";
import { BASE_URL, bannerImages, getPublishedDate } from "@/components/Helpers";
import NewsSection from "./NewsSection";

export default function SingleProvince(props) {
  const baseUrl = BASE_URL;

  let featuredProvinceNews = [];
  if (props.featuredProvinceNews) {
  // Grab the first 5 news to show for the Popular News section
    featuredProvinceNews = props.featuredProvinceNews.slice(0, 5);
  }

  return (
    <React.Fragment>
      <section className="single-category">
        <div className="banner-section">
          <img className="img-fluid banner-image" src={bannerImages["sports"]} />
          <div className="banner-image-overlay"></div>
          <h1 className="banner-text">{props.title} News</h1>
        </div>
        <div className="container">

          <section className="popular-news-section">
            <h3 className="featured-section-heading">Popular News</h3>
            <div className="row">
              <div className="col-lg-12 col-xl-6">
                {featuredProvinceNews[0] && (
                  <article className="news-item featured-news-item">
                    <div className="news-img-area">
                      <img className="img-fluid" src={`${baseUrl}${featuredProvinceNews[0].featured_image}`} />
                      <span className="news-time">{dateFormat(featuredProvinceNews[0].updated_at, "H")} hours ago</span>
                    </div>
                    <Link href={`/news/${featuredProvinceNews[0].id}`}>
                      <a className="news-title">
                        {featuredProvinceNews[0].news_translations[0][0].title}
                      </a>
                    </Link>
                    <p className="news-meta">
                      <ion-icon name="calendar-outline"></ion-icon> 
                      <span>{getPublishedDate(featuredProvinceNews[0].created_at.substring(0, 10))}</span> | 
                      <span>{featuredProvinceNews[0].category.slug}</span>
                    </p>
                  </article>
                )}
              </div>
              <div className="col-lg-12 col-xl-6">
                <div className="row">
                  <div className="col-sm-6">
                  {featuredProvinceNews[1] && (
                    <article className="news-item">
                      <div className="news-img-area">
                        <img className="img-fluid" src={`${baseUrl}${featuredProvinceNews[1].featured_image}`} />
                        <span className="news-time">{dateFormat(featuredProvinceNews[1].updated_at, "H")} hours ago</span>
                      </div>
                      <Link href={`/news/${featuredProvinceNews[1].id}`}>
                        <a className="news-title">
                          {featuredProvinceNews[1].news_translations[0][0].title}
                        </a>
                      </Link>
                      <p className="news-meta">
                        <ion-icon name="calendar-outline"></ion-icon> 
                        <span>{getPublishedDate(featuredProvinceNews[1].created_at.substring(0, 10))}</span> | 
                        <span>{featuredProvinceNews[1].category.slug}</span>
                      </p>
                    </article>
                  )}
                  </div>
                  <div className="col-sm-6">
                    {featuredProvinceNews[2] && (
                      <article className="news-item">
                        <div className="news-img-area">
                          <img className="img-fluid" src={`${baseUrl}${featuredProvinceNews[2].featured_image}`} />
                          <span className="news-time">{dateFormat(featuredProvinceNews[2].updated_at, "H")} hours ago</span>
                        </div>
                        <Link href={`/news/${featuredProvinceNews[2].id}`}>
                          <a className="news-title">
                            {featuredProvinceNews[2].news_translations[0][0].title}
                          </a>
                        </Link>
                        <p className="news-meta">
                          <ion-icon name="calendar-outline"></ion-icon> 
                          <span>{getPublishedDate(featuredProvinceNews[2].created_at.substring(0, 10))}</span> | 
                          <span>{featuredProvinceNews[2].category.slug}</span>
                        </p>
                      </article>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    {featuredProvinceNews[3] && (
                      <article className="news-item">
                        <div className="news-img-area">
                          <img className="img-fluid" src={`${baseUrl}${featuredProvinceNews[3].featured_image}`} />
                          <span className="news-time">{dateFormat(featuredProvinceNews[3].updated_at, "H")} hours ago</span>
                        </div>
                        <Link href={`/news/${featuredProvinceNews[3].id}`}>
                          <a className="news-title">
                            {featuredProvinceNews[3].news_translations[0][0].title}
                          </a>
                        </Link>
                        <p className="news-meta">
                          <ion-icon name="calendar-outline"></ion-icon> 
                          <span>{getPublishedDate(featuredProvinceNews[3].created_at.substring(0, 10))}</span> | 
                          <span>{featuredProvinceNews[3].category.slug}</span>
                        </p>
                      </article>
                    )}
                  </div>
                  <div className="col-sm-6">
                    {featuredProvinceNews[4] && (
                      <article className="news-item">
                        <div className="news-img-area">
                          <img className="img-fluid" src={`${baseUrl}${featuredProvinceNews[4].featured_image}`} />
                          <span className="news-time">{dateFormat(featuredProvinceNews[4].updated_at, "H")} hours ago</span>
                        </div>
                        <Link href={`/news/${featuredProvinceNews[4].id}`}>
                          <a className="news-title">
                            {featuredProvinceNews[4].news_translations[0][0].title}
                          </a>
                        </Link>
                        <p className="news-meta">
                          <ion-icon name="calendar-outline"></ion-icon> 
                          <span>{getPublishedDate(featuredProvinceNews[4].created_at.substring(0, 10))}</span> | 
                          <span>{featuredProvinceNews[4].category.slug}</span>
                        </p>
                      </article>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          
        </div>
      </section>
    </React.Fragment>
  )
}
