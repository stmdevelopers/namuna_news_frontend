import Link from "next/link";

export default function SocialIcons() {
  return (
    <section className="social-icons-section">
      <div className="social-icons">
        <Link href="#"><a><ion-icon name="share-social-outline"></ion-icon></a></Link>
        <Link href="#"><a><ion-icon name="logo-facebook"></ion-icon></a></Link>
        <Link href="#"><a><ion-icon name="logo-twitter"></ion-icon></a></Link>
        <Link href="#"><a><ion-icon name="logo-linkedin"></ion-icon></a></Link>
      </div>
    </section>
  );
}