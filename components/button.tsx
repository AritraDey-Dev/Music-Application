import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{}



const Button=forwardRef<HTMLButtonElement,ButtonProps>(({
    className,
    children,
    disabled,
    type="button",
    ...props
},ref)=>{
    return (
        <button type={type} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm
         px-5 py-2.5 text-center
          me-2 mb-2 dark:bg-green-600
           dark:hover:bg-green-700 dark:focus:ring-green-800"
            disabled={disabled} ref={ref}
         {...props}>
      {children}
        </button>
    )
})

Button.displayName="Button"
export default Button;