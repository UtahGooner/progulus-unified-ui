const jsonHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

async function handleJSONResponse<T = any>(res:Response):Promise<T> {
    if (!res.ok) {
        const text = await res.text() || `${res.status}; ${res.statusText}`;
        return Promise.reject(new Error(text));
    }
    const json = await res.json();
    if (json.error) {
        console.warn(json.error);
        return Promise.reject(new Error(json.error));
    }
    return json || {};
}

export async function fetchJSON<T = any>(url:string, options:RequestInit = {}, body?:object|BodyInit):Promise<T> {
    try {
        const headers = options.headers || {};
        const contentTypeHeaders = typeof body === 'object' ? jsonHeaders : {};
        const init:RequestInit = {
            credentials: 'same-origin',
            ...options,
            body: typeof body === 'object' ? JSON.stringify(body) : body,
            mode: 'no-cors',
            headers: {
                ...contentTypeHeaders,
                ...headers,
            }
        }
        const res = await fetch(url, init);
        return await handleJSONResponse(res);
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.log("fetchJSON()", err.message);
        }
        return Promise.reject(err);
    }
}

export async function fetchHTML(url:string, options: RequestInit = {}):Promise<string> {
    try {
        const res = await fetch(url, {credentials: 'same-origin', ...options});
        if (!res.ok) {
            const text = await res.text();
            return Promise.reject(new Error(text));
        }
        return await res.text();
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.log("fetchGET()", err.message);
        }
        return Promise.reject(err);
    }
}
