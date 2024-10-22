import React, { useState } from "react";
import Footer from "../Footer";
import {
  IC_WELCOME_LOGO,
  IC_CHAVER_LOGO,
  DOCTOR_IMG,
  arabHealthImg,
} from "../../assets/images";
import { IC_WELCOME_BG } from "../../assets/images";
import { IV_RIGHT_ARROW } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
interface Product {
  id: number;
  name: string;
  brand: string;
  model: string;
  features: string[]; // Assuming features is an array of strings
  image: string;
  description: string;
}

// Example product data (you can replace this with your actual data)
const products: Product[] = [
  {
    id: 1,
    name: "Baxter PrisMax CRRT Machine",
    brand: "Baxter",
    model: "PrisMax",
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
const placeholderImage1 =
  "https://via.placeholder.com/600x400?text=Medical+Device+1";
const placeholderImage2 =
  "https://via.placeholder.com/600x400?text=Medical+Device+2";
const placeholderImage3 =
  "https://via.placeholder.com/600x400?text=Medical+Device+3";
const placeholderLogo = "https://via.placeholder.com/150x50?text=Meditech+Logo"; // Placeholder for logo
const welcomeBackground = IC_WELCOME_LOGO; // Placeholder for welcome background
const welcomeBackgroundImg = IC_WELCOME_BG;
const doctorImg = DOCTOR_IMG;
const arabHealthImg1 = arabHealthImg;

const LandingPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const images = [
    { src: placeholderImage1, alt: "Medical Device 1" },
    { src: placeholderImage2, alt: "Medical Device 2" },
    { src: placeholderImage3, alt: "Medical Device 3" },
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
    navigate("/");
  };

  return (
    <div className="landing-page">
      {/* Header Section */}

      {/* Hero Section */}

      <section
        style={{ backgroundImage: `url(${welcomeBackgroundImg})` }}
        className="relative h-fit bg-blue-900 py-16 text-center text-white"
      >
        <h1 className="mb-2 text-4xl font-bold">Biopsy</h1>
        <p className="mx-auto max-w-3xl text-lg">
          For identifying any tissue, we need to take samples of tissue and lab
          test it to identify the disease. We have a wide range of biopsy
          instruments that can take tissue samples from the kidney, liver,
          breast, and bone marrow.
        </p>

        {/* Image Carousel */}
        <div className="relative mx-auto mt-10 w-full max-w-5xl">
          <div className="carousel-container relative">
            {/* <img
              src={images[activeSlide].src}
              alt={images[activeSlide].alt}
              className="w-full rounded-lg"
            /> */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 transform bg-gray-700 bg-opacity-50 p-3 text-white"
              onClick={handlePrevSlide}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 transform bg-gray-700 bg-opacity-50 p-3 text-white"
              onClick={handleNextSlide}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          {/* Carousel Indicators */}
          <div className="mt-4 flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full ${
                  activeSlide === index ? "bg-red-600" : "bg-gray-400"
                }`}
                onClick={() => setActiveSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative bg-cover bg-center py-20"
        style={{ backgroundImage: `url(${welcomeBackground})` }}
      >
        <div className="container mx-auto text-center text-white">
          <h2 className="mb-4 font-poppins_cf text-3xl font-medium">
            Welcome to Meditech
          </h2>
          <p className="mx-auto mb-6 max-w-xl font-poppins_cf text-base font-normal">
            Established in 2011, MEDITECH DEVICES PVT LTD is one of the leading
            medical device manufacturers in West of India, specialized in
            medical disposables for use in dialysis, ICU/anesthesia, oncology,
            and biopsy. We are specialized in short-term and long-term venous
            access products like central venous catheters, dialysis catheters,
            and CT implantable ports. We have more than 15 years of experience
            in this line, starting with trading and gradually moving toward
            manufacturing disposable products.
          </p>
          <a
            href="#"
            className="inline-block rounded-full bg-red-600 px-6 py-2 text-white hover:bg-red-700"
          >
            READ MORE
          </a>
        </div>
      </section>

      <section className="bg-gray-100 px-20 py-20">
        <div className="mx-auto mb-12 text-center">
          <h2 className="text-4xl font-bold">Our Products</h2>
          <p className="text-gray-600">
            Explore our wide range of high-quality medical devices.
          </p>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex flex-col justify-between overflow-hidden rounded-lg bg-[#14BFD9] font-poppins_cf text-white shadow-md"
            >
              <div className="flex-grow p-6">
                <h3 className="te mb-2 font-poppins_cf text-lg font-medium text-theme-black">
                  {product.name}
                </h3>
                <p className="mb-4 font-poppins_cf text-sm font-normal">
                  {product.description}
                </p>
              </div>
              <div className="flex p-6 pt-0">
                <a
                  onClick={handleViewDetails}
                  href="#"
                  className="flex items-center gap-1 font-medium text-red-600 hover:text-red-800"
                >
                  View Products <IV_RIGHT_ARROW />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className=" grid grid-cols-1 gap-12 md:grid-cols-2 ">
        {/* Left Section - Our Events */}
        <div className="space-y-8 px-4 py-4">
          <h2 className="text-2xl font-semibold text-gray-700">Our Events</h2>
          <div className="rounded-md p-6 ">
            <h3 className="text-lg font-bold text-purple-800">Arab Health</h3>
            <img
              src={arabHealthImg1}
              alt="Arab Health Event"
              className="mt-4  h-32 w-full object-contain"
            />
            <p className="mt-4 font-medium text-red-500">
              30 January - 2 February 2017
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Dubai International Convention & Exhibition Centre
            </p>
          </div>
        </div>

        {/* Right Section - Download Brochures */}
        <div className="relative py-4 px-4">
          <img
            src={doctorImg}
            alt="Doctor"
            className="absolute right-0 top-0 hidden h-full md:block"
          />
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-700">
              Download Our Brochures
            </h2>
            <ul className="space-y-4">
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
                  className="flex items-center space-x-2 text-purple-600"
                >
                  <span className="text-lg">➤</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className=" mx-auto  w-full ">
        {" "}
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
