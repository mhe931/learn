# GEMINI.MD - Project Documentation for Future Self

## Overview
This project, **"ADA Zero-to-Hero"**, is a bilingual (English/Persian) self-study guide for Advanced Data Architecture. It uses a **monolingual directory strategy** where English files reside in `/ada/` and Persian files reside in `/ada/persian/`.

## Key Features
1.  **Bilingual Support**:
    *   **English**: Default entry point (`/ada/index.html`). LTR.
    *   **Persian**: Dedicated subdir (`/ada/persian/`). RTL (`dir="rtl"`). Custom font (`Vazirmatn`).
    *   **Deep Linking**: Sidebar links navigate to the *exact same page* in the other language.

2.  **Tech Stack**:
    *   **HTML5 & CSS3**: No frameworks (React/Next.js) unless requested.
    *   **Style.css**: Shared stylesheet. Includes Dark Mode, Neon/Gold styling, and `[dir="rtl"]` overrides for Persian layout keying off the HTML attribute.
    *   **Icons**: Font Awesome 6.6.0.

3.  **Educational Requirements (Mandatory)**:
    *   **"Why This Matters"**: Every chapter starts with this section.
    *   **Exam Points**: Specific questions/answers (e.g., Data Vault, High Risk AI) are highlighted in `.exam-point` boxes.
    *   **Bold Gold**: Key terms and correct answers use `#FFD700`.

## File Structure
- `ada/`
  - `index.html`: Course Homepage (EN)
  - `modeling.html`: Data Models (Inmon/Kimball/Vault/Anchor) + Kimball Map.
  - `mesh-fabric.html`: Mesh Pillars + Active Metadata.
  - `ai-architecture.html`: GenAI Evolution + MCP.
  - `governance.html`: EU AI Act + ISO 42001.
  - `style.css`: Main styles.
- `ada/persian/`
  - *Mirrors all HTML files above, fully translated.*

## Content Notes
- **Data Vault**: Hubs, Links, Satellites (Answer: Data Vault).
- **Anchor**: 6th Normal Form (Answer).
- **EU AI Act**: Credit Scoring = High Risk.
- **MCP**: The "USB-C" or "Universal Adapter" for A2A.
- **Kimball**: Bus Matrix & Conformed Dimensions.

## Future Maintenance
- When adding a new page, create it in `/ada/` first, then clone to `/ada/persian/`.
- Translate content but keep the HTML structure identical.
- Ensure `style.css` updates respect the `[dir="rtl"]` overrides at the bottom of the file.
