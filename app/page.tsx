import { Hero } from "@/components/manual/hero";
import { TrustedBy } from "@/components/manual/trusted-by";
import { WhyNexaflow } from "@/components/manual/why-nexaflow";
import { Platform } from "@/components/manual/platform";
import { CustomerStory } from "@/components/manual/customer-story";
import { CtaBanner } from "@/components/manual/cta-banner";
import { Footer } from "@/components/manual/footer";

export default function Home() {
  return (
    <main className="flex-1 overflow-x-hidden">
      <Hero />
      <TrustedBy />
      <WhyNexaflow />
      <Platform />
      <CustomerStory />
      <CtaBanner />
      <Footer />
    </main>
  );
}
