import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL, getTodaysDate } from "./Helpers";

export default function Footer(props) {
  // State declarations
  const [provinceData, setProvinceData] = useState(null);
  
  useEffect(() => {
    const apiUrl = BASE_URL + "/api";

    // Fetch provinces data using an API call
    axios.get(`${apiUrl}/province/all`)
    .then(res => res.data)
    .then(provincesData => {
      provincesData = provincesData.data;
      // Grab only the provinces that are enabled
      let provinces = provincesData.filter(province => province.display_status == 1);
      // Reverse the province list to order them
      provinces = provinces.reverse();
      // Set provinces data
      setProvinceData(provinces);
    })
    .catch(err => console.log(err));
  }, []);

  const footerCategoriesList = ["health", "sports", "worklife", "education", "travel", "culture", "future", "international", "entertainment"]
  // Get the categories list from the props
  let categoriesList = props.categoriesData ? props.categoriesData : [];
  if (categoriesList != []) {
    // Sort the categories list according to their id
    categoriesList.sort((cat1, cat2) => cat1.id - cat2.id);
  }
  // Intialize footer categories array
  let footerCategories = []
  // Populate the Footer categories
  for (let i=0; i<categoriesList.length; i++) {
    // If the current category is in footerCategoriesList, append it to footerCategories
    if (footerCategoriesList.includes(categoriesList[i].slug.toLowerCase())) {
      footerCategories.push(categoriesList[i]);
    }
  }

  function subscribeEmail(email) {

  }

  return (
    <footer className="footer">
      <section className="subscribe-section">
        <h2 className="subscribe-title">Subscribe</h2>
        <p className="subscribe-text">Get Namuna News free every morning and evening.</p>
        <form method="POST" action="#" className="subscribe-form">
          <div className="input-group">
            <span className="email-icon"><ion-icon name="mail-outline"></ion-icon></span>
            <input type="text" name="subscribe" className="form-control" placeholder="Enter your email address..." aria-label="subscribe" aria-describedby="btn-subscribe" />
            <div className="input-group-append">
              <input type="submit" value="Subscribe" id="btn-subscribe" className="btn btn-danger btn-subscribe" />
            </div>
          </div>
        </form>
      </section>

      <section className="container">
        <div className="divider"></div>
      </section>

      <section className="footer-menu">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-12 col-lg-4 column1">
              <img className="img-fluid" src="/namuna-news-logo-english-white.png" />
              <p className="text-justify mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac dolor lectus. Aenean ipsum ante, mollis quis tristique sed, dignissim id leo. Duis vitae aliquet velit. Duis vitae aliquet velit.
              </p>
              <div className="footer-social-icons">
                <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
                <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
                <a href="#"><ion-icon name="logo-linkedin"></ion-icon></a>
                <a href="#"><ion-icon name="logo-youtube"></ion-icon></a>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 column2">
              <h4 className="menu-title">Quick Links:</h4>
              {provinceData && (
                <ul className="menu-items">
                  {provinceData.slice(0, 2) != [] && (
                    <li><Link href={`/province/${provinceData[0].id}`}><a>{provinceData[0].slug}</a></Link> | <Link href={`/province/${provinceData[1].id}`}><a>{provinceData[1].slug}</a></Link></li>
                  )}
                  {provinceData.slice(2, 4) != [] && (
                    <li><Link href={`/province/${provinceData[2].id}`}><a>{provinceData[2].slug}</a></Link> | <Link href={`/province/${provinceData[3].id}`}><a>{provinceData[3].slug}</a></Link></li>
                  )}
                  {provinceData.slice(4, 6) != [] && (
                    <li><Link href={`/province/${provinceData[4].id}`}><a>{provinceData[4].slug}</a></Link> | <Link href={`/province/${provinceData[5].id}`}><a>{provinceData[5].slug}</a></Link></li>
                  )}
                  {provinceData.slice(6, 7) != [] && (
                    <li><Link href={`/province/${provinceData[6].id}`}><a>{provinceData[6].slug}</a></Link></li>
                  )}
                </ul> 
              )} 
            </div>
            <div className="col-sm-6 col-lg-3 column3">
              <h4 className="menu-title">Contact Us:</h4>
              <ul className="menu-items">
                <li><a href="tel:"><ion-icon name="call-sharp"></ion-icon> 9823235685, 9841564258</a></li>
                <li><a href="mailto:namunanews@gmail.com"><ion-icon name="mail-sharp"></ion-icon> namunanews@gmail.com</a></li>
                <li><a href="/#"><ion-icon name="location-sharp"></ion-icon> Namuna, Nuwakot</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="footer-bottom">
        <div className="footer-bottom-content">
          <ul className="footer-bottom-menu">
            <li><Link href="/"><a>Home</a></Link></li><span className="divider"></span>
            {footerCategories.slice(0, footerCategories.length - 1) != [] && footerCategories.slice(0, footerCategories.length - 1).map(category => (
              <li key={category.id}>
                <Link href={`/category/${category.id}`}><a>{category.slug}</a></Link><span className="divider"></span>
              </li>
            ))}
            {footerCategories[footerCategories.length - 1] && (
              <li><Link href={`/category/${footerCategories[footerCategories.length - 1].id}`}><a>{footerCategories[footerCategories.length - 1].slug}</a></Link></li>
            )}
          </ul>
        </div>
        <p className="copyright-text">
          &copy; Copyright Namuna News {getTodaysDate().substring(0, 4)}. All rights reserved. Website designed by <a href="#">Softtech Multimedia</a>.
        </p>
        <p>
          <a href="#">Terms of Use</a> &nbsp; | &nbsp; <a href="#">Privacy Policy</a>
        </p>
      </section>
    </footer>
  );
}