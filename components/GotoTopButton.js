export default function GotoTopButton() {
  // When the user scrolls down 50px from the top of the document, show the goto top button
  window.onscroll = function() {
    const gotoTopBtn = document.getElementById("btn-goto-top");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      gotoTopBtn.style.display = "block";
    } else {
      gotoTopBtn.style.display = "none";
    }
  };
  // When the user clicks on the goto top button, scroll to the top of the document
  function gotoTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <React.Fragment>
      <button id="btn-goto-top" className="btn" onClick={gotoTop()}><ion-icon name="arrow-up-outline"></ion-icon></button>
    </React.Fragment>
  )
}