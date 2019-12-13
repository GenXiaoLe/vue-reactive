

// 创建effect并关联proxy
// 中间件
const effectStack = [];
// 副作用函数
const effect = function(fn, options = {}) {
    const _effect = createReactiveEffect(fn, options);

    if (!options.lazy) {
        _effect();
    }

    return _effect;
};
const createReactiveEffect = function(fn, options) {
    const _effect = function(...args) {
        return run(_effect, fn, args);
    };

    _effect.deps = [];
    _effect.options = options;
    return _effect;
};
const run = function(effect, fn, args) {
    if (!effectStack.includes(effect)) {
        try {
            effectStack.push(effect);
            return fn(...args);
        } finally {
            effectStack.pop();
        }
    }
};

let targetMap = new WeakMap();
const track = function(_target, _key) {
    const _effect = effectStack[effectStack.length - 1];
    if (!_effect) {
        return;
    }

    let depsMap = targetMap.get(_target);

    if (!depsMap) {
        targetMap.set(_target, (depsMap = new Map()));
    }

    let dep = depsMap.get(_key);

    if (!dep) {
        depsMap.set(_key, (dep = new Set()));
    }

    if (!dep.has(_effect)) {
        dep.add(_effect);
    }
};

// 发送事件
const tirgger = function(_target, _key, _value) {
    let depsMap = targetMap.get(_target);
    if (!depsMap) {
        return null;
    }

    let dep = depsMap.get(_key);
    if (!dep) {
        return null;
    }

    let effects = new Set();
    let computeds = new Set();
    dep.forEach(_effect => {
        if (_effect) {
            if (_effect.options.computed) {
                computeds.add(_effect);
            }
            effects.add(_effect);
        }
    });

    effects.forEach(_effect => _effect(_target, _key, _value));
    computeds.forEach(_effect => _effect(_target, _key, _value));
};


export { effect, track, tirgger };