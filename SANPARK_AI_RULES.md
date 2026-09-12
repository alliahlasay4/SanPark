# SanPark — AI Development Rules

## 1. Purpose

SanPark is a web application designed to provide a simple and user-friendly parking-related experience.

When working on SanPark, prioritize:

1. Usability
2. Clarity
3. Simplicity
4. Consistency
5. Maintainability
6. Existing functionality
7. Minimal unnecessary changes

The application should feel like a real production system, not an unnecessarily complicated AI-generated project.

---

## 2. General AI Behavior

Before making changes:

* Understand the specific task.
* Inspect only the files relevant to the task.
* Check how the existing implementation works before replacing it.
* Reuse existing components, functions, styles, routes, and logic whenever appropriate.
* Make the smallest reasonable change that fully solves the requested problem.
* Do not rewrite working functionality without a clear reason.
* Do not create new functionality that was not requested.
* Do not make assumptions about requirements when the existing project already provides the answer.

Do NOT:

* Refactor the entire project for a small feature.
* Rename unrelated files.
* Change unrelated components.
* Replace working libraries without a reason.
* Introduce unnecessary dependencies.
* Create duplicate components.
* Create duplicate pages.
* Create unnecessary routes.
* Add unnecessary animations or visual effects.
* Add features simply because they "might be useful."

---

## 3. Token & Context Efficiency

When completing a task, be efficient with project inspection.

### Inspect only what is relevant.

For example:

If the task is about the landing page:

Inspect:

* LandingPage.jsx
* Its directly related components
* Relevant routing/navigation
* Relevant styling

Do NOT automatically inspect the entire project.

If the task is about authentication:

Inspect:

* Authentication pages/components
* Authentication logic
* Relevant routes
* Relevant state/session handling

Do NOT inspect unrelated admin features, database models, or pages unless they directly affect the task.

### Do not repeatedly rediscover information.

If a file or component has already been identified as relevant, reuse that understanding.

### Avoid unnecessary explanations.

When reporting completed work, summarize:

* What changed
* Which files were changed
* Any important implementation notes
* Any remaining issues

Do not provide long explanations about simple changes.

---

## 4. UI Standards & Stable Design Rules

### Overall Design Style
* **Aesthetic:** Modern, sleek, dark-mode-first aesthetic with a high-contrast, professional feel. Avoid flashy gimmicks, excessive glows, or visual clutter.
* **Surfaces:** Use clean dark base layers with subtly elevated surface containers for cards and panels. Cards should have clean, understated borders rather than heavy drop shadows.
* **Purposeful UI:** Every UI element must serve an operational purpose. Do not add decorative badges, extraneous icons, placeholder statistics, or complex animations. Keep transitions fast (150–200ms ease-out) and limited to functional states (hover, focus, modals).

### Color & Typography Rules
* **Theme Roles:**
  * Use the established design system tokens and variables for backgrounds, surfaces, text, and borders.
  * Reserve the primary accent color strictly for primary call-to-actions, brand marks, active selection indicators, and critical alerts.
  * Secondary and neutral surfaces must support legibility without competing with primary actions.
  * Semantic indicators (available, limited, occupied, error) should follow standard conventions using the project's existing theme tokens.
* **Typography:**
  * Clean, geometric sans-serif typeface hierarchy.
  * Maintain strict contrast standards (WCAG AA compliance) across all text levels. Ensure primary text, secondary text, and interactive labels are clearly distinguishable against their background surfaces.

### Navbar Conventions
* **Position & Appearance:** Fixed or sticky top navigation with subtle backdrop blur over container surfaces.
* **State Continuity:**
  * **Guest State:** Displays the SanPark brand, landing section anchor links (e.g., *Find Parking*, *How It Works*, *Locations*), a text/ghost link for "Log In", and a primary-styled action button for "Register" / "Get Started".
  * **User State:** Hides guest auth buttons. Shows active reservation shortcuts, user profile pill/avatar, and a dropdown containing "My Bookings" and "Log Out".
  * **Admin State:** Displays an explicit "Admin Console" badge with dedicated links to slot manager and system settings.
* **Mobile Handling:** Collapses cleanly into a responsive menu drawer without pushing or breaking horizontal layout bounds.

### Authentication UX Conventions
* Maintain three distinct, unmixed states: **Guest**, **User**, and **Admin**.
* Keep authentication flows predictable:
  * Guest attempts to reserve → prompt modal or route to `/login` with clean return redirect.
  * Never flash authenticated states or dashboard elements while validating tokens or initial route guards.
* **Post-Logout Behavior:**
  * Immediately wipe session tokens, active slots, and user caches.
  * Redirect to the public landing page in its clean **Guest** view.
  * Do not auto-redirect logged-out visitors back to the `/login` screen.

### Don't Use Jargon
* All user-facing copy must use plain, conversational language suitable for drivers and parkers.
* Use clear, standard terms:
  * Use **"Log In"**, not *"Authenticate Credentials"* or *"Session Handshake"*.
  * Use **"Create Account"**, not *"User Entity Provisioning"*.
  * Use **"Available Slots"**, not *"Unallocated Inventory Units"*.
  * Use **"Find Parking"**, not *"Execute Geolocation Query"*.
  * Use **"Check your email"**, not *"Verification Token Dispatched via SMTP"*.
  * Use **"Passwords don't match"**, not *"Payload confirmation validation failure"*.
* Never expose raw database errors, HTTP status code jargon, or technical stack traces to the user.

### General Landing-Page Structure
The public landing page must follow a single, cohesive vertical story without fragmenting into extra pages:
1. **Hero Section:** Clear value headline (e.g., instant mall parking), concise sub-copy, and an immediate search/filter input for target malls or locations.
2. **Real-Time Capacity Tracker:** Visual overview of featured locations with live slot counts and instant availability status pills.
3. **How It Works:** 3 to 4 sequential steps outlining the core flow: Search → Reserve → Navigate → Park.
4. **Features & Benefits:** Clean grid highlighting contactless entry, real-time sync, and secured spots.
5. **Supported Locations:** Clean list or cards showing covered venues and parking zones.
6. **Footer:** Contact details, basic platform links, and copyright notice.

---

## 5. Architectural & Scope Guardrails

### Prefer Existing Components
* Before authoring new buttons, form fields, modal containers, or card layouts, inspect the component library/directory.
* Extend existing components using props (e.g., adding a `variant="secondary"` or `size="sm"`) rather than creating parallel implementations like `CustomButton.jsx` or `CustomInput.jsx`.

### Don't Create Unnecessary Pages
* Keep landing page sub-sections as anchored IDs within `LandingPage.jsx` (`#find-parking`, `#how-it-works`, `#features`, `#contact`).
* Do NOT create separate files or routes like `Home.jsx`, `Features.jsx`, or `ContactUs.jsx` for landing page sections.
* Reserve dedicated routes exclusively for distinct standalone applications (e.g., `/login`, `/register`, `/dashboard`, `/admin`).

### Don't Modify Unrelated Functionality
* Limit file modifications strictly to the assigned scope.
* Never touch unrelated components, database schemas, mock fixtures, API endpoint signatures, or global stores during small feature additions or bug fixes.
* Verify shared utility functions retain full backwards compatibility before making any changes.

---

## 6. Responsive Design Standards

All UI elements must perform reliably across three standard responsive tiers:
* **Mobile (<640px):**
  * Single-column vertical stacks.
  * Minimum touch target size of 44x44px for buttons, pills, and inputs.
  * Inputs and action buttons expand to full width (`w-full`).
  * Navigation transitions into a clean slide-out drawer or overlay.
* **Tablet (641px–1024px):**
  * 2-column card layouts; forms centered with comfortable max-widths.
* **Desktop (>1025px):**
  * Constrained container widths (`max-w-7xl` or equivalent) with balanced negative space to prevent content stretching on ultrawide monitors.
* Never shrink desktop layouts down without restructuring; stack grids naturally to eliminate horizontal scrolling.

---

## 7. Forms & Error Handling

* Form inputs must feature clear labels, sensible placeholder guidance, and proper input types (`email`, `password`, `tel`).
* Form validation must be inline, specific, and actionable:
  * State exactly what is required (e.g., *"Enter a valid 6-digit reservation code"*).
* Display loading indicators inside submitted action buttons to prevent repeated double-submissions.
* Always sanitize client-side form values before transmission.

---

## 8. Security & Dependencies

* Never hardcode API keys, secrets, test tokens, or admin bypass credentials in the frontend codebase.
* Do not install third-party NPM packages for simple tasks that can be accomplished with standard React/JS utilities or existing project dependencies.

---

## 9. AI Decision-Making & Ambiguity

When there are multiple reasonable implementation options, choose the option that is:
1. Simplest
2. Consistent with existing SanPark conventions
3. Easiest to maintain
4. Least disruptive
5. Most user-friendly

If an ambiguity is minor:
* Make the simplest, least disruptive assumption.
* Proceed with the implementation.
* Explicitly note the assumption in the completion summary.

If an ambiguity risks project stability, ask for clarification.

---

## 10. Final Response Format

When completing a task, always summarize using this format:

### Changed
* Concise summary of the updates made.

### Files
* List of files added or modified.

### Notes
* Critical implementation details, design alignment notes, or minor assumptions made.

### Testing
* Summary of verified flows (e.g., responsive viewport checks, guest/user auth state checks, form validations).

---

## 11. Most Important Rule

**Do not over-engineer SanPark.**

Make the smallest clean change that solves the requested problem while preserving the existing application.

When in doubt:

**Reuse → Simplify → Preserve → Implement**