export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"C:/Users/Administrator/Documents/WorkSpace/web/vuepress-blog/docs/README.md"), meta: {} }],
  ["/pages/about.html", { loader: () => import(/* webpackChunkName: "pages_about.html" */"C:/Users/Administrator/Documents/WorkSpace/web/vuepress-blog/docs/pages/about.md"), meta: {} }],
  ["/pages/archive.html", { loader: () => import(/* webpackChunkName: "pages_archive.html" */"C:/Users/Administrator/Documents/WorkSpace/web/vuepress-blog/docs/pages/archive.md"), meta: {} }],
  ["/pages/categories.html", { loader: () => import(/* webpackChunkName: "pages_categories.html" */"C:/Users/Administrator/Documents/WorkSpace/web/vuepress-blog/docs/pages/categories.md"), meta: {} }],
  ["/pages/tags.html", { loader: () => import(/* webpackChunkName: "pages_tags.html" */"C:/Users/Administrator/Documents/WorkSpace/web/vuepress-blog/docs/pages/tags.md"), meta: {} }],
  ["/posts/2026-08-19-hello-world.html", { loader: () => import(/* webpackChunkName: "posts_2026-08-19-hello-world.html" */"C:/Users/Administrator/Documents/WorkSpace/web/vuepress-blog/docs/posts/2026-08-19-hello-world.md"), meta: {} }],
  ["/posts/2026-08-20-vuepress-setup.html", { loader: () => import(/* webpackChunkName: "posts_2026-08-20-vuepress-setup.html" */"C:/Users/Administrator/Documents/WorkSpace/web/vuepress-blog/docs/posts/2026-08-20-vuepress-setup.md"), meta: {} }],
  ["/posts/2026-08-21-markdown-guide.html", { loader: () => import(/* webpackChunkName: "posts_2026-08-21-markdown-guide.html" */"C:/Users/Administrator/Documents/WorkSpace/web/vuepress-blog/docs/posts/2026-08-21-markdown-guide.md"), meta: {} }],
  ["/posts/2026-08-22-code-demo.html", { loader: () => import(/* webpackChunkName: "posts_2026-08-22-code-demo.html" */"C:/Users/Administrator/Documents/WorkSpace/web/vuepress-blog/docs/posts/2026-08-22-code-demo.md"), meta: {} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"C:/Users/Administrator/Documents/WorkSpace/web/vuepress-blog/docs/.vuepress/.temp/pages/404.html.vue"), meta: {} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  __VUE_HMR_RUNTIME__.updateRoutes?.(routes)
  __VUE_HMR_RUNTIME__.updateRedirects?.(redirects)
}

if (import.meta.hot) {
  import.meta.hot.accept((m) => {
    __VUE_HMR_RUNTIME__.updateRoutes?.(m.routes)
    __VUE_HMR_RUNTIME__.updateRedirects?.(m.redirects)
  })
}
