import { getActiveSubscriberCount } from '@/lib/supabase-server'
import CustomCursor from '@/components/CustomCursor'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Story from '@/components/Story'
import Gallery from '@/components/Gallery'
import Preview from '@/components/Preview'
import DirectAccess from '@/components/DirectAccess'
import Offer from '@/components/Offer'
import Gifts from '@/components/Gifts'
import Countdown from '@/components/Countdown'
import SignupForm from '@/components/SignupForm'
import Footer from '@/components/Footer'
import RevealObserver from '@/components/RevealObserver'

export const revalidate = 60

export default async function Home() {
  const activeCount = await getActiveSubscriberCount()

  return (
    <>
      <CustomCursor />
      <Nav />
      <Hero />
      <div id="about" />
      <Story />
      <Gallery />
      <Preview />
      <DirectAccess />
      <Offer activeCount={activeCount} />
      <Gifts />
      <Countdown />
      <SignupForm />
      <Footer />
      <RevealObserver />
    </>
  )
}
