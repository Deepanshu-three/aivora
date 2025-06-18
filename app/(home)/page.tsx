import React from 'react'
import Hero from './_components/Hero'
import NewArrival from './_components/NewArrival'
import Collection from './_components/Collection'
import BestSeller from './_components/BestSellers'
import Services from './_components/Services'
import Newsfeed from './_components/Newsfeed'
import CuttingEdge from './_components/CuttingEdge'
import PrintingProcess from './_components/PrintingProcess'
import { AchievementShowcase } from './_components/Achievements'


const page = () => {
  return (
    <div className=''>

        <Hero />
        <NewArrival />
        <Collection />
        <PrintingProcess />
        <BestSeller />
        <CuttingEdge />
        <Services />
        <AchievementShowcase />
        <Newsfeed />

    </div>
  )
}

export default page 