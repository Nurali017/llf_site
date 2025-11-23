# Design Proposal: Multi-Branch Architecture

## **Concept: Unified Platform, Localized Experience**

The goal is to keep the same robust layout but dynamically switch the content based on the user's city (branch).

### **1. Global Context Switcher (The "City Selector")**
*   **Placement:** Top Navigation Bar (Header), prominently displayed.
*   **Design:** A sleek dropdown menu with a location icon.
    *   *Default State:* Shows "Astana" (or user's detected location).
    *   *Expanded State:* A clean list of all branches (Almaty, Shymkent, etc.).
*   **Behavior:** Selecting a city instantly updates the entire page context (Matches, News, Standings) without a full page reload (using client-side state or URL routing like `llf.kz/astana`).

### **2. Contextual Headers**
*   **Match Center:** When "Astana" is selected, the widget header will display **"Match Center: Astana • Championship RK"**. This gives immediate feedback that the data is relevant to their location.
*   **News Feed:** The news section will prioritize or filter articles tagged with the selected city.

### **3. Visual Cues**
*   We can add a subtle "City Badge" in the Hero section or near the logo to reinforce the local context.

---

**Implementation Steps:**
1.  **Header Update:** Add the City Selector component to `Header.tsx`.
2.  **State Management:** Introduce a global state (or URL parameter) to track the selected city.
3.  **Component Updates:** Modify `MatchWidget.tsx`, `NewsGrid.tsx`, and `Standings.tsx` to accept the selected city as a prop and display filtered data.
