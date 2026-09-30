import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ImpactSection } from "@/components/home/ImpactSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { AudienceStats } from "@/components/home/AudienceStats";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ImpactSection />
      <ProjectsSection />
      <AudienceStats />
      <PartnersSection />
    </>
  );
}
