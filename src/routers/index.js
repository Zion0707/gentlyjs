import React from 'react';
import Loadable from 'react-loadable';
const routers = [
    {
        path: '/',
        name: 'gentlyjs 首页',
        exact: true,
        component: Loadable({
            loader: () => import('@/pages/home'),
            loading: () => {
                return <div>loading</div>;
            },
        }),
        child: [],
    },
    {
        path: '/threejs',
        name: '3d场景',
        component: Loadable({
            loader: () => import('@/pages/threejs'),
            loading: () => {
                return <div>loading</div>;
            },
        }),
        child: [],
    },
];

export default routers;
