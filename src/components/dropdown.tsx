"use client";
import React, { useState } from "react";
import  { AlertCircle, CheckCircle } from "./status-message";

const DefaultIcon=()=>{
  return <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect y="0.5" width="24" height="24" rx="12" fill="#2F64EE" fillOpacity="0.1"/>
  <path d="M10.8001 14.4033L16.3153 8.88745L17.1643 9.73585L10.8001 16.1001L6.98169 12.2817L7.83009 11.4333L10.8001 14.4033Z" fill="#2F64EE" fillOpacity="0.29"/>
  </svg>
  
}
const DropDown: React.FC<{
  open: boolean;
  status: string;
  button: React.ReactNode;
  title: string;
  description: string;
  content: React.ReactNode;
  footer: React.ReactNode;
}> = ({
    open,
    button,
  status,
  title,
  description,
  content,
  footer,
}) => {

  return (
    <div className="mx-auto mt-8 w-full overflow-hidden rounded-lg border-2 border-[#EBEDF3] bg-white shadow-sm">
      <div className="flex cursor-pointer items-center justify-between p-6">
        <div className="flex items-center">
         
            {status === "success" ? (
              <CheckCircle height={24} width={24} />
            ) :status==="error" ? (
              <AlertCircle height={24} width={24    } />
            ) : (
              <DefaultIcon />
            )}
          
          <div className="px-4">
            <p className="font-sm pb-2 text-left text-[18px] leading-[21.48px] tracking-[0.1px]">
              {title}
            </p>
            <p className="font-light text-gray-500">{description}</p>
          </div>
        </div>
     {button}
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        {content}
       {footer}
       
      </div>
    </div>
  );
};

export default DropDown;
