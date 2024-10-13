import { IV_NEW_LOGO } from "../../assets/icons";

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


                <div className=" flex  justify-around mx-auto py-4">
                    {" "}
                    <div className=" text flex items-center text-left  font-poppins_cf text-xs font-normal ml-40">
                        <IV_NEW_LOGO className="h-6" />
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