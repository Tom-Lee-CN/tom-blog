import { computed } from 'vue'
import { useSiteData, usePageData } from 'vuepress/client'

// 文章数据组合式函数
// 从站点数据中提取文章列表，按日期倒序排列
export function usePosts() {
  const siteData = useSiteData()
  const pageData = usePageData()

  // 所有页面中属于 posts 目录的文章
  const posts = computed(() => {
    const pages = siteData.value.pages || []
    return pages
      .filter((page) => page.path.startsWith('/posts/'))
      .sort((a, b) => {
        const dateA = a.frontmatter?.date || ''
        const dateB = b.frontmatter?.date || ''
        return String(dateB).localeCompare(String(dateA))
      })
  })

  // 当前文章（详情页）
  const currentPost = computed(() => pageData.value)

  return {
    posts,
    currentPost
  }
}
