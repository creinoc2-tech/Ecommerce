
import { Hero } from '../components/home/heor'
import { FeatureGrid } from '../components/Feature/feature-grid'
import { Collections } from '../components/home/collection-container'
import { CtaBanner } from '../components/home/cta-banner'
   
export const Home  = () => {
  return (
    <div className='min-h-screen'>
       <Hero />
       <FeatureGrid />
       <Collections />
       <CtaBanner />
     </div>
  )
}


