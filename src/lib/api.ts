const baseURL:string = "https://api.betterlectio.dk";

const REQUEST = async (path, method, o1, o2?):Promise<[any, Error]> => {
    try {
        let response = !o2 ? await method(baseURL + path, o1) : await method(baseURL + path, o1, o2);

        if(String(response.status).startsWith("2")) {
            if (response["data"]["response"])
                return [null, response["data"]];
            else
                return [response["data"], null];
        }
        else
            return [null, response["data"]];
    } catch(error) {
        if(error["response"]) {
            class ResError extends Error {
                name = error["response"].status;
                message = error["response"].statusText;
            }

            return [null, new ResError()];
        }

        return [null, error];
    }
};

export const GET = async (path:string = "/", headers = {}) => await REQUEST(path, 
    /** @ts-ignore */
    axios.get, { headers });

export const POST = async (path:string = "/", body = {}, headers = {}) => await REQUEST(path, 
    /** @ts-ignore */
    axios.post, body, { headers });

export const PUT = async (path:string = "/", body = {}, headers = {}) => await REQUEST(path, 
    /** @ts-ignore */
    axios.put, body, { headers });

export const PATCH = async (path:string = "/", body = {}, headers = {}) => await REQUEST(path, 
    /** @ts-ignore */
    axios.patch, body, { headers });

export const DELETE = async (path:string = "/", headers = {}) => await REQUEST(path, 
    /** @ts-ignore */
    axios.post, { headers });
