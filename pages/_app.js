import "../scss/main.scss";
import Head from "next/head";
import dynamic from "next/dynamic";
import { BASE_URL } from "@/components/Helpers";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialIcons from "@/components/SocialIcons";

// Dynamically import the TopProgressBar component
const TopProgressBar = dynamic(
  () => {
    return import("@/components/TopProgressBar");
  },
  { ssr: false },
);

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:wght@600;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
        <script type="module" src="https://unpkg.com/ionicons@5.1.2/dist/ionicons/ionicons.esm.js"></script>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossOrigin="anonymous"></script>
      </Head>
      
      <TopProgressBar />
      <Header provinceData={pageProps.provinceData} />
      <Navbar categoriesData={pageProps.categoriesData} />
      <Component {...pageProps} />
      <Footer provinceData={pageProps.provinceData} categoriesData={pageProps.categoriesData} />
      <SocialIcons />
    </React.Fragment>
  )
}

MyApp.getInitialProps = async (appContext) => {
  let pageProps = {};

  const apiUrl = BASE_URL + "/api";

  // Fetch provinces data and categories data using an API call
  const [provincesData, categoriesData] = await Promise.all([
                            fetch(`${apiUrl}/province/all`).then(res => res.json()),
                            fetch(`${apiUrl}/categories/all`).then(res => res.json())
                          ]);

  let provinces = [];
  // Grab only the provinces that are enabled
  provinces = provincesData ? provincesData.data.filter(province => province.display_status == 1) : [];
  // Reverse the province list to order them
  provinces = provinces.reverse();
  // Add provinces to our pageProps
  pageProps.provinceData = provinces;
  
  // Add categories data to our pageProps
  let categories = [];
  categories = categoriesData ? categoriesData.data.filter(category => category.display_status == 1) : [];
  pageProps.categoriesData = categories;

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  };

  return {
    pageProps
  };
};

export default MyApp;
