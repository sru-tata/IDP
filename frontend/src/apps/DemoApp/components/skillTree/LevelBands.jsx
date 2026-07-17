function LevelBands() {

    return (

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

            {/* Advanced */}

            <section
                className="
                    absolute
                    top-0
                    left-0
                    right-0
                    h-[30%]
                    border-b
                    border-zinc-800
                "
            >

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-b
                        from-violet-500/5
                        to-transparent
                    "
                />

                <h2
                    className="
                        absolute
                        left-10
                        top-10
                        text-7xl
                        font-black
                        uppercase
                        tracking-[0.45em]
                        text-white/5
                        select-none
                    "
                >

                    Advanced

                </h2>

            </section>

            {/* Intermediate */}

            <section
                className="
                    absolute
                    top-[30%]
                    left-0
                    right-0
                    h-[35%]
                    border-b
                    border-zinc-800
                "
            >

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-b
                        from-sky-500/5
                        to-transparent
                    "
                />

                <h2
                    className="
                        absolute
                        left-10
                        top-10
                        text-7xl
                        font-black
                        uppercase
                        tracking-[0.45em]
                        text-white/5
                        select-none
                    "
                >

                    Intermediate

                </h2>

            </section>

            {/* Beginner */}

            <section
                className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    h-[35%]
                "
            >

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-emerald-500/5
                        to-transparent
                    "
                />

                <h2
                    className="
                        absolute
                        left-10
                        bottom-10
                        text-7xl
                        font-black
                        uppercase
                        tracking-[0.45em]
                        text-white/5
                        select-none
                    "
                >

                    Beginner

                </h2>

            </section>

            {/* Journey */}

            <div
                className="
                    absolute
                    left-1/2
                    top-0
                    bottom-0
                    w-px
                    -translate-x-1/2
                    bg-gradient-to-b
                    from-transparent
                    via-blue-500/20
                    to-transparent
                "
            />

        </div>

    );

}

export default LevelBands;