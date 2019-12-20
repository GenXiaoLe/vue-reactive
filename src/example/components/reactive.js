import { track, tirgger } from './effect';

// 双向验证传入数据类型
let toRaw = new WeakMap();
let toProxy = new WeakMap();

// 判断是否为对象类型
let isObject = function(obj) {
    return typeof obj === 'object' || obj === null;
};

const createReactive = function(target) {
    let observed = toProxy.get(target);

    if (observed) {
        return observed;
    }

    if (toRaw.has(target)) {
        return target;
    }

    observed = new Proxy(target, {
        get: (_target, _key, _receiver) => {
            const _res = Reflect.get(_target, _key, _receiver);

            track(_target, _key);

            return isObject(_res) ? createReactive(_res) : _res;
        },
        set: (_target, _key, _value, _receiver) => {
            const _res = Reflect.set(_target, _key, _value, _receiver);
            tirgger(_target, _key, _value);
            return _res;
        }
    });

    toProxy.set(target, observed);
    toRaw.set(observed, target);

    return observed;
}

export default createReactive;