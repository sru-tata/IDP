import { Outlet } from "react-router-dom";

import Sidebar from "../components/navigation/Sidebar";
import Topbar from "../components/navigation/Topbar";

import CoursePreviewModal from "../components/course/CoursePreviewModal";
import VideoPlayerModal from "../components/course/VideoPlayerModal";

import JobRotationModal from "../components/grow/JobRotationModal";
import ExposureActivityModal from "../components/grow/ExposureActivityModal";
import XPToast from "../components/gamification/XPToast";

import { useCourses } from "../context/CourseContext";
import { useGrow } from "../context/GrowContext";

function MainLayout() {

    const {

        selectedCourse,

        closeCourse,

        featuredCourse,

        featuredReason

    } = useCourses();

    const {

        selectedRotation,

        selectedActivity,

        selectedActivityKind,

        closeGrowModal

    } = useGrow();

    return (
        <div className="flex h-screen bg-zinc-950 text-white">

            <Sidebar />

            <div className="flex flex-1 flex-col overflow-hidden">

                <Topbar />

                <main
                    className="
                        flex-1
                        overflow-y-auto
                        bg-zinc-950
                        p-8
                    "
                >
                    <Outlet />
                </main>

            </div>

            <CoursePreviewModal

                course={selectedCourse}

                featuredReason={

                    selectedCourse &&
                    featuredCourse &&
                    selectedCourse.id === featuredCourse.id

                        ? featuredReason

                        : []

                }

                onClose={closeCourse}

            />

            <VideoPlayerModal />

            <JobRotationModal

                rotation={selectedRotation}

                onClose={closeGrowModal}

            />

            <ExposureActivityModal

                activity={selectedActivity}

                kind={selectedActivityKind}

                onClose={closeGrowModal}

            />

            <XPToast/>

        </div>
    );
}

export default MainLayout;
