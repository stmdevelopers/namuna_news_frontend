import Link from "next/link";
import { getTodaysDate } from "./Helpers";

export default function Header(props) {
  const todaysDate = getTodaysDate("short", true);

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
            {props.provinceData && props.provinceData.map(province => (
              <li key={province.id}><Link href={`/province/${province.id}`}><a>{province.slug}</a></Link></li>
            ))}
          </ul>
        </div>
      </section>
    </header>
  );
}