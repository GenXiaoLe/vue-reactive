// export { effect } from './effect';

// // 计算属性
// const computed = function(fn) {
//     const runner = effect(fn, { computed: true, lazy: true });

//     return {
//         effect: runner,
//         get value() {
//             return runner();
//         }
//     };
// };

// export { computed }