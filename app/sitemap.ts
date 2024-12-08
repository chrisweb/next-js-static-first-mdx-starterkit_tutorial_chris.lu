import { MetadataRoute } from 'next'
import path from 'node:path'
import fs from 'node:fs'
import { glob } from 'glob'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'

declare module 'vfile' {
    interface DataMap {
        matter: {
            modified?: string
            permalink?: string
        }
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const defaultDate = 'August 12, 2024'

    const siteMap: MetadataRoute.Sitemap = [{
        url: 'https://example.com',
        lastModified: new Date(defaultDate),
        changeFrequency: 'weekly',
        priority: 1,
    }]

    const mainPages = await glob('app/**/page.mdx', { maxDepth: 4 })

    mainPages.map((page) => {

        const pagePath = path.join(process.cwd(), page)

        const pageContent = fs.readFileSync(pagePath, 'utf8')

        const vfile = new VFile(pageContent)

        matter(vfile, { strip: true })

        const frontmatter = vfile.data.matter

        const pageUrl = 'https://example.com' + page.replace('app', '').replaceAll('\\', '/').replace('/page.mdx', '')

        siteMap.push({
            url: frontmatter?.permalink ? frontmatter.permalink : pageUrl,
            lastModified: frontmatter?.modified ? new Date(frontmatter.modified) : new Date(defaultDate),
            changeFrequency: 'weekly',
            priority: 0.9,
        })
    })

    return siteMap

}