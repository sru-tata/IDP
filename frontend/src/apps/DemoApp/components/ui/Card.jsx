import clsx from "clsx";

function Card({

    children,

    className = ""

}) {

    return (

        <div

            className={clsx(

                "rounded-3xl",

                "border",

                "border-zinc-800",

                "bg-zinc-900",

                "p-6",

                "transition-all",

                "duration-300",

                "hover:border-zinc-700",

                className

            )}

        >

            {children}

        </div>

    );

}

export default Card;