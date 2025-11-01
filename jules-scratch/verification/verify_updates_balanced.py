from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:3000/Bagginsite/", wait_until="networkidle")

        # Wait for the "Recent Updates" heading to be visible
        updates_heading = page.locator('h2:has-text("Recent Updates")')
        updates_heading.wait_for(state='visible', timeout=10000)

        # Scroll down to the updates section
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

        # Wait for at least one GitHub icon to be visible
        github_icon = page.locator('a > svg').first
        github_icon.wait_for(state='visible', timeout=10000)

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/updates_balanced.png")

        browser.close()

if __name__ == "__main__":
    run()
