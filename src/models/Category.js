import Realtime from '../serverConfig/Realtime.js';
import uniqueId from '../helpers/uniqueId.js';


class Category {
    static dbName = 'category';
    constructor(loader, userId = '') {
        this.loader = loader;
        this.userId = userId;
    }
    getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                this.loader(true);
                const res = await Realtime.get(`${this.constructor.dbName}/${this.userId}`);
                let topics = [];
                if (!res) resolve(null);
                res.forEach(topic => { topics.push(topic.val()) });
                resolve(topics);
            }
            catch (error) {
                reject(error);
            }
            finally {
                this.loader(false);
            }
        });
    }
    get(id) {
        return new Promise(async (resolve, reject) => {
            try {
                this.loader(true);
                const res = await Realtime.get(`${this.constructor.dbName}/${this.userId}/${id}`);
                if (res.exists()) {
                    resolve(res.val());
                }
                resolve(null);
            }
            catch (error) {
                reject(error);
            }
            finally {
                this.loader(false);
            }
        });
    }
    post(title) {
        let category = {
            title,
            id: uniqueId(),
            time: Date.now(),

        }
        return new Promise(async (resolve, reject) => {
            try {
                this.loader(true);
                await Realtime.post(`${this.constructor.dbName}/${this.userId}/${category.id}`, category);
                resolve(category);
            } catch (error) {
                reject(error);
            }
            finally {
                this.loader(false);
            }
        })
    }
    update(categoryId, category) {
        category.modified = Date.now();
        return new Promise(async (resolve, reject) => {
            try {
                this.loader(true);
                await Realtime.update(`${this.constructor.dbName}/${this.userId}/${categoryId}`, category);
                resolve(category);
            } catch (error) {
                reject(error);
            }
            finally {
                this.loader(false);
            }
        });
    }
    delete(categoryId) {
        return new Promise(async (resolve, reject) => {
            try {
                this.loader(true);
                await Realtime.delete(`${this.constructor.dbName}/${this.userId}/${categoryId}`);
                resolve(true);
            } catch (error) {
                reject(error);
            }
            finally {
                this.loader(false);
            }
        });
    }
    addChildListener(type, listener) {
        // type: ADDED, CHANGED, REMOVED;
        return Realtime.addChildListener(type, `${Category.dbName}/${this.userId}`, listener);
    }
    addValueListener(path = '', listener) {
        return Realtime.addValueListener(`${Category.dbName}/${this.userId}/${path}`, listener);
    }

}

export default Category;