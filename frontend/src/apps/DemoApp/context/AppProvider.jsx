import AuthProvider from "./AuthContext";
import HRProvider from "./HRContext";
import UserProvider from "./UserContext";
import LearningProvider from "./LearningContext";
import CompetencyProvider from "./CompetencyContext";
import GrowProvider from "./GrowContext";
import SkillTreeProvider from "./SkillTreeContext";
import CourseProvider from "./CourseContext";

function AppProvider({ children }) {

    return (

        <AuthProvider>

            <HRProvider>

                <UserProvider>

                    <LearningProvider>

                        <CompetencyProvider>

                            <GrowProvider>

                                <SkillTreeProvider>

                                    <CourseProvider>

                                        {children}

                                    </CourseProvider>

                                </SkillTreeProvider>

                            </GrowProvider>

                        </CompetencyProvider>

                    </LearningProvider>

                </UserProvider>

            </HRProvider>

        </AuthProvider>

    );

}

export default AppProvider;
