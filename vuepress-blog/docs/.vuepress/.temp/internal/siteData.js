export const siteData = JSON.parse("{\"base\":\"/\",\"lang\":\"zh-CN\",\"title\":\"码霖汤姆的博客\",\"description\":\"个人技术博客\",\"head\":[[\"link\",{\"rel\":\"icon\",\"href\":\"/favicon.svg\"}]],\"locales\":{\"/\":{\"lang\":\"zh-CN\",\"title\":\"码霖汤姆的博客\",\"description\":\"个人技术博客\"}}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  __VUE_HMR_RUNTIME__.updateSiteData?.(siteData)
}

if (import.meta.hot) {
  import.meta.hot.accept((m) => {
    __VUE_HMR_RUNTIME__.updateSiteData?.(m.siteData)
  })
}
