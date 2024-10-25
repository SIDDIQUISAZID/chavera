import React from "react";
import { IC_WELCOME_BG, IC_ENQUIRY_IMG,LOGO_BANNER } from "../../assets/images";
import { useNavigate, Link } from "react-router-dom";

const CareerPage = () => {
  const navigate = useNavigate();
  const welcomeBackgroundImg = IC_WELCOME_BG;
  const enquiryImg = IC_ENQUIRY_IMG;
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex h-fit flex-col items-center">
      {/* Top Section with Background Image */}
      <div
        className="flex h-64 w-full items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${welcomeBackgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="rounded-md">
         
          <div className="text-2xl font-poppins_w">Career</div>

          <p className="mt-4 text-sm font-poppins_cf">
            We are looking for dedicated, enthusiastic, and motivated personnel
            interested in working in the Healthcare sector.
          </p>
        </div>
      </div>

      

      {/* Main Content Section */}
      <div className="mt-8 flex w-full flex-col items-center justify-between  px-4 lg:flex-row">
        {/* Left side content */}
        <div className="text-left lg:w-3/5">
         
          <p className="mt-4 text-gray-600">
            Chavera Devices is a well-established and revolutionary medical
            devices company committed to providing high-quality healthcare
            products.
          </p>
          <p className="mt-2 text-gray-600">
            We could provide a great platform to work and gain experience in the
            field of Medical and Surgical Devices. Contact us and take your
            career to new heights.
          </p>
          <p className="mt-4 font-semibold text-gray-800">
            We are looking for dynamic people all over India looking for work in
            various fields.
          </p>
          <p className="mt-6 text-lg font-bold text-gray-800">
            CLICK ON THE LINK BELOW TO APPLY
          </p>
        </div>

        {/* Right side Image */}
        <div className="mt-6 flex justify-center lg:mt-0 lg:w-2/5">
          <img
            src={LOGO_BANNER}
            alt="Enquiry"
            className="h-auto w-full rounded-lg object-contain "
          />
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="mt-10 flex w-full justify-center bg-gradient-to-r from-pink-500 to-red-500 py-8">
        <h3 className="text-xl font-bold text-white">
          COME JOIN US AND BE THE PART OF HEALTHCARE REVOLUTION IN INDIA
        </h3>
      </div>
    </div>
  );
};

export default CareerPage;
