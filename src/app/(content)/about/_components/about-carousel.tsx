"use client"
import React, { useState } from 'react'
import { HiLightningBolt } from "react-icons/hi";

import {
  Carousel,
  CarouselContent,
  type CarouselApi,
  CarouselItem,
} from '@/components/ui/carousel'
import '../_styles/carousel.css'
import {colors, textColors, animationName, texts} from '../_constants/const'

const EmblaCarousel = () => {
  const slides = [0, 1, 2, 3, 4, 5]
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(1)
  const [animationIndex, setAnimationIndex] = useState(0)

  const onPrev = (index: number) => {
    if (index === 1) return
    api?.scrollPrev()
    setSelectedIndex(selectedIndex - 1)
    setAnimationIndex(1)
  }

  const onNext = (index: number) => {
    if (index === 4) return
    api?.scrollNext()
    setSelectedIndex(selectedIndex + 1)
    setAnimationIndex(0)
  }

  return (
    <div>
      <Carousel className='w-full h-60' setApi={setApi} opts={{startIndex: 1, slidesToScroll: 1}}>
        <CarouselContent className='w-full h-48 ml-0'>
          {slides.map((index) => (
            <CarouselItem className={`${colors[index]} basis-[85%] pl-0`}>
              {/* Content */}
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="w-full h-6 px-[7.5%] flex mt-2 justify-between">
          <div className='flex items-center'>
            {
              slides.slice(1,5).map((index) => (
                index === selectedIndex ?
                (
                <div className={`rounded-full w-5 h-5 flex items-center justify-center ${animationName[animationIndex]} lightning-left}`}>
                  <HiLightningBolt className={`${textColors[index-1]} h-6 w-6`}/>
                </div>)
                :
                (
                <div className={`px-1 mx-1 rounded-full w-3 h-3 ${colors[index]}`}></div>
                )
              ))
            }
          </div> 
          <div className="flex items-center">
            <button
              className="embla__button embla__button--next hover:bg-slate-600 rounded-full w-8 h-8 text-white"
              type="button"
              onClick={() => onPrev(selectedIndex)}
            >
              &lt;
            </button>
            <button
              className="embla__button embla__button--next hover:bg-slate-600 rounded-full w-8 h-8 text-white"
              type="button"
              onClick={() => onNext(selectedIndex)}
            >
              &gt;
            </button>  
          </div>
          
        </div>
      </Carousel>

      <div className='px-[7.5%] test'>
        {texts.map((text, index) => (<div className="test text-xs font-light text-white" hidden={selectedIndex-1 !== index}>{text}</div>))}
      </div>     
    </div>
  )
}
export default EmblaCarousel
