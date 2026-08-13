import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { Examples } from '@/components/landing/examples'
import { Sources } from '@/components/landing/sources'
import { Flow } from '@/components/landing/flow'
import { Footer } from '@/components/landing/footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        {/* <Features /> */}
        {/* <Examples /> */}
        {/* <Sources /> */}
        {/* <Flow /> */}
      </main>
      <Footer />
    </div>
  )
}
