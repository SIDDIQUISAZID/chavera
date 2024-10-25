import { IV_NEW_LOGO } from "../../assets/icons";
import { IC_CHAVER_LOGO, LOGO } from "../../assets/images";

type Props = {
  direction?: string;
};

const Footer = ({ direction }: Props) => {
  console.log(direction);
  return (
    <div>
      <footer className="bottom-0 z-10 hidden w-full bg-black px-20 text-white xl:block">
        <div className="mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {/* About Us Section */}
            <div>
              <img src={LOGO} className="mb-4 h-12" alt="Logo" />
              <p className="text-sm">
                Regd. Off.: C-34/X-2, Ground Floor, C Block Dilshad Garden,
                Delhi-110095 Sales Off.: D-2, Second Floor, Pocked B & E, Local
                Shopping Centre, Chetak Complex, Dilshad Garden, Delhi -110095
              </p>
            </div>

            {/* Company Links */}
            <div className="mt-1 flex flex-wrap items-center font-poppins_cf text-sm text-theme-black ">
              <ul className="flex items-center gap-4">
                <li className="mb-2 cursor-pointer">About</li>
                <li className="mb-2 cursor-pointer">Enquiry</li>
                <li className="mb-2 cursor-pointer">Careers</li>
                <li className="mb-2 cursor-pointer">Contact Us</li>
              </ul>
            </div>

            {/* Products Links */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">PRODUCTS</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Anesthetic & ICU
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Biopsy – Radiology
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Gastroenterology
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Nephrology
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Oncology
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Urology
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Us Section */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">CONTACT US</h3>
              <p className="text-sm">
                Regd. Off.: C-34/X-2, Ground Floor, C Block Dilshad Garden,
                Delhi-110095 Sales Off.: D-2, Second Floor, Pocked B & E, Local
                Shopping Centre, Chetak Complex, Dilshad Garden, Delhi -110095
              </p>
              <p className="mt-2 text-sm">Phone: 9810789138</p>
              <p className="text-sm">
                 Email:{" "}
                <a
                  href="mailto: chavera24x7@gmail.com"
                  className="hover:underline"
                >
                   chavera24x7@gmail.com
                </a>
              </p>
              <p className="text-sm">
                 Email:{" "}
                <a
                  href="mailto:chavera24x7@yahoo.co.in"
                  className="hover:underline"
                >
                 chavera24x7@yahoo.co.in
                </a>
              </p>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-600 pt-4 text-xs">
            <p>© 2024 meditechdevices.com. All rights reserved</p>
            <div>
              Crafted by{" "}
              <a
                href="https://www.3i.com"
                target="_blank"
                className="hover:underline"
              >
                3i
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
