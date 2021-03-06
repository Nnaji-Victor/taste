
const apiURL = process.env.REACT_APP_API_URL;

/**
 * Abstract api client that uses the native windows fetch object
 * @param {*} endpoint - endpoint to call
 * @param {*} endpoint_configurations - optional end point configurations that includes header information and type of request
 */
async function client(endpoint, {data, token, headers: customHeaders, ...customConfig} ={}){
    const config = {
        method: data ? 'POST': 'GET',
        body: data ? JSON.stringify(data) : undefined,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            'Content-Type': data ? 'application/json' : undefined,
            ...customHeaders
        },
        ...customConfig,
    }

    return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
        if(response.status === 401){
            //clear cache
            //log out
            window.location.assign(window.location)
            return Promise.reject({'message': 'Please re-authenticate'})
        }

        const data = await response.json();
        if(response.ok){
            return data;
        }else{
            return Promise.reject(data);
        }
    })
}

export {client}