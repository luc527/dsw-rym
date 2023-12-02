const _base = 'http://localhost:8080/'

export function formObject(fd) {
    const obj = {};
    for (const [k, v] of fd.entries()) {
        if (k.endsWith('[]')) {
            const realk = k.substr(0, k.length-2);
            let a = obj[realk] || (obj[realk] = []);
            a.push(v);
        } else {
            obj[k] = v;
        }
    }
    return obj;
}

export async function apiFetch(method, endpoint, data=undefined) {
    if (endpoint.startsWith('/')) {
        endpoint = endpoint.slice(1);
    }

    const url = new URL(`${_base}${endpoint}`);

    let requestBody;
    if (data) {
        if (method == 'GET' || method == 'DELETE') {
            for (const [k, v] of Object.entries(data)) {
                url.searchParams.append(k, encodeURIComponent(v));
            }
        } else {
            requestBody = JSON.stringify(data);
        }
    }

    const init = {
        method,
        body: requestBody,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    };
    const response = await fetch(url, init);

    const text = await response.text();

    let ok = response.ok;
    let responseBody;
    try {
        responseBody = JSON.parse(text);
    } catch (error) {
        console.error(`request('${method}', '${endpoint}'): failed to parse json: ${text}`);
        ok = false;
    }

    return {
        ok,
        status: response.status,
        data: responseBody,
    };
}