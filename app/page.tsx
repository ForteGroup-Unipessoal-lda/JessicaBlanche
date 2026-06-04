import { getActiveSubscriberCount } from '@/lib/supabase-server'
import CustomCursor from '@/components/CustomCursor'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'
import Story from '@/components/Story'
import DirectAccess from '@/components/DirectAccess'
import LifetimeBenefits from '@/components/LifetimeBenefits'
import Offer from '@/components/Offer'
import SignupForm from '@/components/SignupForm'
import Footer from '@/components/Footer'
import StickyBar from '@/components/StickyBar'
import RevealObserver from '@/components/RevealObserver'

export const revalidate = 60

export default async function Home() {
  const activeCount = await getActiveSubscriberCount()

  return (
    <>
      <CustomCursor />
      <Nav />
      <Hero activeCount={activeCount} />
      <Gallery />
      <div className="social-proof-strip">
        <div className="sp-item"><span className="sp-n">1K</span><span className="sp-l">Spots Total</span></div>
        <div className="sp-sep" />
        <div className="sp-item"><span className="sp-n">{activeCount}</span><span className="sp-l">Claimed</span></div>
        <div className="sp-sep" />
        <div className="sp-item"><span className="sp-n">$9.99</span><span className="sp-l">Locked Forever</span></div>
      </div>
      <Story />
      <DirectAccess />
      <LifetimeBenefits />
      <Offer activeCount={activeCount} />
      <SignupForm activeCount={activeCount} />
      <Footer />
      <StickyBar activeCount={activeCount} />
      <RevealObserver />
    </>
  )
}
