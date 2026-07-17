function ProgressBar({

    value = 0,

    max = 100,

    color = "bg-blue-600",

    label = "Progress",

    hideLabel = false

}) {

    const percentage = max > 0
        ? Math.min(100, Math.max(0, (value / max) * 100))
        : 0;

    const valueLabel = max === 100
        ? `${Math.round(value)}%`
        : `${value} / ${max}`;

    return (

        <div className="w-full">

            {
                !hideLabel && (

                    <div
                        className="mb-2 flex justify-between text-sm"
                    >

                        <span className="text-zinc-400">

                            {label}

                        </span>

                        <span>

                            {valueLabel}

                        </span>

                    </div>

                )
            }

            <div
                className="h-2 overflow-hidden rounded-full bg-zinc-800"
            >

                <div

                    style={{

                        width: `${percentage}%`

                    }}

                    className={`h-full rounded-full transition-all duration-500 ${color}`}

                />

            </div>

        </div>

    );

}

export default ProgressBar;
