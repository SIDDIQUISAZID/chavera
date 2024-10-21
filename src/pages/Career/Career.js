import React from "react";
import { IC_WELCOME_BG } from "../../assets/images";

const EnquiryPage = () => {
  const welcomeBackgroundImg = IC_WELCOME_BG;
  return (
    <div className="flex min-h-screen w-full flex-col items-center overflow-auto">
      <div
        className="flex h-64 w-full items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${welcomeBackgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="rounded-md">
          <h1 className="text-4xl font-bold">Enquiry</h1>
          <p className="mt-4 text-lg font-medium">
            For any product-related query, please click on one of the links
            given below.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="w-full p-4 text-sm text-gray-500">
        <span>Home</span> &gt; <span className="text-pink-500">Enquiry</span>
      </div>

      {/* Main content */}
      <div className="mt-10 flex justify-center space-x-6">
        {/* Domestic Enquiry */}
        <div className="transform cursor-pointer rounded-lg bg-gradient-to-r from-pink-500 to-red-500 p-8 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
          <h3 className="text-lg font-bold">
            FOR PRODUCT-RELATED DOMESTIC ENQUIRY
          </h3>
          <p className="mt-4 text-lg font-semibold">CLICK HERE</p>
        </div>

        {/* International Enquiry */}
        <div className="transform cursor-pointer rounded-lg bg-gradient-to-r from-pink-500 to-red-500 p-8 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
          <h3 className="text-lg font-bold">FOR INTERNATIONAL ENQUIRY</h3>
          <p className="mt-4 text-lg font-semibold">CLICK HERE</p>
        </div>

        {/* Domestic Distributor */}
        <div className="transform cursor-pointer rounded-lg bg-gradient-to-r from-pink-500 to-red-500 p-8 text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
          <h3 className="text-lg font-bold">TO BE OUR DOMESTIC DISTRIBUTOR</h3>
          <p className="mt-4 text-lg font-semibold">CLICK HERE</p>
        </div>
      </div>
    </div>
  );
};

export default EnquiryPage;
