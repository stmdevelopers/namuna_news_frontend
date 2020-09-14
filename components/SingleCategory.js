import Link from "next/link";
import { BASE_URL, bannerImages, getPublishedDate } from "./Helpers";
import NewsSection from "./NewsSection";

export default function SingleCategory(props) {
  const baseUrl = BASE_URL;

  let featuredCategoryNews = [];
  if (props.featuredCategoryNews) {
    // Grab the first 5 news to show for the Popular News section
    featuredCategoryNews = props.featuredCategoryNews.slice(0, 5);
  }

  return (
    <React.Fragment>
      <section className="single-category">
        <div className="banner-section">
          <img className="img-fluid banner-image" src={bannerImages[props.title.toLowerCase()] == "" ? bannerImages["default"] : bannerImages[props.title.toLowerCase()]} />
          <div className="banner-image-overlay"></div>
          <h1 className="banner-text">{props.title} News</h1>
        </div>
        <div className="container">

          <section className="popular-news-section">
            <h3 className="featured-section-heading">Popular News</h3>
            <div className="row">
              <div className="col-lg-12 col-xl-6">
                {featuredCategoryNews[0] && (
                  <article className="news-item featured-news-item">
                    <div className="news-img-area">
                      <img className="img-fluid" src={`${baseUrl}${featuredCategoryNews[0].featured_image}`} />
                      <span className="news-time">24 hours ago</span>
                    </div>
                    <Link href={`/news/${featuredCategoryNews[0].id}`}>
                      <a className="news-title">
                        {featuredCategoryNews[0].news_translations[0][0].title}
                      </a>
                    </Link>
                    <p className="news-meta">
                      <ion-icon name="calendar-outline"></ion-icon> 
                      <span>{getPublishedDate(featuredCategoryNews[0].created_at.substring(0, 10))}</span> | 
                      <span>{featuredCategoryNews[0].category.slug}</span>
                    </p>
                  </article>
                )}
              </div>
              <div className="col-lg-12 col-xl-6">
                <div className="row">
                  <div className="col-sm-6">
                  {featuredCategoryNews[1] && (
                    <article className="news-item">
                      <div className="news-img-area">
                        <img className="img-fluid" src={`${baseUrl}${featuredCategoryNews[1].featured_image}`} />
                        <span className="news-time">24 hours ago</span>
                      </div>
                      <Link href={`/news/${featuredCategoryNews[1].id}`}>
                        <a className="news-title">
                          {featuredCategoryNews[1].news_translations[0][0].title}
                        </a>
                      </Link>
                      <p className="news-meta">
                        <ion-icon name="calendar-outline"></ion-icon> 
                        <span>{getPublishedDate(featuredCategoryNews[1].created_at.substring(0, 10))}</span> | 
                        <span>{featuredCategoryNews[1].category.slug}</span>
                      </p>
                    </article>
                  )}
                  </div>
                  <div className="col-sm-6">
                    {featuredCategoryNews[2] && (
                      <article className="news-item">
                        <div className="news-img-area">
                          <img className="img-fluid" src={`${baseUrl}${featuredCategoryNews[2].featured_image}`} />
                          <span className="news-time">24 hours ago</span>
                        </div>
                        <Link href={`/news/${featuredCategoryNews[2].id}`}>
                          <a className="news-title">
                            {featuredCategoryNews[2].news_translations[0][0].title}
                          </a>
                        </Link>
                        <p className="news-meta">
                          <ion-icon name="calendar-outline"></ion-icon> 
                          <span>{getPublishedDate(featuredCategoryNews[2].created_at.substring(0, 10))}</span> | 
                          <span>{featuredCategoryNews[2].category.slug}</span>
                        </p>
                      </article>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    {featuredCategoryNews[3] && (
                      <article className="news-item">
                        <div className="news-img-area">
                          <img className="img-fluid" src={`${baseUrl}${featuredCategoryNews[3].featured_image}`} />
                          <span className="news-time">24 hours ago</span>
                        </div>
                        <Link href={`/news/${featuredCategoryNews[3].id}`}>
                          <a className="news-title">
                            {featuredCategoryNews[3].news_translations[0][0].title}
                          </a>
                        </Link>
                        <p className="news-meta">
                          <ion-icon name="calendar-outline"></ion-icon> 
                          <span>{getPublishedDate(featuredCategoryNews[3].created_at.substring(0, 10))}</span> | 
                          <span>{featuredCategoryNews[3].category.slug}</span>
                        </p>
                      </article>
                    )}
                  </div>
                  <div className="col-sm-6">
                    {featuredCategoryNews[4] && (
                      <article className="news-item">
                        <div className="news-img-area">
                          <img className="img-fluid" src={`${baseUrl}${featuredCategoryNews[4].featured_image}`} />
                          <span className="news-time">24 hours ago</span>
                        </div>
                        <Link href={`/news/${featuredCategoryNews[4].id}`}>
                          <a className="news-title">
                            {featuredCategoryNews[4].news_translations[0][0].title}
                          </a>
                        </Link>
                        <p className="news-meta">
                          <ion-icon name="calendar-outline"></ion-icon> 
                          <span>{getPublishedDate(featuredCategoryNews[4].created_at.substring(0, 10))}</span> | 
                          <span>{featuredCategoryNews[4].category.slug}</span>
                        </p>
                      </article>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {props.subCategoriesData && props.subCategoriesData.map(subCategory => (
            <NewsSection key={subCategory.id} title={subCategory.slug} news={subCategory.news} />
          ))}
          
        </div>
      </section>
    </React.Fragment>
  )
}
