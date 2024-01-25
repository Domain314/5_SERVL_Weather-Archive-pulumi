// © 27vier Development - Artjom Moisejev, CTO - https://27vier.com

import { createContext } from 'react';

const BackendDataContext = createContext({
    userData: null,
    createBackend: () => { },
    getAll: () => { },
    getAuth: () => { },
    getContextField: async () => { },
    getFieldEntry: async () => { },
    setContextField: () => { },
    setFieldEntry: () => { },
    setAuth: () => { },
});

export default BackendDataContext;