import courses from "../mock/courses";

import client from "../api/client";

import API_ENDPOINTS from "../constants/apiEndpoints";

class LearningService {

    async getCourses() {

        /*
        Future

        return await client.get(
            API_ENDPOINTS.COURSES
        );
        */

        return Promise.resolve(courses);

    }

    async getContinueLearning() {

        return Promise.resolve(

            courses.filter(

                course => course.started

            )

        );

    }

    async getRecommendedCourses() {

        return Promise.resolve(

            courses.filter(

                course => !course.started

            )

        );

    }

    async getCoursesByCategory(category) {

        return Promise.resolve(

            courses.filter(

                course =>

                    course.category === category

            )

        );

    }

}

export default new LearningService();