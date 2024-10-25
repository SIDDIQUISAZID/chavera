import React from "react";
import { IC_WELCOME_BG } from "../../assets/images"; // Assuming the image path is correct

const Contact = () => {
  const welcomeBackgroundImg = IC_WELCOME_BG;

  return (
    <div className="flex h-fit w-full flex-col items-center overflow-hidden ">
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
          <div className="font-poppins_w text-2xl">Contact Us</div>
          <p className="mt-4 font-poppins_cf text-sm">
            You can Contact Us if you have any questions or comments by filling
            out the following form.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-10 flex w-full flex-col justify-between space-y-10 px-20 lg:flex-row lg:space-x-10 lg:space-y-0">
        {/* Contact Form */}
        <div className="lg:w-2/4">
          <h2 className="mb-6 text-2xl font-semibold">KEEP IN TOUCH WITH US</h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name (required)
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone (required)
              </label>
              <input
                type="text"
                id="phone"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                placeholder="Your Phone"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your Email (required)
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                placeholder="Subject"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Your Message
              </label>
              <textarea
                id="message"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                rows="5"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="rounded-md bg-theme-dark px-6 py-2 text-white hover:bg-pink-600"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="lg:w-1/2">
          <h2 className="mb-6 text-2xl font-semibold">CONTACT DETAILS</h2>
          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-lg font-bold mt-10">REGISTERED OFFICE</h3>
              Regd. Off.: C-34/X-2, Ground Floor, C Block Dilshad Garden,
              Delhi-110095 Sales Off.: D-2, Second Floor, Pocked B & E, Local
              Shopping Centre, Chetak Complex, Dilshad Garden, Delhi -110095
              E-mail : chavera24x7@gmail.com E-mail : chavera24x7@yahoo.co.in
              Tel.:+91-11-41630860, M.: 9810789138 Coustomer Care No.:
              9289649690
              <p>
                Email:{" "}
                <a
                  href="mailto:sales@meditechdevices.com"
                  className="text-pink-500"
                >
                  chavera24x7@gmail.com
                </a>
              </p>
              <p>
                Email (International):{" "}
                <a
                  href="mailto:chavera24x7@yahoo.co.in"
                  className="text-pink-500"
                >
                 chavera24x7@yahoo.co.in
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold">YOUTUBE CHANNEL LINK:</h3>
              <a
                href="https://www.youtube.com/@meditechdevicespvt.ltd.-in6243"
                className="text-pink-500"
              >
                https://www.youtube.com/@meditechdevicespvt.ltd.-in6243
              </a>
            </div>

            <div>
              <h3 className="text-lg font-bold">AHMEDABAD SALES OFFICE:</h3>
             <div>
             Regd. Off.: C-34/X-2, Ground Floor, C Block Dilshad Garden,
              Delhi-110095 Sales Off.: D-2, Second Floor, Pocked B & E, Local
              Shopping Centre, Chetak Complex, Dilshad Garden, Delhi -110095
             </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 w-full ">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Our Location
        </h2>
        <div className="h-96 w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.192883370132!2d72.48372977548186!3d22.987292678985986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e849905d52707%3A0xdda7ae5fdbafed9b!2sMeditech%20Devices%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1623498283315!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            title="Company Location Map"
            style={{ border: 0 }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
