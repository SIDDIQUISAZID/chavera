import { UserRes } from "../../features/profile/profileAPI"
import ImageFallback from "../ErrorBoundary/ImageFallback"
import OverflowTooltip from "../OverflowTooltip"
import { AppLogo } from '../../assets/icons';

const ProfileNameTile = ({ user }: { user: UserRes }) => {
    return <>
        <ImageFallback
            src={user?.selfie || ""}
            className={"w-9 rounded-full h-9 object-cover"}
            // src={}
            fallbackIcon={<AppLogo/>}
        />
        <div className='ml-2 item-center w-28 flex'>
            <OverflowTooltip
                className='text-blue-dark capitalize text-sm truncate my-auto block'
                // text={[user?.physicianname, user?.lastname].join(" ")}
                text={user?.physicianname}
            // title={[data?.user?.physicianname, data?.user?.lastname].join(" ")}
            />
            {/* <div className='text-gray-dark text-xs truncate' title={data?.user?.specialist}>{data?.user?.specialist}</div> */}
        </div>
    </>
}
//add loading skeleton to profile component UI
export const ProfileLoadingTile = () => {
    return <>
        {/* <img src={EllacorFavicon} alt="Ellacor icon" className='w-9 h-9 bg-gray-light/30 rounded-full text-gray-600 animate-pulse' /> */}
        <div className='ml-2 item-center animate-pulse w-28 flex'>
            <div className='text-blue-dark text-sm bg-blue-medium animate-pulse rounded h-4 m-auto block w-full'></div>
            {/* <div className='text-gray-dark text-xs bg-gray-200 rounded h-3 my-1'></div> */}
        </div>
    </>
}
export default ProfileNameTile