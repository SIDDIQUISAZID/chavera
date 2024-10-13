import React from 'react';
import { UserIcon,IV_GREEN_INDICATOR,IV_N_MOB } from '../../assets/icons';
import Card from "@mui/material/Card";




const NotificationsDetail = () => {

const notificationList=[
  {
    title:"Lorem Ipsum is simply dummy ",
    body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },{
    title:"Lorem Ipsum is simply dummy ",
    body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },{
    title:"Lorem Ipsum is simply dummy ",
    body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },{
    title:"Lorem Ipsum is simply dummy ",
    body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },{
    title:"Lorem Ipsum is simply dummy ",
    body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  }
]

  return (
    <div className='container  '>
      <div className="flex-col">
      
          <div className="font-poppins_cf text-[10px] text-theme-dark">
            {" "}
            Notifications
          </div>

          <div className="font-poppins_cf text-[22px] text-theme-black">
            {" "}
            Notifications
          </div>
        </div>
     <Card className='mt-4 p-3'>


     {notificationList.map((item,index)=>
      <div className='flex  border p-2 bg-[#EFEFEF] m-2' key={index}>
        <div className='mr-2'>
          <IV_N_MOB />
        </div>
        <div className='flex flex-col gap-1 bg-[#EFEFEF]'>
          <div className='flex gap-2 items-center'>
          <div className='font-poppins_cf font-medium text-xs text-theme-black'>
            Lorem Ipsum is simply dummy
          </div>
          <div className='flex gap-2 items-center'>
          <IV_GREEN_INDICATOR/>
          <div className=' text-xs text-theme-green font-poppins_cf'>New</div>
          </div>
          
          </div>
          <div className='font-poppins_cf font-normal text-xs text-theme-grey'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </div>
          <div className='font-poppins_cf font-normal text-xs text-[#B9B4B4]'>
          12/03/2024
          </div>
        </div>
      </div>
     )}

     
     
     </Card>
    </div>
  );
}

export default NotificationsDetail;
