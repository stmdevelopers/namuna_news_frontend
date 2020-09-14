import Link from "next/link";
import { useState } from "react";
import { BASE_URL } from "./Helpers";

export default function Navbar(props) {
  const loginUrl = BASE_URL + "/login";

  const mainCategoriesList = ["sports", "education", "worklife", "travel", "future", "culture"];
  // Get the categories list from the props
  let categoriesList = props.categoriesData ? props.categoriesData : [];
  // Sort the categories list according to their id
  if (categoriesList) {
    categoriesList.sort((cat1, cat2) => cat1.id - cat2.id);
  }
  // Intialize Main categories and More categories array
  let mainCategories = [];
  let moreCategories = [];
  // Populate the Main categories and More categories
  for (let i=0; i<categoriesList.length; i++) {
    // If the current category is in mainCategoriesList, append it to mainCategories else append it to moreCategories
    if (mainCategoriesList.includes(categoriesList[i].slug.toLowerCase())) {
      mainCategories.push(categoriesList[i]);
    } else {
      moreCategories.push(categoriesList[i]);
    }
  }

  // Use state for toggling responsive navigation and more button
  const [responsiveNavState, setResponsiveNavState] = useState("hide");
  const [moreBtnState, setMoreBtnState] = useState("down");

  return (
    <section className="main-nav">
      <div className="container">
        <nav className="nav-items">
          <div className="d-flex justify-content-between">
            <ul>
              <li><Link href={loginUrl}><a className="btn-login"><ion-icon name="person-circle-sharp"></ion-icon> Sign In</a></Link></li>
              <li><Link href="/"><a>Home</a></Link></li>
              {mainCategories.map(category => <li key={category.id}><Link href={`/category/${category.id}`}><a>{category.slug}</a></Link></li>)}
              <li><Link href="#"><a className="btn-more" data-toggle="collapse" href="#moreItems" role="button" aria-expanded="false" aria-controls="moreItems" onClick={() => moreBtnState == "down" ? setMoreBtnState("up") : setMoreBtnState("down")}>More <ion-icon name={`caret-${moreBtnState}-sharp`}></ion-icon></a></Link></li>
            </ul>
            <div className="search-box input-group">
              <input type="text" name="search" className="form-control-sm" placeholder="Search" aria-label="search" aria-describedby="btn-search" />
              <div className="input-group-append">
                <Link href="#"><a id="btn-search" className="btn-search"><ion-icon name="search-sharp"></ion-icon></a></Link>
              </div>
            </div>
          </div>

          <div className="collapse" id="moreItems">
            <div className="d-flex justify-content-start align-items-center">
              <h4 className="more-text">More</h4>
              <ul className="">
                {moreCategories.map(category => <li key={category.id}><Link href={`/category/${category.id}`}><a>{category.slug}</a></Link></li>)}
              </ul>
            </div>
          </div>
        </nav>

        <nav className="nav-items-responsive">
          <ul id="responsive-menu" className={responsiveNavState}>
            <div className="logo-area">
              <img className="img-fluid" src="/namuna-news-logo-english-white.png" />
            </div>

            <div className="search-box-responsive input-group">
              <input type="text" name="search" className="form-control-sm" placeholder="Search" aria-label="search" aria-describedby="btn-search" />
              <div className="input-group-append">
                <Link href="#"><a id="btn-search" className="btn-search"><ion-icon name="search-sharp"></ion-icon></a></Link>
              </div>
            </div>
            
            <li onClick={() => setResponsiveNavState("hide")}><Link href="/"><a>Home</a></Link></li>
            {mainCategories.map(category => <li key={category.id} onClick={() => setResponsiveNavState("hide")}><Link href={`/category/${category.id}`}><a>{category.slug}</a></Link></li>)}
            
            <li><Link href="#"><a className="btn-more" data-toggle="collapse" href="#moreItems" role="button" aria-expanded="false" aria-controls="moreItems" onClick={() => moreBtnState == "down" ? setMoreBtnState("up") : setMoreBtnState("down")}>More <ion-icon name={`caret-${moreBtnState}-sharp`}></ion-icon></a></Link></li>
            <div className="collapse moreItemsResponsive" id="moreItems">
              <div className="">
                {moreCategories.map(category => <li key={category.id} onClick={() => setResponsiveNavState("hide")}><Link href={`/category/${category.id}`}><a>{category.slug}</a></Link></li>)}
              </div>
            </div>
          </ul>

          <div className="responsive-menu-toggle">
            <Link href={loginUrl}><a className="btn-login"><ion-icon name="person-circle-sharp"></ion-icon> Sign In</a></Link>
            <button id="btn-responsive-menu" className="btn btn-primary" onClick={() => responsiveNavState == "hide" ? setResponsiveNavState("show") : setResponsiveNavState("hide")}><ion-icon name={`${responsiveNavState == "hide" ? "menu" : "close"}-sharp`}></ion-icon></button>
          </div>

          <div className="search-box input-group">
            <input type="text" name="search" className="form-control-sm" placeholder="Search" aria-label="search" aria-describedby="btn-search" />
            <div className="input-group-append">
              <Link href="#"><a id="btn-search" className="btn-search"><ion-icon name="search-sharp"></ion-icon></a></Link>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}