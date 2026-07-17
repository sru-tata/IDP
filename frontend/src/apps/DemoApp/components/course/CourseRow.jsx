import {
    ChevronLeft,
    ChevronRight
} from "lucide-react";

import {
    useEffect,
    useMemo,
    useRef
} from "react";

import {
    Swiper,
    SwiperSlide
} from "swiper/react";

import {
    Mousewheel,
    Navigation
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import CourseCard from "./CourseCard";

import { useCourses } from "../../context/CourseContext";

function CourseRow({

    rowId,

    title,

    subtitle,

    courses = []

}) {

    const swiperRef = useRef(null);

    const {

        highlightedCourseId,

        query

    } = useCourses();

    const highlightedIndex = useMemo(() => {

        return courses.findIndex(

            c =>

                c.id === highlightedCourseId

        );

    }, [

        courses,

        highlightedCourseId

    ]);

    useEffect(() => {

        if (

            highlightedIndex === -1 ||

            !swiperRef.current

        ) {

            return;

        }

        requestAnimationFrame(() => {

            swiperRef.current.slideTo(

                Math.max(

                    highlightedIndex - 1,

                    0

                ),

                800

            );

        });

    }, [

        highlightedIndex

    ]);

    return (

        <section className="mb-20">

            <div className="mb-8 flex items-end justify-between">

                <div>

                    <h2 className="text-4xl font-bold">

                        {title}

                    </h2>

                    {

                        subtitle && (

                            <p className="mt-2 text-zinc-500">

                                {subtitle}

                            </p>

                        )

                    }

                </div>

                <div className="flex gap-3">

                    <button
                        onClick={() =>
                            swiperRef.current?.slidePrev()
                        }
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 hover:border-blue-500"
                    >
                        <ChevronLeft size={20}/>
                    </button>

                    <button
                        onClick={() =>
                            swiperRef.current?.slideNext()
                        }
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 hover:border-blue-500"
                    >
                        <ChevronRight size={20}/>
                    </button>

                </div>

            </div>

            <Swiper

                modules={[

                    Navigation,

                    Mousewheel

                ]}

                centeredSlides={

                    query.length > 0

                }

                watchSlidesProgress

                watchOverflow

                speed={800}

                resistanceRatio={0.6}

                spaceBetween={28}

                slidesPerView={"auto"}

                mousewheel={{

                    forceToAxis: true

                }}

                onSwiper={swiper =>

                    swiperRef.current = swiper

                }

                className="!overflow-visible"

            >

                {

                    courses.map(course => (

                        <SwiperSlide

                            key={course.id}

                            style={{

                                width: "400px"

                            }}

                        >

                            <CourseCard

                                {...course}

                                highlighted={

                                    course.id ===

                                    highlightedCourseId

                                }

                            />

                        </SwiperSlide>

                    ))

                }

            </Swiper>

        </section>

    );

}

export default CourseRow;