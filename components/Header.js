import Link from "next/link";
import axios from "axios";
import { BASE_URL, getTodaysDate } from "./Helpers";
import { useEffect, useState } from "react";

export default function Header(props) {
  const todaysDate = getTodaysDate("short", true);

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

  return (
    <header className="container header">
      <section className="logo-area">
        <Link href="/">
          <a><img className="img-fluid" src="/namuna-news-logo-english.png" /></a>
        </Link>
      </section>

      <section className="">
        <p className="header-top-meta pt-3 pb-1 mb-0">
          <span className="mr-4">{todaysDate}</span> | 
          <span className="ml-4">
            Languages: 
            <a className="px-2" href="#">EN</a> | 
            <a className="px-2" href="#">JP</a> | 
            <a className="px-2" href="#">NP</a>
          </span>
        </p>
        <div className="pradesh-menu py-2">
          <ul>
            <li><Link href="/"><a>All</a></Link></li>
            {provinceData && provinceData.map(province => (
              <li key={province.id}><Link href={`/province/${province.id}`}><a>{province.slug}</a></Link></li>
            ))}
          </ul>
        </div>
      </section>
    </header>
  );
}