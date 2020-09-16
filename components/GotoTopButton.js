import { useEffect } from "react";

export default function GotoTopButton() {
  // When the user scrolls down 50px from the top of the document, show the goto top button
  window.onscroll = function() {
    let gotoTopBtn = document.getElementById("btn-goto-top");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      gotoTopBtn.classList.add("open");
    } else {
      gotoTopBtn.classList.remove("open");
    }
  };
  // When the user clicks on the goto top button, scroll to the top of the document
  function gotoTop() {
    // window.scroll({ top: 0, left: 0, behavior: "smooth"});
    // window.document.body.scrollTop = "0";
    // window.document.body.scrollTop = 0;
    // window.document.documentElement.scrollTop = 0;
    window.scroll(0, 0);
  }

  return (
    <React.Fragment>
      <button id="btn-goto-top" className="btn" onClick={gotoTop()}><ion-icon name="arrow-up-outline"></ion-icon></button>
    </React.Fragment>
  )
}