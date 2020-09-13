import Link from "next/link";
import dateFormat from "dateformat";
import SectionHeading from "./SectionHeading";
import { BASE_URL, getPublishedDate, getTodaysDate } from "./Helpers";

export default function FeaturedNewsSection(props) {
  const baseUrl = BASE_URL;

  // Grab the first 4 news to show for Nepal News section
  const nepalNews = props.nepalNews.filter(newsItem => newsItem.news_label != "featured").slice(0, 4);
  const featuredNepalNews = props.nepalNews.filter(newsItem => newsItem.news_label == "featured").slice(0, 3);
  const nepal_category_id = nepalNews[0] ? nepalNews[0].category.id : 0;

  return (
    <React.Fragment>
      <div className="container">

        <div className="row news-content-section">
          <div className="col-lg-6">
            <div className="row">
              <section className="breaking-news">
                <h3 className="featured-section-heading">Breaking News</h3>
                <div className="breaking-news-list">
                  {props.breakingNews[0] && (
                    <article className="news-item featured-news-item">
                      <div className="news-img-area">
                        <img className="img-fluid" src={`${baseUrl}${props.breakingNews[0].featured_image}`} />
                        <span className="news-time">{dateFormat(props.breakingNews[0].updated_at, "H")} hours ago</span>
                      </div>
                      <Link href={`/news/${props.breakingNews[0].id}`}>
                        <a className="news-title">
                          {props.breakingNews[0].news_translations[0][0].title}
                        </a>
                      </Link>
                      <p className="news-meta">
                        <ion-icon name="calendar-outline"></ion-icon> 
                        <span>{getPublishedDate(props.breakingNews[0].created_at.substring(0, 10))}</span> | 
                        <span>{props.breakingNews[0].category.slug}</span>
                      </p>
                    </article>
                  )}
                  
                  <div className="row">
                    <div className="col-sm-6 col-lg-12 col-xl-6">
                    {props.breakingNews[1] && (
                      <article className="news-item">
                        <div className="news-img-area">
                          <img className="img-fluid" src={`${baseUrl}${props.breakingNews[1].featured_image}`} />
                          <span className="news-time">{dateFormat(props.breakingNews[1].updated_at, "H")} hours ago</span>
                        </div>
                        <Link href={`/news/${props.breakingNews[1].id}`}>
                          <a className="news-title">
                            {props.breakingNews[1].news_translations[0][0].title}
                          </a>
                        </Link>
                        <p className="news-meta">
                          <ion-icon name="calendar-outline"></ion-icon> 
                          <span>{getPublishedDate(props.breakingNews[1].created_at.substring(0, 10))}</span> | 
                          <span>{props.breakingNews[1].category.slug}</span>
                        </p>
                      </article>
                    )}
                    </div>
                    <div className="col-sm-6 col-lg-12 col-xl-6">
                    {props.breakingNews[2] && (
                      <article className="news-item">
                        <div className="news-img-area">
                          <img className="img-fluid" src={`${baseUrl}${props.breakingNews[2].featured_image}`} />
                          <span className="news-time">{dateFormat(props.breakingNews[2].updated_at, "H")} hours ago</span>
                        </div>
                        <Link href={`/news/${props.breakingNews[2].id}`}>
                          <a className="news-title">
                            {props.breakingNews[2].news_translations[0][0].title}
                          </a>
                        </Link>
                        <p className="news-meta">
                          <ion-icon name="calendar-outline"></ion-icon> 
                          <span>{getPublishedDate(props.breakingNews[2].created_at.substring(0, 10))}</span> | 
                          <span>{props.breakingNews[2].category.slug}</span>
                        </p>
                      </article>
                    )}
                    </div>
                  </div>
                </div>
                <div className="promote-news mt-2 mb-5">
                  <Link href="#">
                    <a className="btn-promote-news">
                      <span className="plus-icon"><ion-icon name="add"></ion-icon></span>
                      <span className="promote-text">
                        Promote your news with us
                      </span>
                      <span className="linebar"></span>
                    </a>
                  </Link>
                </div>
              </section>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row">
              <section className="todays-news">
                <h3 className="featured-section-heading">Today's News</h3>
                <div className="todays-news-list">
                  {props.todaysNews && props.todaysNews.map(newsItem => (
                    <article className="news-item" key={newsItem.id}>
                      <div className="d-flex">
                        <div className="news-img-area mr-3">
                          <img className="img-fluid" src={`${baseUrl}${newsItem.featured_image}`} />
                          <span className="news-time">{dateFormat(newsItem.updated_at, "H")} hours ago</span>
                        </div>
                        <div className="d-flex flex-column justify-content-between">
                          <Link href={`/news/${newsItem.id}`}>
                            <a className="news-title mt-0">
                              {newsItem.news_translations[0][0].title}
                            </a>
                          </Link>
                          <p className="news-meta">
                            <ion-icon name="calendar-outline"></ion-icon> 
                            <span>{getPublishedDate(newsItem.created_at.substring(0, 10))}</span> | 
                            <span>{newsItem.category.slug}</span>
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="row news-content-section">
          <section className="nepal-news-section">
            <SectionHeading value="Nepal" />
            <div className="row">
              <div className="col-sm-12 col-lg-6 order-1 order-lg-2 mb-5">
                <h3 className="slider-title">Visit Nepal 2020</h3>
                <div id="nepal-news-slider" className="carousel slide" data-ride="carousel">
                  <div className="carousel-inner">
                    {featuredNepalNews && featuredNepalNews.slice(0, 1).map(newsItem => (
                      <div className="carousel-item active" key={newsItem.id}>
                        <img className="img-fluid" src={`${baseUrl}${newsItem.featured_image}`} className="d-inline-block w-100" alt={newsItem.slug} />
                      </div>
                    ))}
                    {featuredNepalNews && featuredNepalNews.slice(1, 3).map(newsItem => (
                      <div className="carousel-item" key={newsItem.id}>
                        <img className="img-fluid" src={`${baseUrl}${newsItem.featured_image}`} className="d-inline-block w-100" alt={newsItem.slug} />
                      </div>
                    ))}
                  </div>
                  <a className="carousel-control-prev" href="#nepal-news-slider" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a className="carousel-control-next" href="#nepal-news-slider" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
                <p className="news-title">
                  Nepal, officially the Federal Democratic Republic of Nepal, is a country in South Asia. It is located mainly in the Himalayas, but also includes parts of the Indo-Gangetic Plain.
                </p>
                <div className="text-center">
                  <Link href={`/category/${nepal_category_id}`}><a className="readmore-btn btn rounded-0 mt-2">Read More</a></Link>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3 order-2 order-lg-1">
                {nepalNews && nepalNews.slice(0, 2).map(newsItem => (
                  <article className="news-item" key={newsItem.id}>
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
                ))}
              </div>
              <div className="col-sm-6 col-lg-3 order-3 order-lg-3">
                {nepalNews && nepalNews.slice(0, 2).map(newsItem => (
                  <article className="news-item" key={newsItem.id}>
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
                ))}
              </div>
            </div>
          </section>
        </div>

      </div>
    </React.Fragment>
  );
}