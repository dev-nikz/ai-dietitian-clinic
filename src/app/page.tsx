import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { AiAsk } from "@/components/ai-ask";
import { BmiCalculator } from "@/components/bmi-calculator";
import { BookingCta } from "@/components/booking-cta";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Services />
        <About />
        <AiAsk />
        <BmiCalculator />
        <BookingCta />
      </main>
      <SiteFooter />
    </>
  );
}
