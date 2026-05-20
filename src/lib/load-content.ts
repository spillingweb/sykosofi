import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export interface PageContent {
  title: string
  subtitle?: string
  intro?: string
  body: string
}

/**
 * Load a markdown page from the content/pages directory
 */
export async function loadPage(slug: string): Promise<PageContent> {
  const filePath = path.join(process.cwd(), 'content', 'pages', `${slug}.md`)
  
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    
    return {
      title: data.title || '',
      subtitle: data.subtitle,
      intro: data.intro,
      body: content,
    }
  } catch (error) {
    console.error(`Failed to load page: ${slug}`, error)
    throw new Error(`Page not found: ${slug}`)
  }
}
