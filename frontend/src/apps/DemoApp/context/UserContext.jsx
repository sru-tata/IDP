import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

import userService from "../services/user.service";
import roleService from "../services/role.service";

const UserContext = createContext();

function UserProvider({ children }) {

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);

    const [availableRoles, setAvailableRoles] = useState([]);

    const [targetRole, setTargetRole] = useState(null);

    const [xpEvent, setXPEvent] = useState(null);

    /*
    --------------------------------------------------

    Initial Load

    --------------------------------------------------
    */

    useEffect(() => {

        loadUser();

    }, []);

    async function loadUser() {

        setLoading(true);

        try {

            const [

                userData,

                roles

            ] = await Promise.all([

                userService.getUser(),

                roleService.getCareerRoles()

            ]);

            setUser(userData);

            setAvailableRoles(roles);

            const role = roles.find(

                item =>

                    item.id === userData.targetRoleId

            ) || null;

            setTargetRole(role);

        }

        finally {

            setLoading(false);

        }

    }

    /*
    --------------------------------------------------

    Generic Update

    --------------------------------------------------
    */

    async function updateUser(updatedFields) {

        if (!user) {

            return;

        }

        const updatedUser = {

            ...user,

            ...updatedFields

        };

        await userService.updateUser(updatedUser);

        setUser(updatedUser);

    }

    /*
    --------------------------------------------------

    Profile

    --------------------------------------------------
    */

    async function updateProfile(profile) {

        await updateUser(profile);

    }

    /*
    --------------------------------------------------

    Avatar

    --------------------------------------------------
    */

    async function updateAvatar(avatar) {

        await updateUser({

            avatar

        });

    }

    /*
    --------------------------------------------------

    Interests

    --------------------------------------------------
    */

    async function updateInterests(interests) {

        await updateUser({

            interests

        });

    }

    /*
    --------------------------------------------------

    Preferences

    --------------------------------------------------
    */

    async function updatePreferences(preferences) {

        await updateUser({

            preferences

        });

    }

    /*
    --------------------------------------------------

    Certificates

    --------------------------------------------------
    */

    async function addCertificate(certificate) {

        await updateUser({

            certificates: [

                ...(user.certificates || []),

                certificate

            ]

        });

    }

    /*
    --------------------------------------------------

    XP / Levels

    --------------------------------------------------
    */

    async function addXP(amount = 0) {

        if (!user || !amount) {

            return;

        }

        let newXP = user.xp + amount;
        let newLevel = user.currentLevel;
        let newXpToNextLevel = user.xpToNextLevel;
        let leveledUp = false;

        while (newXP >= newXpToNextLevel) {

            newXP -= newXpToNextLevel;
            newLevel += 1;
            newXpToNextLevel = Math.round(newXpToNextLevel * 1.15);
            leveledUp = true;

        }

        await updateUser({

            xp: newXP,
            currentLevel: newLevel,
            xpToNextLevel: newXpToNextLevel

        });

        setXPEvent({

            amount,
            leveledUp,
            newLevel,
            key: `${Date.now()}-${Math.random()}`

        });

    }

    /*
    --------------------------------------------------

    Activity

    --------------------------------------------------
    */

    async function addActivity(activity) {

        await updateUser({

            activities: [

                activity,

                ...(user.activities || [])

            ]

        });

    }

    /*
    --------------------------------------------------

    Target Role

    --------------------------------------------------
    */

    async function changeTargetRole(roleId) {

        if (!user) {

            return;

        }

        const role = availableRoles.find(

            role =>

                role.id === roleId

        );

        if (!role) {

            return;

        }

        await updateUser({

            targetRoleId: role.id

        });

        setTargetRole(role);

    }

    /*
    --------------------------------------------------

    Context

    --------------------------------------------------
    */

    const value = useMemo(() => ({

        loading,

        user,

        targetRole,

        availableRoles,

        refreshUser: loadUser,

        updateUser,

        updateProfile,

        updateAvatar,

        updateInterests,

        updatePreferences,

        addCertificate,

        addActivity,

        addXP,

        xpEvent,

        changeTargetRole

    }), [

        loading,

        user,

        targetRole,

        availableRoles,

        xpEvent

    ]);

    return (

        <UserContext.Provider value={value}>

            {children}

        </UserContext.Provider>

    );

}

export function useUser() {

    return useContext(

        UserContext

    );

}

export default UserProvider;