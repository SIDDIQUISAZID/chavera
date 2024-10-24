import React from "react";
import {
  IC_WELCOME_BG,
  about_Img,
  ABOUT_IMG3,
  ABOUT_IMG2,
  ABOUT_IMG1,
} from "../../assets/images"; // Ensure these images are imported correctly

const AboutPage = () => {
  const welcomeBackgroundImg = IC_WELCOME_BG;

  return (
    <div
      className="w-full items-center bg-[#14bfd916]"
      
    >
      {/* Header Section */}
      <div className="flex h-64 w-full items-center justify-center text-center " >
        <div className="rounded-md">
          <div className="text-xl font-poppins_cf  font-semibold">About</div>
          <p className="mt-4 font-poppins_cf text-lg font-medium">
            “Focusing on Quality, Respect for Life”
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
 

      {/* Main Content Section */}
      <div className="space-y-15 mt-4 flex flex-col-reverse items-center justify-center md:flex-row md:space-x-6">
        {/* Text Content */}
        <div className="flex flex-1 flex-col justify-center p-6 text-gray-600">
          <p className="font-poppins_cf text-base text-theme-black">
            Established in 2011, MEDITECH DEVICES PVT LTD is one of the leading
            medical device manufacturers in West India, specializing in medical
            disposables for use in dialysis, ICU / anesthesia, oncology, and
            biopsy. We specialize in short-term and long-term venous access
            products like central venous catheters, dialysis catheters, and CT
            implantable Ports. We have more than 15 years of experience in this
            line starting with trading and gradually increasing over goal to
            manufacturing disposable products. We have a unique combination of
            Modern Engineering Technology and Clinical Applications, Integrated
            with R & D. The manufacturing site has about 20,000 Sq Ft of
            production area which comprises sterilization equipment’s an
            inspection Lab for sterility testing. We have 3500 Sq Ft of Class
            10000 and 6000 Sq Ft of Class 100000 Clean Room area (workshop). The
            production workshop is fully equipped with the latest machinery. The
            quality assurance system is certified and corresponds with
            ISO-13485, CDSCO, and CE certificates. MEDITECH DEVICES PVT LTD is
            one of the largest manufacturers of Dialysis catheters and Central
            Venous catheters in terms of production capacity in India. We have 6
            branch offices located in different parts of India. The company
            upholds “Focusing on Quality, Respect for Life”, dedicating itself
            to becoming one of the leading suppliers of medical devices in the
            Whole World.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex flex-1 items-center justify-center">
          <img
            src={about_Img}
            alt="About Us"
            className="h-auto max-w-full rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="mt-10 mb-10 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3  ">
        <img
          src={ABOUT_IMG1}
          alt="Image 1"
          className="h-auto w-full rounded-lg shadow-lg"
        />
        <img
          src={ABOUT_IMG2}
          alt="Image 2"
          className="h-auto w-full rounded-lg shadow-lg"
        />
        <img
          src={ABOUT_IMG3}
          alt="Image 3"
          className="h-auto w-full rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default AboutPage;
