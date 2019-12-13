const counter = () => import(/* webpackChunkName: "about" */ '../../example/counter/index');

const exampleRoute = [
    {
        path: 'Counter',
        component: counter
    }
];

export default exampleRoute;