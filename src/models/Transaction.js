import Realtime from '../serverConfig/Realtime.js';
import uniqueId from '../helpers/uniqueId.js';


class TransactionModal {
    static dbName = 'transactions';
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
    get(topicId) {
        return new Promise(async (resolve, reject) => {
            try {
                this.loader(true);
                const res = await Realtime.get(`${this.constructor.dbName}/${this.userId}/${topicId}`);
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
    post(transaction) {
        let date = Date.now();
        transaction.id = uniqueId();
        transaction.time = date;

        return new Promise(async (resolve, reject) => {
            try {
                this.loader(true);
                await Realtime.post(`${this.constructor.dbName}/${this.userId}/${transaction.id}`, transaction);
                resolve(transaction);
            } catch (error) {
                reject(error);
            }
            finally {
                this.loader(false);
            }
        })
    }
    update(topicId, topic) {
        topic.modified = Date.now();
        return new Promise(async (resolve, reject) => {
            try {
                this.loader(true);
                await Realtime.update(`${this.constructor.dbName}/${this.userId}/${topicId}`, topic);
                resolve(topic);
            } catch (error) {
                reject(error);
            }
            finally {
                this.loader(false);
            }
        });
    }
    delete(transaction) {
        return new Promise(async (resolve, reject) => {
            try {
                this.loader(true);
                await Realtime.delete(`${this.constructor.dbName}/${this.userId}/${transaction}`);
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
        return Realtime.addChildListener(type, `${TransactionModal.dbName}/${this.userId}`, listener);
    }
    addValueListener(path = '', listener) {
        return Realtime.addValueListener(`${TransactionModal.dbName}/${this.userId}/${path}`, listener);
    }

}

export default TransactionModal;