import React from 'react'
import Slider, { Settings } from 'react-slick';
import { Banner1, Banner2 } from '../../../assets/images';
import "./index.scss"
const BannerModal = () => {
    return (<div className='p-2 max-w-2xl h-full overflow-hidden'>
        <h2 className='text-blue-dark font-argent text-4xl font-medium'>Welcome Bini jets,</h2>
        <p className='text-gray-dark text-sm mt-2 mb-6'>We are proud to you with us. <br /> We all have faith that you'll deliver result & make us all proud.</p>
        <div className='flex w-full h-full pb-4'>
            <BannerSlider />
        </div>
    </div>
    )
}

export const BannerSlider = () => {
    const settings: Settings = {
        dots: true,
        // dotsClass: ""
        // customPaging:()=>{
        //     return <div className='bg-red-700'></div>
        // },
        // dotsClass: "slick-dots slick-thumb ",
    };
    return <div className='block w-full overflow-hidden'>
        <Slider {...settings}>
            <div>
                <img src={Banner1} />
            </div>
            <div>
                <img src={Banner2} />
            </div>
        </Slider>
    </div>
}

export default BannerModal