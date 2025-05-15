import React from 'react'
import Hero from './_components/Hero'
import NewArrival from './_components/NewArrival'
import { Separator } from "@/components/ui/separator"
import Collection from './_components/Collection'
import BestSeller from './_components/BestSellers'
import Services from './_components/Services'
import Newsfeed from './_components/Newsfeed'


const page = () => {
  return (
    <div className=''>

        <Hero />
        <NewArrival />
        <Collection />
        <BestSeller />
        <Services />
        <Newsfeed />

    </div>
  )
}

export default page 