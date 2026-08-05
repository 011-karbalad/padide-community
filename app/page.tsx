import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/home/hero'
import {
  CategoriesSection,
  FeaturedProductsSection,
  InstallmentBanner,
  RepairServiceBanner,
  AdvantagesSection,
  ReviewsSection,
  FAQSection,
  StatsSection,
  BrandsSection,
  BestSellersSection,
} from '@/components/home/sections'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AdvantagesSection />
        <CategoriesSection />
        <FeaturedProductsSection />
        <InstallmentBanner />
        <BestSellersSection />
        <RepairServiceBanner />
        <StatsSection />
        <BrandsSection />
        <ReviewsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
