import user from "../mock/user";

import client from "../api/client";

import API_ENDPOINTS from "../constants/apiEndpoints";

class UserService {

    async getUser() {

        /*
        Future

        return await client.get(
            API_ENDPOINTS.USER
        );
        */

        return Promise.resolve(user);

    }

    async updateUser(updatedUser) {

        /*
        Future

        return await client.patch(
            API_ENDPOINTS.USER,
            updatedUser
        );
        */

        return Promise.resolve(updatedUser);

    }

}

export default new UserService();