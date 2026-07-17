import {
    MapPin,
    Briefcase,
    Target,
    Building2,
    Pencil,
    UserCircle2
} from "lucide-react";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import Card from "../ui/Card";
import EditProfileModal from "./EditProfileModal";

function InfoItem({

    icon,

    label,

    value

}) {

    return (

        <div className="flex items-center gap-3">

            <div className="text-zinc-500">

                {icon}

            </div>

            <div>

                <p className="text-xs uppercase tracking-wider text-zinc-500">

                    {label}

                </p>

                <p className="font-medium">

                    {value}

                </p>

            </div>

        </div>

    );

}

function ProfileHero() {

    const {
        user,
        targetRole,
        availableRoles

    } = useUser();

    const [

        open,

        setOpen

    ] = useState(false);

    if (!user) {

        return null;

    }

    return (

        <>

            <Card

                className="
                    relative
                    overflow-hidden
                    p-10
                "

            >

                <div

                    className="
                        absolute
                        -right-24
                        -top-24
                        h-80
                        w-80
                        rounded-full
                        bg-blue-600/10
                        blur-3xl
                    "

                />

                <div

                    className="
                        flex
                        items-start
                        justify-between
                    "

                >

                    <div className="flex gap-8">

                        <div

                            className="
                                flex
                                h-32
                                w-32
                                items-center
                                justify-center
                                rounded-full
                                bg-gradient-to-br
                                from-blue-600
                                to-cyan-500
                            "

                        >

                            <UserCircle2

                                size={82}

                            />

                        </div>

                        <div>

                            <h1

                                className="
                                    text-5xl
                                    font-black
                                "

                            >

                                {user.name}

                            </h1>

                            <p

                                className="
                                    mt-3
                                    text-xl
                                    text-blue-400
                                "

                            >

                                {targetRole.title}

                            </p>

                            <div

                                className="
                                    mt-8
                                    grid
                                    grid-cols-2
                                    gap-x-12
                                    gap-y-6
                                "

                            >

                                <InfoItem

                                    icon={

                                        <Briefcase size={18}/>

                                    }

                                    label="Current Role"

                                    value={

                                        user.currentRole

                                    }

                                />

                                <InfoItem

                                    icon={

                                        <Target size={18}/>

                                    }

                                    label="Target Role"

                                    value={

                                        targetRole.title

                                    }

                                />

                                <InfoItem

                                    icon={

                                        <Building2 size={18}/>

                                    }

                                    label="Department"

                                    value={

                                        user.department

                                    }

                                />

                                <InfoItem

                                    icon={

                                        <MapPin size={18}/>

                                    }

                                    label="Location"

                                    value={

                                        user.location

                                    }

                                />

                            </div>

                        </div>

                    </div>

                    <button

                        onClick={()=>

                            setOpen(true)

                        }

                        className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-zinc-700
                            px-5
                            py-3
                            transition
                            hover:border-blue-500
                        "

                    >

                        <Pencil

                            size={16}

                        />

                        Edit Profile

                    </button>

                </div>

            </Card>

            {

                open && (

                    <EditProfileModal

                        onClose={()=>

                            setOpen(false)

                        }

                    />

                )

            }

        </>

    );

}

export default ProfileHero;