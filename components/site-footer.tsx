import Link from "next/link";
import Image from "next/image";
import { Icon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-about">
            <Link href="/" className="brand footer-brand" aria-label="Titan Alarm & Electronics home">
              <Image src="/titan-logo-white.png" alt="Titan Alarm & Electronics" width={100} height={100} className="brand-logo" /></Link>
            <p>Thoughtful security. Expertly installed.<br />Here when you need us.</p>
            <a className="footer-phone" href="tel:+18186812466"><Icon name="phone" size={16} /> 818-681-2466</a>
            <a className="footer-phone" href="mailto:info@alarmtitan.com"><Icon name="mail" size={16} /> Info@alarmtitan.com</a>
          </div>
          <div className="footer-links"><h3>Explore</h3><Link href="/services">Our services</Link><Link href="/products">Equipment</Link><Link href="/projects">Recent projects</Link><Link href="/about">About Titan</Link></div>
          <div className="footer-links"><h3>Get in touch</h3><Link href="/quote">Request a quote <Icon name="arrowUp" size={13} /></Link><Link href="/contact">Contact our team</Link><Link href="/faq">Frequently asked questions</Link><Link href="/privacy">Privacy policy</Link></div>
          <div className="footer-hours"><h3>We’re here for you</h3><p>Mon–Fri, 8am–6pm</p><p>Emergency support available<br />24 hours a day, 7 days a week.</p><Link href="/contact" className="footer-contact">Talk to a real person <Icon name="arrow" size={16} /></Link></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Titan Alarm & Electronics. All rights reserved.</span><span>Security that feels like peace of mind.</span></div>
      </div>
    </footer>
  );
}
