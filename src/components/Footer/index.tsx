import { IV_NEW_LOGO } from "../../assets/icons";
import { IC_CHAVER_LOGO } from "../../assets/images";

type Props = {
    direction?: string,
}
const Footer = ({ direction }: Props) => {
    console.log(direction)
    return (
        <div  >
            <footer
                className='hidden xl:block  z-10 fixed bottom-0  w-full bg-white'
            >


                <div className=" flex  justify-between mx-auto py-4 px-4">
                    {" "}
                    <div className=" text flex items-center text-left  font-poppins_cf text-xs font-normal ">
                        <img  src={IC_CHAVER_LOGO} className="h-6" />
                        <div className="items-center text-theme-grey text-xs poppins_cf"> © 2024. All rights reserved</div>
                    </div>
                    <div className="text flex gap-2 space-x-2 font-poppins_cf text-xs font-normal">
                        <div className="cursor-pointer hover:underline font-poppins_cf text-theme-grey text-xs">About</div> 
                        <div className=" text-theme-grey">|</div>
                        <div className="cursor-pointer hover:underline font-poppins_cf text-theme-grey text-xs">
                            Terms & Conditions
                        </div>{" "}
                        <div className=" text-theme-grey">|</div>
                        
                        <div className="cursor-pointer hover:underline font-poppins_cf text-theme-grey text-xs">
                            Privacy Policy
                        </div>
                        <div className=" text-theme-grey">|</div>
                        
                        <div className="cursor-pointer hover:underline font-poppins_cf text-theme-grey text-xs">
                            User Agreement
                        </div>
                    </div>
                </div>

            </footer>
        </div>
    )
}

export default Footer