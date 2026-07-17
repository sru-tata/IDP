import clsx from "clsx";

function Button({

    children,

    onClick,

    className = "",

    variant = "primary",

    type = "button",

    disabled = false

}) {

    const variants = {

        primary:

            "bg-blue-600 hover:bg-blue-500 text-white",

        secondary:

            "bg-zinc-800 hover:bg-zinc-700 text-white",

        ghost:

            "bg-transparent hover:bg-zinc-800 text-zinc-300"

    };

    return (

        <button

            type={type}

            onClick={onClick}

            disabled={disabled}

            className={clsx(

                "rounded-xl",

                "px-5",

                "py-3",

                "font-medium",

                "transition-all",

                "duration-300",

                disabled && "cursor-not-allowed opacity-50",

                variants[variant],

                className

            )}

        >

            {children}

        </button>

    );

}

export default Button;