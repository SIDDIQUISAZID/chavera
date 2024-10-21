import { IV_NEW_LOGO } from "../../assets/icons";
import { IC_CHAVER_LOGO } from "../../assets/images";

type Props = {
    direction?: string,
}

const Footer = ({ direction }: Props) => {
    console.log(direction);
    return (
        <div>
            <footer className='hidden xl:block z-10 bottom-0 w-full px-20 bg-black text-white'>
                <div className="mx-auto py-8 px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {/* About Us Section */}
                        <div>
                            <img src={IC_CHAVER_LOGO} className="h-12 mb-4" alt="Logo" />
                            <p className="text-sm">
                                Medi-Tech Devices is an Indian-based company providing the world with innovative medical devices in the field of Urology, Gastroenterology, Interventional Radiology, and Cardiology.
                            </p>
                        </div>
                        
                        {/* Company Links */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4">COMPANY</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:underline">Home</a></li>
                                <li><a href="#" className="hover:underline">About</a></li>
                                <li><a href="#" className="hover:underline">Career</a></li>
                                <li><a href="#" className="hover:underline">Enquiry</a></li>
                                <li><a href="#" className="hover:underline">Contact Us</a></li>
                            </ul>
                        </div>

                        {/* Products Links */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4">PRODUCTS</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:underline">Anesthetic & ICU</a></li>
                                <li><a href="#" className="hover:underline">Biopsy – Radiology</a></li>
                                <li><a href="#" className="hover:underline">Gastroenterology</a></li>
                                <li><a href="#" className="hover:underline">Nephrology</a></li>
                                <li><a href="#" className="hover:underline">Oncology</a></li>
                                <li><a href="#" className="hover:underline">Urology</a></li>
                            </ul>
                        </div>

                        {/* Contact Us Section */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4">CONTACT US</h3>
                            <p className="text-sm">
                                MEDI TECH DEVICES PVT LTD, <br />
                                24, Gujarat Pharma Techno Park, <br />
                                Opp Zydus Sez, Matoda, <br />
                                Changodar, Ahmedabad – 382213
                            </p>
                            <p className="text-sm mt-2">Phone: 7698009820</p>
                            <p className="text-sm">Domestic Email: <a href="mailto:sales@meditechdevices.com" className="hover:underline">sales@meditechdevices.com</a></p>
                            <p className="text-sm">International Email: <a href="mailto:export.meditechdevices@gmail.com" className="hover:underline">export.meditechdevices@gmail.com</a></p>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="border-t border-gray-600 mt-8 pt-4 flex justify-between items-center text-xs">
                        <p>© 2024 meditechdevices.com. All rights reserved</p>
                        <div>
                            Crafted by <a href="https://www.3i.com" target="_blank" className="hover:underline">3i</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
