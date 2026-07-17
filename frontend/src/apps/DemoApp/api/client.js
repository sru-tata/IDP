class ApiClient {

    async get(url) {

        console.log("GET", url);

        return Promise.resolve(null);

    }

    async post(url, body) {

        console.log("POST", url, body);

        return Promise.resolve(null);

    }

    async put(url, body) {

        console.log("PUT", url, body);

        return Promise.resolve(null);

    }

    async patch(url, body) {

        console.log("PATCH", url, body);

        return Promise.resolve(null);

    }

    async delete(url) {

        console.log("DELETE", url);

        return Promise.resolve(null);

    }

}

export default new ApiClient();