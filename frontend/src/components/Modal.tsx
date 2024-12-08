import React from "react";
import { CircleX } from 'lucide-react';

type Props = {
  children?: React.ReactNode,
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
};

function Modal({children, setIsModal}: Props) {
  return (
    <section className="absolute flex justify-center items-center w-screen h-screen backdrop-blur-sm top-0 left-0">
      <div className="z-50 w-[300px] h-[450px] bg-slate-900 p-5 rounded-md">
      <button className="float-right" onClick={()=>setIsModal(false)}><CircleX/></button>
        {children}
      </div>
    </section>
  )
}

export default Modal;