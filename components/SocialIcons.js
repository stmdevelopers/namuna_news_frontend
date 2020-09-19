import Link from "next/link";

export default function SocialIcons() {
  return (
    <section className="social-icons-section">
      <div>
        <a href="#"><ion-icon name="share-social-outline"></ion-icon></a>
      </div>
      <div className="social-icons">
        <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
        <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
        <a href="#"><ion-icon name="logo-linkedin"></ion-icon></a>
        <a href="#"><ion-icon name="logo-youtube"></ion-icon></a>
      </div>
    </section>
  );
}