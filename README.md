# Resonance Labs
## From standard to implementation

**Resonance Labs** provides production-aligned implementation examples that demonstrate how accessibility criteria translate into real, usable interactions. By bridging theory and practice, it accelerates understanding, supports validation, and promotes scalable adoption of inclusive pattern


This repository contains **accessible web UI components** with live demos and source code.
Each component is self-contained with HTML, CSS, and JS for easy learning and reuse.

---

## Components

| Component | Description | Demo Link |
|---|---|---|
| Accordion | Expandable sections that show and hide content panels | [Live Demo](https://accenture.github.io/resonance-labs/components/accordion/index.html) |
| Autocomplete | Text input with filtered suggestions as the user types | [Live Demo](https://accenture.github.io/resonance-labs/components/autocomplete/index.html) |
| Breadcrumbs | Navigation trail showing the user's location in a hierarchy | [Live Demo](https://accenture.github.io/resonance-labs/components/breadcrumbs/index.html) |
| Button | Clickable element that triggers an action or submits a form | [Live Demo](https://accenture.github.io/resonance-labs/components/button/index.html) |
| Card | Contained surface for related content and actions | [Live Demo](https://accenture.github.io/resonance-labs/components/card/index.html) |
| Card List | A collection of cards displayed as a navigable list | [Live Demo](https://accenture.github.io/resonance-labs/components/card-list/index.html) |
| Carousel | Rotating set of slides with navigation controls | [Live Demo](https://accenture.github.io/resonance-labs/components/carousel/index.html) |
| Checkbox | Toggle control for selecting one or more options | [Live Demo](https://accenture.github.io/resonance-labs/components/checkbox/index.html) |
| Combobox | Input with a dropdown list that supports typing and selection | [Live Demo](https://accenture.github.io/resonance-labs/components/combobox/index.html) |
| Dropdown | Menu that appears on trigger, presenting a list of actions | [Live Demo](https://accenture.github.io/resonance-labs/components/dropdown/index.html) |
| Link | Inline navigation element that takes users to another page or section | [Live Demo](https://accenture.github.io/resonance-labs/components/link/index.html) |
| Mega Navigation | Large multi-column dropdown for complex site navigation | [Live Demo](https://accenture.github.io/resonance-labs/components/mega-navigation/index.html) |
| Modal | Dialog overlay that requires user interaction before continuing | [Live Demo](https://accenture.github.io/resonance-labs/components/modal/index.html) |
| Password Input Toggle | Password field with a show/hide toggle for visibility | [Live Demo](https://accenture.github.io/resonance-labs/components/password-input-toggle/index.html) |
| Progress Bar | Visual indicator showing completion status of a task | [Live Demo](https://accenture.github.io/resonance-labs/components/progress-bar/index.html) |
| Radio Button | Selection control for choosing one option from a group | [Live Demo](https://accenture.github.io/resonance-labs/components/radio-button/index.html) |
| Search Input | Text field designed for search queries with clear action | [Live Demo](https://accenture.github.io/resonance-labs/components/search-input/index.html) |
| Select | Dropdown control for choosing a single value from a list | [Live Demo](https://accenture.github.io/resonance-labs/components/select/index.html) |
| Table | Structured data display organized in rows and columns | [Live Demo](https://accenture.github.io/resonance-labs/components/table/index.html) |
| Tabs | Tabbed interface for switching between content panels | [Live Demo](https://accenture.github.io/resonance-labs/components/tabs/index.html) |
| Text Input | Single-line field for entering freeform text | [Live Demo](https://accenture.github.io/resonance-labs/components/text-input/index.html) |
| Toggle Switch | On/off control for binary settings | [Live Demo](https://accenture.github.io/resonance-labs/components/toggle-switch/index.html) |
| Tooltip | Contextual popup that appears on hover or focus | [Live Demo](https://accenture.github.io/resonance-labs/components/tooltip/index.html) |
| Video | Embedded media player with accessible controls | [Live Demo](https://accenture.github.io/resonance-labs/components/video/index.html) |

---

## How to Use

1. Clone the repository:

```bash
git clone https://github.com/Accenture/resonance-labs.git
```

2. Start a local HTTP server from the project root:

**macOS / Linux** (Python is pre-installed):

```bash
cd resonance-labs
python3 -m http.server 8080
```

**Windows** (Python):

```bash
cd resonance-labs
python -m http.server 8080
```

**Alternative — Node.js** (any platform):

```bash
npx http-server -p 8080
```

3. Open [http://localhost:8080](http://localhost:8080) in your browser.

No build tools or frameworks required — everything runs with vanilla HTML, CSS, and JS.
A local server is needed because components are loaded via `fetch()`, which requires HTTP.

---

## Project Structure

```
├── index.html              # Front page with component grid
├── styles.css              # Front page styles
├── assets/
│   ├── style/global.css    # Shared styles across all components
│   └── images/             # Logos, icons, and banner artwork
└── components/
    └── <component-name>/
        ├── index.html      # Demo page with code preview
        ├── <name>.html     # Component markup fragment
        ├── <name>.css      # Component styles
        └── <name>.js       # Component behaviour
```

---

Created and maintained by **Accenture Song**
