import { useState } from "react";
import {
  DOCTOR_IMG,
  arabHealthImg,
} from "../../assets/images";

import { useNavigate } from "react-router-dom";
import {IV_RIGHT_SINGLE } from "../../assets/icons";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {
  IC_WELCOME_BG,
  IV_PRO_FIRST,
  IV_PRO_SECOND,
  IV_PRO_THREE,
  IV_PRO_FOUR
} from "../../assets/images";
import { map } from "zod";

interface Product {
  id: number;
  name: string;
  brand: string;
  model: string;
  features: string[]; // Assuming features is an array of strings
  image: string;
  description: string;
  color:string;
}

// Example product data (you can replace this with your actual data)
const products: Product[] = [
  {
    id: 1,
    name: "Baxter PrisMax CRRT Machine",
    brand: "Baxter",
    model: "PrisMax",
    color: "#D1585F",
    description:
      "The PrisMax System is designed to give healthcare professionals more confidence in the delivery of continuous renal replacement therapy (CRRT) and therapeutic plasma exchange (TPE) therapies.",
    features: [
      "Fluid Scale Range: 0 to 11 Kg",
      "Accuracy: 0–5200 g: ±7.0 g",
      "Syringe Size: 20 to 50 ml",
      "Continuous delivery rate range: 0.5 to 5 ml/h",
      "Ultrasonic air detector: Detects single air bubble >20 µl",
      "Height: 140 to 170 cm",
      "Width: Approx. 51 cm",
    ],
    image:
      "https://renalcare.baxter.com/sites/g/files/ebysai1226/files/styles/social_media_share/public/2020-04/prismax-570x700px.jpg",
  },
  {
    id: 2,
    name: "Fresenius Multifiltrate CRRT Dialysis Machine",
    brand: "Fresenius Medical",
    model: "Multifiltrate",
    color: "#3869EA",
    description:
      "The Fresenius multifiltrate CRRT dialysis machine is designed to be easy and comfortable to use for everyone. It provides a full range of renal replacement therapies to patients.",
    features: [
      "Power: Electric",
      "Accuracy: 99%",
      "Frequency: 50 – 60Hz",
      "Arterial Pressure: -280 to +300 mm Hg",
      "Venous Pressure: -80 to +500 mm Hg",
      "Display: 10.4” TFT-LCD",
      "Weight: Approx. 100Kg",
    ],
    image:
      "https://www.freseniusmedicalcare.asia/files/img/products/acute/fresenius-multifiltrate-dialysis.jpg",
  },
  {
    id: 3,
    name: "B Braun Diapact CRRT Machine",
    brand: "B Braun",
    model: "Diapact",
    color: "#EF8568",
    description:
      "The Diapact System is designed to offer freedom in all therapies at any time with high fluid exchange accuracy and safety features for total fluid management.",
    features: [
      "Integrated Fluid Heater: 20 to 39°C",
      "Heparin Pump (perfusion)",
      "Load cell capacity: Up to 25 l",
      "Height: Approx. 140 cm",
      "Weight: Approx. 80Kg",
    ],
    image:
      "https://www.bbraun.com/content/dam/catalog/bbraun/bbraunProductCatalog/S/AEM2015/en-GB/iv-st5304-di-diadyalysisinfrastructurer-systemimages-1-jpg--denverdiadialysisinfrastructurer-2560x1440.jpg",
  },
  {
    id: 4,
    name: "Nipro Surdial 55 Plus Dialysis Machine",
    brand: "Nipro",
    model: "Surdial 55 Plus",
    color: "#CF4A39",
    description:
      "The Surdial 55 Plus Dialysis Machine provides innovative technology for easy handling and safety in dialysis treatments.",
    features: [
      "Turnable touch panel display",
      "Single needle system with one clamp",
      "Weight: 72Kg",
      "Power Supply: 230 V/AC 110 V ±10%",
      "Battery Backup: 0.5Hr",
    ],
    image:
      "https://www.nipro-group.com/sites/default/files/2021-01/surdial-55-plus.png",
  },
  {
    id: 5,
    name: "Fresenius 4008A Dialysis Machine",
    brand: "Fresenius Medical",
    model: "4008A",
    color: "#478536",
    description:
      "The Fresenius 4008A dialysis machine incorporates high therapy standards while minimizing costs, making dialysis more accessible to patients.",
    features: [
      "Power: 220V",
      "Weight: 90Kg",
      "Inlet Pressure: 4 BAR",
      "Water Inlet Temperature: 4 BAR",
      "Frequency: 50Hz",
    ],
    image:
      "https://www.freseniusmedicalcare.asia/files/img/products/chronic/dialysis/fresenius-4008a.jpg",
  },
  {
    id: 5,
    name: "Fresenius 4008A Dialysis Machine",
    brand: "Fresenius Medical",
    model: "4008A",
    color: "#6BB79A",
    description:
      "The Fresenius 4008A dialysis machine incorporates high therapy standards while minimizing costs, making dialysis more accessible to patients.",
    features: [
      "Power: 220V",
      "Weight: 90Kg",
      "Inlet Pressure: 4 BAR",
      "Water Inlet Temperature: 4 BAR",
      "Frequency: 50Hz",
    ],
    image:
      "https://www.freseniusmedicalcare.asia/files/img/products/chronic/dialysis/fresenius-4008a.jpg",
  },
];

// Placeholder Images for Medical Devices

// const placeholderLogo = "https://via.placeholder.com/150x50?text=Chavera+Logo"; // Placeholder for logo
// const welcomeBackground = IC_WELCOME_LOGO; // Placeholder for welcome background
const welcomeBackgroundImg = IC_WELCOME_BG;
const doctorImg = DOCTOR_IMG;
const arabHealthImg1 = arabHealthImg;

const LandingPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const images = [
    { src: IV_PRO_FIRST, alt: "Medical Device 1" },
    { src: IV_PRO_SECOND, alt: "Medical Device 2" },
    { src: IV_PRO_THREE, alt: "Medical Device 3" },
    { src: IV_PRO_FOUR, alt: "Medical Device 3" },
  ];

  const handleNextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
  };

  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate("/products/baxter");
  };

  return (
    <div className="landing-page bg-[#00BFD948] ">
      {/* Header Section */}

      {/* Hero Section */}

      <div
        style={{
          backgroundImage: `url(${welcomeBackgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className=" h-fit py-16 text-center text-white font-poppins_cf -z-50"
      >
       
        <div className="text-2xl font-poppins_w">Biopsy</div>
        <p className="mx-auto max-w-3xl text-sm">
          For identifying any tissue, we need to take samples of tissue and lab
          test it to identify the disease. We have a wide range of biopsy
          instruments that can take tissue samples from the kidney, liver,
          breast, and bone marrow.
        </p>

        {/* Image Carousel */}
        <div className="relative mx-auto mt-10 w-full max-w-5xl flex flex-col items-center">
        <Carousel showThumbs={false}  className=" w-1/2  "  showArrows={false} autoPlay={true} showStatus={false}>
         
           {images.map((item)=>
             <img 
             src={item.src}
             alt={item.alt}
             className=" h-72 w-1/2 rounded-lg"
           />
           )}
            
          
          </Carousel>
          
         
          
        </div>
       
      </div>

      

      <div
        className=" p-10  justify-between items-center "
       // style={{ backgroundImage: `url(${welcomeBackground})` }}
      >

        
        <div className="  text-center text-white">
          <div className="mb-4 text-xl font-medium text-theme-black font-poppins_w">
            Welcome to Chavera
          </div>
          <div className=" mb-6  font-poppins_cf  font-normal text-theme-grey text-base">
            Established in 2011, CHAVERA DEVICES PVT LTD is one of the leading
            medical device manufacturers in West of India, specialized in
            medical disposables for use in dialysis, ICU/anesthesia, oncology,
            and biopsy. We are specialized in short-term and long-term venous
            access products like central venous catheters, dialysis catheters,
            and CT implantable ports. We have more than 15 years of experience
            in this line, starting with trading and gradually moving toward
            manufacturing disposable products.
          </div>
          <a
            href="#"
            className="inline-block rounded-full bg-red-600 px-6 py-2 text-white hover:bg-red-700"
          >
            READ MORE
          </a>
        </div>
      
      </div>

      <section className="bg-gray-100 px-20 py-10">
        <div className="mx-auto mb-12 text-center">
          <h2 className="text-4xl font-medium text-theme-black font-poppins_w">Our Products</h2>
          <p className="text-theme-grey text-base font-poppins_cf">
            Explore our wide range of high-quality medical devices.
          </p>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <div style={{ backgroundColor: `${product.color}`}}
              key={index}
              className={`flex flex-col justify-between overflow-hidden rounded-lg  font-poppins_cf text-white `}
            >
              <div className="flex-grow p-4">
                <h3 className="te mb-2 font-poppins_cf text-xl  text-theme-white">
                  {product.name}
                </h3>
                <p className="mb-4 font-poppins_cf font-normal text-sm text-theme-white">
                  {product.description}
                </p>
              </div>
              <div className="flex p-6 pt-0">
                <a
                  onClick={handleViewDetails}
                  href="#"
                  className="flex items-center gap-1 font-medium text-theme-white"
                >
                  VIEW PRODUCT <IV_RIGHT_SINGLE />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="  gap-4 flex ">
        {/* Left Section - Our Events */}
        <div className="  flex " >
         
          <div className="rounded-md  mt-10 ml-11 ">
          <div className="text-base font-poppins_cf  text-theme-black">Our Events</div>
            <div className="text-sm  font-poppins_cf text-theme-grey">Arab Health</div>
            <img
              src={arabHealthImg1}
              alt="Arab Health Event"
              className="  h-24 "
            />
            <p className="mt-4 font-medium text-red-500">
              30 January - 2 February 2017
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Dubai International Convention & Exhibition Centre
            </p>
          </div>
         
         <img
            src={doctorImg}
            alt="Doctor"
            className=" relative -mt-48 -z-50"
          />
         
        </div>
       
         
          
      
        <div className="">
            <div className="text-xl font-semibold text-theme-black my-10 mb-5">
              Download Our Brochures
            </div>
            <ul className="space-y-1 flex gap-2 flex-col">
              {[
                "UROLOGY",
                "NEPHROLOGY",
                "ONCOLOGY",
                "ANESTHETIC & ICU",
                "BIOPSY - RADIOLOGY",
                "GASTROENTEROLOGY",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 text-purple-600 font-poppins_cf text-base"
                >
                  <span className="text-lg">➤</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        {/* Right Section - Download Brochures */}
       
      </div>

    </div>
  );
};

export default LandingPage;
