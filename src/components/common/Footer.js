import React from "react";
import { IV_NEW_LOGO } from "../../assets/icons";

export default function Footer() {
  return (
    <footer className="mt-10">
      <div className="   border-gray-300 bg-gray-100  py-4">
        <div className="mx-14 flex items-center justify-between">
          {" "}
          <div className=" text flex items-center text-left font-poppins_cf text-xs font-normal">
            <IV_NEW_LOGO className="h-6" />
            <div className="items-center"> © 2024. All rights reserved</div>
          </div>
          <div className="text space-x-2 font-poppins_cf text-xs font-normal">
            <span className="cursor-pointer hover:underline">About</span> {"|"}{" "}
            <span className="cursor-pointer hover:underline">
              Terms & Conditions
            </span>{" "}
            {"|"}{" "}
            <span className="cursor-pointer hover:underline">
              Privacy Policy
            </span>{" "}
            {"|"}{" "}
            <span className="cursor-pointer hover:underline">
              User Agreement
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
