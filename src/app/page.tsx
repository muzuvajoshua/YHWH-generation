import { getSession } from "@/lib/auth/session";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { Hero } from "@/components/marketing/hero";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { FeaturesBento } from "@/components/marketing/features-bento";
import { ProductPreview } from "@/components/marketing/product-preview";
import { Testimonials } from "@/components/marketing/testimonials";
import { Pricing } from "@/components/marketing/pricing";
import { CtaSection } from "@/components/marketing/cta";

export default async function LandingPage() {
  const session = await getSession();
  const authed = Boolean(session);

  return (
    <div className="relative min-h-[100dvh] overflow-x-clip bg-zinc-950 text-zinc-100">
      <MarketingNav authed={authed} />
      <main>
        <Hero authed={authed} />
        <LogoCloud />
        <FeaturesBento />
        <ProductPreview />
        <Testimonials />
        <Pricing />
        <CtaSection authed={authed} />
      </main>
      <MarketingFooter />
    </div>
  );
}
