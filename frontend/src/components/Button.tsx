import React from "react"

interface ButtonProps {
  children: React.ReactNode
  variant?: "default" | "outline" | "blue"
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: any
}

function Button({children, variant, className, ...props} : ButtonProps) {
  let style;

  switch (variant) {
    case "outline":
      style = "p-2 px-3 border rounded-full text-[#1d9bf0] bg-transparent hover:bg-slate-700 transition duration-30 ease-in-out w-fit"
      break
    case "blue":
      style = "p-2 px-3 rounded-full bg-[#1d9bf0] hover:bg-sky-700 transition duration-30 ease-in-out w-fit"
      break
    default:
      style = "p-2 px-3 rounded-full bg-[#1d9bf0] hover:bg-sky-700 transition duration-30 ease-in-out w-fit"

  }

  return (
    <button 
      className={style+" "+(className && className)} 
      onClick={props.onClick} 
      type={props?.type}
      {...props} >
        {children}
      </button>)
}

export default Button;