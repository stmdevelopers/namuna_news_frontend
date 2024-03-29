import "../scss/main.scss";
import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import { BASE_URL } from "@/components/Helpers";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialIcons from "@/components/SocialIcons";
import { useEffect, useState } from "react";

// Dynamically import the TopProgressBar component
const TopProgressBar = dynamic(
  () => {
    return import("@/components/TopProgressBar");
  },
  { ssr: false },
);

// Dynamically import the GotoTopButton component
const GotoTopButton = dynamic(
  () => {
    return import("@/components/GotoTopButton");
  },
  { ssr: false },
);

function MyApp({ Component, pageProps }) {
  // State declarations
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    const apiUrl = BASE_URL + "/api";

    // Fetch provinces data using an API call
    axios.get(`${apiUrl}/categories/all`)
    .then(res => res.data)
    .then(catData => {
      catData = catData.data;
      // Add only the active categories to our categories array
      let categories = catData.filter(category => category.display_status == 1);
      // Set categories data
      setCategoriesData(categories);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:wght@600;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
        <script type="module" src="https://unpkg.com/ionicons@5.1.2/dist/ionicons/ionicons.esm.js"></script>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossOrigin="anonymous"></script>
      </Head>
      
      <TopProgressBar />
      <Header />
      <Navbar categoriesData={categoriesData} />
      <Component {...pageProps} />
      <Footer categoriesData={categoriesData} />
      <SocialIcons />
      <GotoTopButton />
    </React.Fragment>
  )
}

export default MyApp;
