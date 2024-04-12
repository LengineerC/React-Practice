import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/exp3_new_pages/index' },
    { path:'/exp1', component: '@/exp1_pages/index.jsx' },
    { path:'/exp2', component: '@/exp2_pages/index.jsx' },
    { path:'/exp3-old', component: '@/exp3_pages/index.jsx' },
  ],
  fastRefresh: {},
});
