# Claude Code Prompt: Build GenZen Pro Site with Astro Swiss Theme

## Project Overview
Create a new Astro static site for GenZen Pro using the existing astro-swiss-theme repository. The site should be clean, professional, and error-free, mapping provided content to existing theme components.

## Repository & Setup
1. **Clone the theme repository**: https://github.com/adamking77/astro-swiss-theme
2. **Examine the repository structure** to identify all available:
   - Layouts (BaseLayout, etc.)
   - Components (Button, Hero, FeatureGrid, etc.)
   - UI elements and sections
   - Example pages and content structure

## Brand Colors Integration
Update the theme to use these GenZen Pro brand colors:
- **Primary text**: #222222 (light mode font color)
- **Accent color**: #2c4863 (primary accent)
- **Background light**: #f4f4f5
- **Background neutral**: #ededed

Apply these colors to:
- Tailwind config overrides
- CSS variables
- Component styling where appropriate

## Content Mapping Strategy
Map the GenZen Pro content sections to available theme components:

### Hero Section
- **Eyebrow text**: "The Decisive Edge in Critical Communications"
- **Main heading**: "Strategic Communication Design for High-Stakes Situations"
- **Subheading**: "When Critical Conversations Feel Like Traps"
- **CTA Button**: "Apply For Your Power Dynamics Blueprint"

### Problem Section
- **Heading**: "When Success Becomes Vulnerability"
- Content about achievements being weaponized
- Use available card/feature components if available

### Gap Analysis Section
- **Heading**: "The Critical Gap in Protection"
- List of why traditional advisors fail
- Use list/feature components

### Solution Section
- **Heading**: "Strategic Communication Design"
- Description of the Autonomy Intelligence approach
- Use available feature/content components

### Case Study Section
- **Heading**: "The Extraction Protocol"
- Case study content
- Use testimonial/case study components if available

### Process Section (3 Phases)
- **Heading**: "Strategic Protection Process"
- Phase 01: Power Dynamics Blueprint
- Phase 02: Protection Framework
- Phase 03: Strategic Implementation
- Use step/process components if available

### Framework Section (4 Points)
- **Heading**: "The Strategic Protection Framework"
- 4 numbered points about Communication Architecture, Real-Time Support, etc.
- Use grid/feature components

### About Section
- **Heading**: "Adam King: Founder & Chief Strategist"
- Founder bio content
- Use about/profile components if available

### Final CTA Section
- **Heading**: "Apply For Your Power Dynamics Blueprint"
- Application details and benefits
- Use CTA/contact components

## Technical Requirements
1. **Use only existing components** - don't build new ones
2. **Maintain responsive design** from the theme
3. **Ensure error-free build** - test compilation
4. **Follow theme's component patterns** exactly
5. **Keep styling consistent** with theme architecture

## Implementation Steps
1. Clone and examine the astro-swiss-theme repository
2. Create a new page (index.astro) using BaseLayout
3. Import and use only available components from the theme
4. Map content sections to the closest matching components
5. Apply brand colors through theme customization methods
6. Test build for errors
7. Ensure responsive functionality works

## Content Guidelines
- Keep all copy exactly as provided
- Maintain professional, strategic tone
- Preserve the specific structure and hierarchy
- Use theme's typography and spacing systems

## Deliverable
A complete, functional Astro site that:
- Uses the astro-swiss-theme components exclusively
- Displays all GenZen Pro content properly
- Applies the brand colors consistently
- Builds without errors
- Maintains responsive design
- Follows the theme's established patterns

Start by examining the repository structure and available components, then create a mapping plan before implementation.