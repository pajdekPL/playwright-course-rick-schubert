import { Page } from "@playwright/test"

export function isDesktopViewPort(page: Page) {
    const pageSize = page.viewportSize()
    return pageSize.height >= 600 && pageSize.width >= 600
}