// © 27vier Development - Artjom Moisejev, CTO - https://27vier.com

class BackendData {
    constructor() {
        this.backendData = {};
    }

    createBackend(data) {
        this.backendData.data = data;
    }

    getAll() {
        return this.backendData.data;
    }

    getAuth() {
        return this.backendData.auth;
    }

    getContextField(field) {
        return this.backendData.data[field];
    }

    getFieldEntry(field, id) {
        return this.backendData.data[field][id];
    }

    setContextField(field, value) {
        this.backendData.data[field] = value;
    }

    setFieldEntry(field, id) {
        this.backendData.data[field][id] = value;
    }

    setAuth(auth) {
        this.backendData.auth = auth;
    }
}

export default BackendData;