import {
    X,
    Save
} from "lucide-react";

import {
    useEffect,
    useState
} from "react";

import Button from "../ui/Button";

import { useUser } from "../../context/UserContext";

function Input({

    label,

    value,

    onChange

}) {

    return (

        <div>

            <p className="mb-2 text-sm font-medium text-zinc-400">

                {label}

            </p>

            <input

                value={value}

                onChange={e =>

                    onChange(

                        e.target.value

                    )

                }

                className="
                    w-full
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

        </div>

    );

}

function EditProfileModal({

    onClose

}) {

    const {

        user,

        targetRole,

        availableRoles,

        updateUser,

        changeTargetRole

    } = useUser();

    const [

        form,

        setForm

    ] = useState({

        name: "",

        currentRole: "",

        department: "",

        location: ""

    });

    const [

        roleId,

        setRoleId

    ] = useState("");

    useEffect(() => {

        if (!user) {

            return;

        }

        setForm({

            name: user.name || "",

            currentRole:

                user.currentRole || "",

            department:

                user.department || "",

            location:

                user.location || ""

        });

        setRoleId(

            user.targetRoleId

        );

    }, [

        user

    ]);

        function updateField(field, value) {

        setForm(previous => ({

            ...previous,

            [field]: value

        }));

    }

    async function saveProfile() {

        await updateUser({

            name: form.name,

            currentRole: form.currentRole,

            department: form.department,

            location: form.location

        });

        if (

            roleId !==

            user.targetRoleId

        ) {

            await changeTargetRole(

                roleId

            );

        }

        onClose();

    }

    return (

        <div

            className="
                fixed
                inset-0
                z-[120]
                flex
                items-center
                justify-center
                bg-black/60
                backdrop-blur-md
            "

            onClick={onClose}

        >

            <div

                onClick={event =>

                    event.stopPropagation()

                }

                className="
                    w-full
                    max-w-2xl
                    rounded-3xl
                    border
                    border-zinc-800
                    bg-zinc-950
                    p-8
                    shadow-2xl
                "

            >

                <div className="mb-8 flex items-center justify-between">

                    <div>

                        <h2 className="text-3xl font-bold">

                            Edit Learning Profile

                        </h2>

                        <p className="mt-2 text-zinc-500">

                            Changes are reflected across your dashboard,
                            recommendations and skill tree.

                        </p>

                    </div>

                    <button

                        onClick={onClose}

                        className="
                            rounded-full
                            bg-zinc-900
                            p-3
                            transition
                            hover:bg-zinc-800
                        "

                    >

                        <X size={20}/>

                    </button>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <Input

                        label="Name"

                        value={form.name}

                        onChange={value =>

                            updateField(

                                "name",

                                value

                            )

                        }

                    />

                    <Input

                        label="Current Role"

                        value={form.currentRole}

                        onChange={value =>

                            updateField(

                                "currentRole",

                                value

                            )

                        }

                    />

                    <Input

                        label="Department"

                        value={form.department}

                        onChange={value =>

                            updateField(

                                "department",

                                value

                            )

                        }

                    />

                    <Input

                        label="Location"

                        value={form.location}

                        onChange={value =>

                            updateField(

                                "location",

                                value

                            )

                        }

                    />

                    <div className="md:col-span-2">

                        <p className="mb-2 text-sm font-medium text-zinc-400">

                            Target Role

                        </p>

                        <select

                            value={roleId}

                            onChange={event =>

                                setRoleId(

                                    event.target.value

                                )

                            }

                            className="
                                w-full
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

                        >

                            {

                                availableRoles.map(role => (

                                    <option

                                        key={role.id}

                                        value={role.id}

                                    >

                                        {role.title}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                </div>

                <div className="mt-10 flex justify-end gap-4">

                    <Button

                        variant="secondary"

                        onClick={onClose}

                    >

                        Cancel

                    </Button>

                    <Button

                        onClick={saveProfile}

                    >

                        <span className="flex items-center gap-2">

                            <Save size={18}/>

                            Save Changes

                        </span>

                    </Button>

                </div>

            </div>

        </div>

    );

}

export default EditProfileModal;