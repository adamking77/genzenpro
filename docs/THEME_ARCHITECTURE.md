# Plan: Astro Theme Structure and Organization

## I. Introduction

*   **Purpose:** To define a clear, maintainable, and reusable structure for the `gzs-astro-theme-new` project, enabling its use as an Astro theme.
*   **Scope:** This plan covers:
    1.  Reviewing the current project structure.
    2.  Identifying key exportable components and modules.
    3.  Outlining strategies for theme customization.
    4.  Defining the initial content for the main `README.md` file.

## II. Project Structure Review (`gzs-astro-theme-new/src/`)

*   **Current Structure Assessment:**
    The existing directory structure within `gzs-astro-theme-new/src/` is generally logical and aligns well with common Astro project conventions.
    *   `assets/`: Standard for static files. (Suitable for theme assets)
    *   `components/`: Well-organized with subdirectories for `ui`, `sections`, `layouts` (component-specific layouts), `interactive`, and `reports`. (Core theme components)
    *   `content/`: Standard for Astro content collections. (Example content)
    *   `data/`: Currently holds `reports.ts`. (Example data or theme defaults)
    *   `hooks/`: Contains React hooks. (Core theme utilities)
    *   `layouts/`: For primary page layouts. (Core theme layouts)
    *   `lib/`: Utility functions. (Core theme utilities)
    *   `pages/`: Example pages. (Demo content)
    *   `styles/`: Global stylesheets. (Core theme styles)

*   **Reorganization Suggestions:**
    *   The current structure is largely suitable. Clear export paths via `package.json` exports will be crucial.
    *   No immediate need for a dedicated `theme/` or `core/` subdirectory.

*   **Visualizing Theme Usage:**
    ```mermaid
    graph TD
        subgraph Theme: gzs-astro-theme-new
            direction LR
            src[src/]
            src --> assets[assets/]
            src --> comps[components/]
            comps --> ui[ui/]
            comps --> sections[sections/]
            comps --> compLayouts[layouts/ (component-layouts)]
            comps --> interactive[interactive/]
            src --> contentCfg[content/config.ts]
            src --> hooksDir[hooks/]
            src --> pageLayouts[layouts/ (page-layouts)]
            src --> libDir[lib/]
            src --> stylesDir[styles/]
        end

        subgraph Example Content (within Theme)
            direction LR
            src --> exampleContent[content/reports/ (example data)]
            src --> exampleData[data/reports.ts (example data)]
            src --> examplePages[pages/ (example pages)]
        end

        subgraph Theme User Project
            direction LR
            userApp[User's Astro Project]
            userApp --> userPages[pages/]
            userApp --> userComps[components/]
            userApp --> userLayouts[layouts/]
        end

        userPages -- imports --> pageLayouts
        userComps -- imports --> ui
        userComps -- imports --> sections
        userLayouts -- uses --> pageLayouts
        userApp -- configures --> stylesDir
        userApp -- references schema --> contentCfg
    ```

## III. Key Exportable Components/Modules

*   **Primary Page Layout (from `src/layouts/`):**
    *   `BaseLayout.astro`: This is the main, feature-rich layout for the theme, providing global styling, navigation, theme toggling, and structure for pages.
    *   (`Layout.astro` appears to be a basic, possibly deprecated, boilerplate and is not considered a primary exportable theme layout.)
*   **Core UI Components (from `src/components/ui/`):**
    *   `Button.tsx`
    *   `Card.tsx`
    *   `Dialog.tsx`
    *   `DropdownMenu.tsx`
    *   `Input.tsx`
    *   `NavigationMenu.tsx`
    *   `Sheet.tsx`
    *   `Textarea.tsx`
    *   Toast components: `Toast.tsx`, `Toaster.tsx`, `use-toast.ts`
*   **Key Section Components (from `src/components/sections/`):**
    *   `About.astro`
    *   `Contact.astro` / `Contact.tsx`
    *   `CTA.astro`
    *   `Footer.astro`
    *   `ReportsSection.astro`
    *   `Services.astro`
*   **Hero & Feature Section Components (currently in `src/components/layouts/`):**
    *   *Note: These components function as large, distinct sections. For theme clarity, consider if moving them to a subdirectory within `src/components/sections/` (e.g., `src/components/sections/heroes/`) would be beneficial in a future refactoring step. For now, they are key exportable theme elements.*
    *   `BookHero.astro`
    *   `BrandPlatform.astro`
    *   `Collections.astro`
    *   `CompanyHero.astro`
    *   `CompanyMission.astro`
    *   `ContentSplit.astro`
    *   `DataGrid.astro`
    *   `DataStory.astro`
    *   `FoundedStory.astro`
    *   `GridShowcase.astro`
    *   `HybridShowcase.astro`
    *   `MinimalList.astro`
    *   `SplitContent.astro`
    *   `Timeline.astro`
    *   `TypographicHero.astro`
*   **Interactive Components:**
    *   `src/components/ThemeToggle.tsx`
    *   `src/components/interactive/MobileNavSheet.tsx`
    *   `src/components/interactive/ScrollAnimator.tsx`
    *   `src/components/interactive/ScrollToTop.tsx`
*   **Utilities:**
    *   Key functions from `src/lib/utils.ts`
    *   Relevant hooks from `src/hooks/`
*   **Re-export Strategy (Simplifying Imports):**
    *   Create `index.ts` (or `.js`/`.astro` as appropriate) barrel files in key directories:
        *   `src/components/ui/index.ts`
        *   `src/components/sections/index.ts`
        *   `src/layouts/index.ts` (exporting `BaseLayout.astro`)
        *   `src/components/interactive/index.ts`
        *   `src/components/layouts/index.ts` (for the hero/feature sections, until potentially reorganized)
    *   This allows imports like `import { Button } from 'your-theme/ui';`.

## IV. Theme Customization Plan

*   **Styling:**
    *   **Tailwind CSS:** Users extend/modify their own `tailwind.config.mjs`.
    *   **Global CSS & CSS Variables:** Define core theme design tokens as CSS variables in `src/styles/global.css` for user overrides.
*   **Content (Site-specific text, images, links):**
    *   **Props-based Customization:** `BaseLayout.astro` and section components accept props for content.
    *   **Astro Content Collections:** Document schema from `src/content/config.ts`; users provide their own data.
    *   **Slots:** Utilize Astro slots for custom content injection.
*   **Data (Structured data for components):**
    *   Allow data via props; document expected structures (e.g., for `src/data/reports.ts`).
*   **Component Overriding/Shadowing:** Advanced users can copy and modify components.

## V. `README.md` Structure and Content (Plan for `gzs-astro-theme-new/README.md`)

The main `README.md` in `gzs-astro-theme-new/` should be updated with the following initial content:

```markdown
# GZS Astro Theme (Working Title)

A modern, flexible, and reusable Astro theme designed for [describe target use-case, e.g., corporate sites, portfolios, blogs]. This theme provides a collection of well-crafted components, layouts, and styling defaults to kickstart your Astro project.

## Installation

*(Placeholder)*

Detailed instructions on how to integrate this theme into your new or existing Astro project will be provided here once the theme is packaged. This will likely involve installing an npm package and some initial configuration.

**Example (Conceptual):**

\`\`\`bash
npm install gzs-astro-theme
# or
yarn add gzs-astro-theme
# or
pnpm add gzs-astro-theme
\`\`\`
Then, configure \`astro.config.mjs\` if needed.

## Usage

*(Placeholder)*

This section will guide you on how to use the core features of the theme:

*   **Layouts:** How to use \`BaseLayout.astro\`.
    *   Example: \`import BaseLayout from 'gzs-astro-theme/layouts/BaseLayout.astro';\`
*   **Components:** Importing and using UI components (buttons, cards, etc.) and section components.
    *   Example: \`import { Button } from 'gzs-astro-theme/components/ui';\`
    *   Example: \`import { CompanyHero } from 'gzs-astro-theme/components/sections';\` (assuming re-export and potential reorg)
*   **Content Collections:** Information on using the predefined content schemas (e.g., for reports).

## Customization

*(Placeholder)*

Learn how to tailor the theme to your specific needs:

*   **Styling:**
    *   **Tailwind CSS:** How to extend or override the theme's Tailwind configuration.
    *   **CSS Variables:** A list of available CSS variables and how to override them.
*   **Content:**
    *   **Props:** Customizing components and layouts by passing props.
    *   **Slots:** Using Astro slots to inject custom content.
    *   **Content Collections:** Replacing or extending example content.
*   **Data:** Providing custom data to components.

---

*This theme is currently under development.*