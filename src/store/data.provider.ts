import {BaseModel} from "./index";

export interface IDataProvider {
    getModel<T extends BaseModel>(nature: string, id: number): Promise<T>

    getModels<T extends BaseModel[]>(nature: string): Promise<T>

    createModel<T extends BaseModel>(nature: string, value: T): Promise<T>

    updateModel<T extends BaseModel>(nature: string, id: number, value: T): Promise<T>

    delete(nature: string, id: number): Promise<void>
}

class LocalStorageProvider implements IDataProvider {

    getModel<T extends BaseModel>(nature: string, id: number): Promise<T> {
        return new Promise<T>((res, rej) => {
            const db = LocalStorageProvider.db;
            if (db.hasOwnProperty(nature)) {
                const model = db[nature].find((v) => v.id === id);
                if (model) {
                    res(model);
                } else {
                    rej('model not found');
                }
            } else {
                rej('nature not found');
            }
        });
    }

    getModels<T extends BaseModel[]>(nature: string): Promise<T> {
        return new Promise<T>((res, rej) => {
            const db = LocalStorageProvider.db;
            if (db.hasOwnProperty(nature)) {
                res(db[nature]);
            } else {
                rej('nature not found');
            }
        });
    }

    updateModel<T extends BaseModel>(nature: string, id: number, value: T): Promise<T> {
        return new Promise<T>((res, rej) => {
            const db = LocalStorageProvider.db;
            if (db.hasOwnProperty(nature)) {
                let updatedModel = undefined;
                db[nature] = db[nature].map((v) => {
                    if (v.id === id) {
                        updatedModel = {
                            ...v,
                            ...value
                        };
                        return updatedModel;
                    }
                    return v;
                });
                if (updatedModel) {
                    localStorage.setItem('database', JSON.stringify(db));
                    res(updatedModel);
                } else {
                    rej('model not found');
                }
            } else {
                rej('nature not found');
            }
        });
    }

    createModel<T extends BaseModel>(nature: string, value: T): Promise<T> {
        return new Promise<T>((res, rej) => {
            const db = LocalStorageProvider.db;
            if (db.hasOwnProperty(nature)) {
                const newModel = {...value, id: 0};
                const lastModel = db[nature][db[nature].length - 1];
                if (lastModel !== undefined) {
                    newModel.id = lastModel.id + 1;
                }
                db[nature].push(newModel);
                localStorage.setItem('database', JSON.stringify(db));
                res(newModel);
            } else {
                rej('nature not found');
            }
        });
    }

    delete<T extends BaseModel>(nature: string, id: number): Promise<void> {
        return new Promise<void>((res, rej) => {
            const db = LocalStorageProvider.db;
            if (db.hasOwnProperty(nature)) {
                db[nature] = db[nature].filter(v => v.id !== id);
                localStorage.setItem('database', JSON.stringify(db));
                res();
            } else {
                rej('nature not found');
            }
        });
    }

    private static get db(): LocalStorage {
        let db = localStorage.getItem('database');
        if (db != null) {
            return JSON.parse(db);
        }
        return {};
    }

    async initState(data: LocalStorage) {
        const db = LocalStorageProvider.db;
        let newDb = {...db};
        for (const key in data) {
            if (!db.hasOwnProperty(key)) {
                newDb = {...newDb, [key]: data[key]};
            }
        }
        localStorage.setItem('database', JSON.stringify(newDb));
    }
}

export interface LocalStorage {
    [key: string]: any;
}

export const defaultLocalStorage: LocalStorage = {
    students: [],
};

const provider = new LocalStorageProvider();

export default provider;
