import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/exp3_pages/indexNew.jsx' },
    { path:'/exp1', component: '@/exp1_pages/index.jsx' },
    { path:'/exp2', component: '@/exp2_pages/index.jsx' },
    { path:'/table', component: '@/exp3_pages/App.jsx' },
  ],
  fastRefresh: {},
});
