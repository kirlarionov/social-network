import React, { useState, useEffect, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import { Circle } from '@mui/icons-material'
import { Box } from '@mui/material'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material'


const sliderData = [
   'https://i.guim.co.uk/img/media/613b3c7fd50c6965f1d096fd1dcb2d8a6af67107/644_0_4919_2953/master/4919.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=5d7a58f3aab057366a89e78d762979fc',
   'https://www.joneslanglasalle.com.cn/images/global/treant-and-insights/london-retains-global-city-crown-copy.jpg.rendition/cq5dam.web.1280.1280.jpeg',
   'https://www.austrianblog.com/media/images/paris-city-of-love.original.jpg',
   'https://www.parkgrandlondon.com/blog/wp-content/uploads/2016/09/Panorama-of-Parliament-Square-London.jpg',
   'https://www.onlondon.co.uk/wp-content/uploads/2020/05/OxfordCircus.jpeg',
   'https://stroyobzor.ua/assets/files/%d1%84%d0%be%d1%82%d0%be%20WWW/%d0%9d%d0%9e%d0%92%d0%90%d0%af/%d0%b1%d0%b5%d1%80%d0%bb%d0%b8%d0%bd.jpg',
   'https://www.tripzaza.com/ru/destinations/wp-content/uploads/2017/09/Berlin-e1505798693967.jpg',
]

const SliderBox = styled(Box)`
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   margin: 20px 0;
`
const MainSlideContainer = styled(Box)`
   position: relative;
   width: 500px;
   height: 300px;
   overflow: hidden;
   border-radius: 20px;
`
const MainSlide = styled(Box)`
   position: absolute;
   width: 100%;
   height: 100%;
`
const ArrowBox = styled(Box)`
   position: absolute;
   top: 0;
   z-index: 10;
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100%;
   width: 35px;
   cursor: pointer;
   &:hover {
      background: #0000004d;
   }
   &:active {
      background: #fffbfb4d;
   }
`
const NearestSlides = styled(Box)`
   width: 230px;
   height: 150px;
   overflow: hidden;
   border-radius: 20px;
   margin: 0 30px;
   opacity: .7;
`
const SlideCircle = styled(Circle)`
   display: inline-block;
   margin: 7px;
   color: #bebaba;
   border: 1px solid #bebaba;
   border-radius: 50%;
   cursor: pointer;
   -webkit-transition: .5s;
   & :hover {
      color: #807878;
   }
`

const Slider = () => {
   const [currentSlide, setCurrentSlide] = useState(1)
   const [leftSlide, setLeftSlide] = useState(0)
   const [rightSlide, setRightSlide] = useState(2)
   const length = sliderData.length


   //? Нужно эти функции оборачивать в useCallback?

   const changeSlide = useCallback((e) => {
      e.preventDefault()
      const action = e.currentTarget.dataset.action
      if (action === 'next') {
         setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1)
         setLeftSlide(leftSlide === length - 1 ? 0 : leftSlide + 1)
         setRightSlide(rightSlide === length - 1 ? 0 : rightSlide + 1)
      } else {
         setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1)
         setLeftSlide(leftSlide === 0 ? length - 1 : leftSlide - 1)
         setRightSlide(rightSlide === 0 ? length - 1 : rightSlide - 1)
      }
   }, [currentSlide, leftSlide, length, rightSlide])


   const onClickSlideCircle = useCallback(e => {
      e.preventDefault()
      const index = +e.currentTarget.dataset.index
      setCurrentSlide(index)
      setLeftSlide(index === 0 ? length - 1 : index - 1)
      setRightSlide(index === length - 1 ? 0 : index + 1)
   }, [length])


   useEffect(() => {
      const intervalId =
         setInterval(() => {
            setCurrentSlide(current => {
               const res = current === length - 1 ? 0 : current + 1
               return res
            })
            setLeftSlide(left => {
               const res = left === length - 1 ? 0 : left + 1
               return res
            })
            setRightSlide(right => {
               const res = right === length - 1 ? 0 : right + 1
               return res
            })
         }, 3000)
      return () => clearInterval(intervalId)
   }, [length])


   return (
      <SliderBox>

         <NearestSlides>
            <Box
               component='img'
               src={sliderData[leftSlide]}
               alt='slide'
               sx={{ width: '100%', height: '100%', cursor: 'pointer' }}
               onClick={changeSlide}
               data-action='prev'
            />
         </NearestSlides>

         <Box>
            <MainSlideContainer>
               <ArrowBox left={0} onClick={changeSlide} data-action='prev'>
                  <ArrowBackIosOutlined sx={{ color: 'white' }} />
               </ArrowBox>
               <ArrowBox right={0} onClick={changeSlide} data-action='next'>
                  <ArrowForwardIosOutlined sx={{ color: 'white' }} />
               </ArrowBox>

               {sliderData.map((slide, index) => {
                  return (
                     <MainSlide key={index + 'mainSlide'} sx={currentSlide === index && { zIndex: 5 }}>
                        <Box component='img' src={slide} alt='slide' sx={{ width: '100%', height: '100%' }} />
                     </MainSlide>
                  )
               })}
            </MainSlideContainer>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
               {sliderData.map((slide, index) => {
                  return (
                     <SlideCircle
                        key={index + 'slideCircle'}
                        data-index={index}
                        onClick={onClickSlideCircle}
                        sx={currentSlide === index && { color: '#615959' }}
                     />
                  )
               })}
            </Box>

         </Box>

         <NearestSlides>
            <Box
               component='img'
               src={sliderData[rightSlide]}
               alt='slide'
               sx={{ width: '100%', height: '100%', cursor: 'pointer' }}
               onClick={changeSlide}
               data-action='next'
            />
         </NearestSlides>

      </SliderBox>
   )
}

export default Slider
