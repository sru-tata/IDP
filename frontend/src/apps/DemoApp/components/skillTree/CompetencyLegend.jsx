import {
    Brain,
    Briefcase,
    Cog,
    Factory,
    Play,
    Shield,
    Sparkles,
    Code2
} from "lucide-react";

const typeItems = [

    {
        title: "Education",
        icon: Play,
        color: "bg-blue-500"
    },

    {
        title: "Experience",
        icon: Briefcase,
        color: "bg-amber-500"
    },

    {
        title: "Exposure",
        icon: Sparkles,
        color: "bg-pink-500"
    }

];

const items = [

    {

        title: "Manufacturing",

        icon: Factory,

        color: "bg-orange-500"

    },

    {

        title: "Quality",

        icon: Shield,

        color: "bg-green-500"

    },

    {

        title: "Programming",

        icon: Code2,

        color: "bg-sky-500"

    },

    {

        title: "Automation",

        icon: Cog,

        color: "bg-fuchsia-500"

    },

    {

        title: "Artificial Intelligence",

        icon: Brain,

        color: "bg-violet-500"

    }

];

function CompetencyLegend() {

    return (

        <div

            className="
                absolute
                right-6
                top-6
                z-20
                space-y-3
                rounded-3xl
                border
                border-zinc-800
                bg-zinc-900/90
                p-5
                backdrop-blur
            "

        >

            <h3 className="text-xs uppercase tracking-[0.3em] text-zinc-500">

                Competencies

            </h3>

            {

                items.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div

                            key={item.title}

                            className="flex items-center gap-3"

                        >

                            <div

                                className={`flex h-8 w-8 items-center justify-center rounded-full ${item.color}`}

                            >

                                <Icon

                                    size={16}

                                />

                            </div>

                            <span className="text-sm">

                                {item.title}

                            </span>

                        </div>

                    );

                })

            }

            <h3 className="pt-2 text-xs uppercase tracking-[0.3em] text-zinc-500 border-t border-zinc-800">

                Type

            </h3>

            {

                typeItems.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div

                            key={item.title}

                            className="flex items-center gap-3"

                        >

                            <div

                                className={`flex h-8 w-8 items-center justify-center rounded-full ${item.color}`}

                            >

                                <Icon

                                    size={14}

                                />

                            </div>

                            <span className="text-sm">

                                {item.title}

                            </span>

                        </div>

                    );

                })

            }

        </div>

    );

}

export default CompetencyLegend;