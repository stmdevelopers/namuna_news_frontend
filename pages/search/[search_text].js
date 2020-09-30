import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/components/Helpers";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";

export default function Search(props) {

  const [searchText, setSearchText] = useState(props.searchText);
  const [searchResult, setSearchResult] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);

  // Search input change handler
  function searchInputChangeHandler(e) {
    setSearchText(e.target.value);
  }

  // Function to fetch the search data from the server
  function fetchSearchData(e) {
    e.preventDefault();
    const apiUrl = BASE_URL + "/api";

    // Set the loading state to true
    setLoadingStatus(true);
    // Set the search result to its initial value
    setSearchResult(null);

    // Fetch search result through the API
    axios.post(apiUrl + `/search?search=${searchText}`)
    .then(res => res.data)
    .then(res => {
      setSearchResult(res.data);
      setLoadingStatus(false);
    })
    .catch(err => {
      console.log(err.message);
      console.log("Something went wrong! Please try again.");
    })
  }

  // Initialise the first search request by clicking on the Search Button
  useEffect(() => {
    document.getElementById("btn-search-news").click();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Search News - Namuna News</title>
        <meta title="description" content="" />
      </Head>
      <div className="container">
        <h1 className="text-center mt-5">Search News</h1>
        <div className="row news-content-section justify-content-center">
          <form className="input-group" onSubmit={fetchSearchData} style={{ maxWidth: "30rem" }}>
            <input type="text" value={searchText} required onChange={searchInputChangeHandler} className="form-control" id="search-text" placeholder="Search News Here" />
            <div className="input-group-append">
              <button id="btn-search-news" type="submit" className="btn btn-primary">Search</button>
            </div>
          </form>
        </div>
        <div className="row news-content-section">
          <section className="search-news-section">
            <SectionHeading value="Search Results" />
            <div className="row">
              {loadingStatus && (
                <div className="col text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              {!loadingStatus && searchResult && searchResult.length < 1 && (
                <div className="col text-center">
                  <h5>No results found!</h5>
                </div>
              )}
              {searchResult && searchResult.map(newsItem => {
                return (
                <div className="col-sm-6 col-lg-4" key={newsItem.news_id}>
                  <article className="news-item">
                    <div className="news-img-area">
                      <img className="img-fluid" style={{ minHeight: "15rem", maxHeight: "18rem" }} src={`${BASE_URL}/${newsItem.news_image.replace("public", "storage")}`} />
                    </div>
                    <Link href={`/news/${newsItem.news_id}`}>
                      <a className="news-title">
                        {newsItem.title}
                      </a>
                    </Link>
                    <div className="text-center text-sm-left">
                      <Link href={`/news/${newsItem.news_id}`}>
                        <a className="btn btn-primary mt-2 mb-3">Read More</a>
                      </Link>
                    </div>
                  </article>
                </div>
              )})}
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      searchText: context.params.search_text
    }
  }
}