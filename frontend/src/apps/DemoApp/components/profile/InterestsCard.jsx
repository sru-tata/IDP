import {
    Plus,
    X,
    Heart
} from "lucide-react";

import { useState } from "react";

import Card from "../ui/Card";

import { useUser } from "../../context/UserContext";

function InterestsCard() {

    const {

        user,

        updateInterests

    } = useUser();

    const interests = user?.interests ?? [];

    const [

        value,

        setValue

    ] = useState("");

    function addInterest() {

        const interest = value.trim();

        if (

            !interest ||

            interests.includes(interest)

        ) {

            return;

        }

        updateInterests([

            ...interests,

            interest

        ]);

        setValue("");

    }

    function removeInterest(name) {

        updateInterests(

            interests.filter(

                item =>

                    item !== name

            )

        );

    }

    return (

        <Card className="h-full p-6">

            <div className="flex items-center gap-2">

                <Heart

                    size={18}

                    className="text-blue-400"

                />

                <p className="font-semibold text-blue-400">

                    Learning Interests

                </p>

            </div>

            <p className="mt-2 text-sm text-zinc-500">

                Help AI personalize your recommendations.

            </p>

            <div className="mt-6 flex flex-wrap gap-3">

                {

                    interests.map(item => (

                        <div

                            key={item}

                            className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-zinc-800
                                bg-zinc-900
                                px-4
                                py-2
                                text-sm
                                transition
                                hover:border-blue-500
                            "

                        >

                            <span>

                                {item}

                            </span>

                            <button

                                onClick={()=>

                                    removeInterest(item)

                                }

                            >

                                <X

                                    size={14}

                                    className="text-zinc-500"

                                />

                            </button>

                        </div>

                    ))

                }

            </div>

            <div className="mt-6 flex gap-3">

                <input

                    value={value}

                    onChange={event=>

                        setValue(

                            event.target.value

                        )

                    }

                    placeholder="Add interest..."

                    className="
                        flex-1
                        rounded-xl
                        border
                        border-zinc-800
                        bg-zinc-900
                        px-4
                        py-3
                        outline-none
                        transition
                        focus:border-blue-500
                    "

                />

                <button

                    onClick={addInterest}

                    className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-5
                        transition
                        hover:bg-blue-500
                    "

                >

                    <Plus size={16}/>

                    Add

                </button>

            </div>

        </Card>

    );

}

export default InterestsCard;