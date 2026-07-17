import competencies from "../mock/competencies";

class CompetencyService {

    async getCompetencies() {

        return Promise.resolve(

            competencies

        );

    }

}

export default new CompetencyService();