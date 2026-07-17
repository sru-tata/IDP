import careerRoles from "../constants/careerRoles";
import roleSkillTrees from "../mock/roles/index";

const delay = (ms = 300) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const roleService = {

    async getCareerRoles() {

        await delay();

        return careerRoles;

    },

    async getRole(roleId) {

        await delay();

        return careerRoles.find(

            (role) => role.id === roleId

        );

    },

    async getSkillTree(roleId) {

        await delay();

        return roleSkillTrees[roleId];

    },

    async getEstimatedDuration(roleId) {

        await delay();

        const role = careerRoles.find(

            (role) => role.id === roleId

        );

        return role?.estimatedMonths ?? 0;

    },

    async roleExists(roleId) {

        await delay();

        return Boolean(

            roleSkillTrees[roleId]

        );

    }

};

export default roleService;