# jacbook pro 🧑‍🚀

A macOS-style interactive desktop portfolio built with React, TypeScript, and Vite. Explore projects, ideas, and links through an immersive desktop experience.

## Features

- 🖥️ macOS-inspired desktop interface
- 📁 Interactive folder widgets
- 📝 Note widgets for lists
- 🎯 Draggable windows and widgets
- 🎬 Video background
- 📱 Responsive design with mobile fallback

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **@dnd-kit** for drag and drop functionality

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd jacbook
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── features/
│   └── desktop/
│       ├── center-canvas/     # Main desktop area
│       ├── top-navigation/    # Menu bar
│       ├── bottom-dock-apps/  # Dock applications
│       └── hooks/              # Custom hooks
├── data/                      # App and widget data
└── assets/                     # Images, videos, etc.
```

## Adding Apps and Widgets

### Adding Dock Apps

Dock apps appear in the bottom dock bar. Edit `src/data/apps-data.ts` to add new apps.

#### App Types

1. **Popup** - Opens a modal window with description text
2. **Link** - Opens URL in a new tab
3. **Iframe** - Embeds a URL in a popup window
4. **Component-Popup** - Opens a modal window with a custom React component

#### Example: Adding a Popup App

```typescript
{
  id: "unique-id",           // Unique identifier (required)
  label: "App Name",          // Display name (required)
  emoji: "🎯",                // Emoji icon (required)
  type: "popup",              // "popup" | "link" | "iframe" (required)
  description: "Description text shown in the popup", // Required for popup type
}
```

#### Example: Adding a Link App

```typescript
{
  id: "linkedin",
  label: "LinkedIn",
  emoji: "💼",
  type: "link",
  url: "https://linkedin.com/in/yourprofile", // Required for link type
}
```

#### Example: Adding an Iframe App

```typescript
{
  id: "notion-page",
  label: "My Notes",
  emoji: "📝",
  type: "iframe",
  url: "https://notion.so/your-page", // Required for iframe type
}
```

#### Example: Adding a Component-Popup App

```typescript
import MyCustomComponent from "../features/desktop/bottom-dock-apps/dock-apps/my-app/MyCustomComponent";

{
  id: "my-custom-app",
  label: "My Custom App",
  emoji: "🎨",
  type: "component-popup",
  component: MyCustomComponent, // Required for component-popup type
}
```

**Steps:**
1. Create your component in `src/features/desktop/bottom-dock-apps/dock-apps/<app-name>/`
2. Import the component in `apps-data.ts`
3. Add the app to the `DOCK_APPS` array with `type: "component-popup"` and the `component` property
4. The component will render inside a popup window with the standard app header (emoji and label)

**Component Guidelines:**
- Components should be default exports
- Components receive no props (create wrapper components if you need props)
- Use Tailwind CSS classes for styling
- Components are rendered inside a padded container (`p-5 sm:p-6`)
- The app header (emoji + label) is automatically added by `AppWrapper`

#### Rules

- **Maximum 5 apps** in the dock (by design)
- Each app must have a unique `id`
- `popup` type requires `description`
- `link` and `iframe` types require `url`
- `component-popup` type requires `component` (React component)
- Use appropriate emojis for visual consistency

### Adding Widgets

Widgets appear as draggable items on the desktop. Edit `src/data/widget-data.ts` to add new widgets.

#### Widget Types

1. **Folder** - Opens a popup with clickable items (images + links)
2. **Note** - Opens a popup with a list of text items
3. **Image** - Displays an image (with optional component)
4. **Link** - Direct link widget

#### Example: Adding a Folder Widget

```typescript
{
  id: "my-projects",
  name: "My Projects",
  type: "folder",
  folderItems: [
    {
      name: "Project Name",
      image: ProjectImage,        // Import image from assets
      url: "https://project-url.com",
      description: "Project description shown on hover"
    },
    // Add more items...
  ],
  // component: CustomComponent,  // Optional: custom React component
}
```

**Steps:**
1. Import your image: `import ProjectImage from "../assets/project.png"`
2. Add the folder widget to the `WIDGETS` array
3. Each `folderItem` requires: `name`, `image`, `url`, and `description`

#### Example: Adding a Note Widget

```typescript
{
  id: "todo-list",
  name: "Todo List",
  type: "note",
  note: [
    "1. First item",
    "2. Second item",
    "3. Third item"
  ],
  // component: CustomComponent,  // Optional: custom React component
}
```

**Steps:**
1. Add the note widget to the `WIDGETS` array
2. The `note` array contains strings that will be displayed as a list
3. Optional: Create a custom component for special styling

#### Example: Adding an Image Widget

```typescript
{
  id: "profile-pic",
  name: "Profile",
  type: "image",
  image: ProfileImage,  // Import image from assets
  // url: "https://...", // Optional: make image clickable
  // component: CustomComponent,  // Optional: custom React component
}
```

#### Example: Adding a Link Widget

```typescript
{
  id: "portfolio",
  name: "Portfolio",
  type: "link",
  url: "https://portfolio.com",
  // component: CustomComponent,  // Optional: custom React component
}
```

#### Widget Rules

- Each widget must have a unique `id`
- `folder` type requires `folderItems` array
- `note` type requires `note` array (array of strings)
- `image` type can have optional `image` and `url`
- `link` type requires `url`
- Images must be imported from the `assets` folder
- Optional `component` can override default rendering

#### Creating Custom Widget Components

If you want custom styling or behavior:

1. Create a component in `src/features/desktop/center-canvas/widgets/`
2. Import it in `widget-data.ts`
3. Add it to the widget's `component` property:

```typescript
import CustomWidget from "../features/desktop/center-canvas/widgets/CustomWidget";

{
  id: "custom",
  name: "Custom Widget",
  type: "note", // or any type
  component: CustomWidget, // Your custom component
  // ... other properties
}
```

## Deployment to GitHub Pages

### Initial Setup

1. **Install gh-pages** (if not already installed):
```bash
npm install --save-dev gh-pages
```

2. **Verify your repository name** in `package.json`:
   - The `homepage` field should match: `https://<username>.github.io/<repository-name>`
   - Currently set to: `https://zunit.github.io/jacbook`

3. **Verify base path** in `vite.config.ts`:
   - Should match your repository name: `base: '/jacbook/'`

### Deployment Methods

#### Method 1: Manual Deployment (Recommended)

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

This will:
- Build the project (`predeploy` script)
- Deploy the `dist` folder to the `gh-pages` branch
- Your site will be available at `https://zunit.github.io/jacbook`

#### Method 2: Automated Deployment with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Post-Deployment

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` → `/ (root)`
   - Click Save

2. **Update your domain** (if using custom domain):
   - Update the `homepage` field in `package.json`
   - Update the `base` path in `vite.config.ts` if needed

3. **Verify deployment**:
   - Wait a few minutes for GitHub Pages to update
   - Visit `https://zunit.github.io/jacbook`
   - Check that all assets load correctly

### Troubleshooting

**Issue: 404 errors on routes**
- Ensure `base` in `vite.config.ts` matches your repository name
- Verify `homepage` in `package.json` is correct

**Issue: Assets not loading**
- Check that paths in `index.html` are relative
- Verify the `base` path includes trailing slash: `/jacbook/`

**Issue: Build fails**
- Run `npm run build` locally to check for errors
- Ensure all dependencies are installed: `npm install`

## Configuration

### Updating Repository Name

If you change your repository name:

1. Update `package.json`:
```json
"homepage": "https://<username>.github.io/<new-repo-name>"
```

2. Update `vite.config.ts`:
```typescript
base: '/<new-repo-name>/',
```

3. Rebuild and redeploy:
```bash
npm run build
npm run deploy
```

## License

This project is private and personal.

## Important Development Notes

### App Type System

The app system supports four types:
- **popup**: Simple text description popups
- **link**: External links that open in new tabs
- **iframe**: Embedded web content (e.g., Notion pages)
- **component-popup**: Custom React components in popup windows

**Key Files:**
- `src/data/apps-data.ts` - App definitions
- `src/features/desktop/hooks/useDockAppHandler.ts` - Handles app clicks
- `src/features/desktop/hooks/useAppManager.ts` - Manages app state (must include new types in filter)
- `src/features/desktop/center-canvas/app-wrapper/AppWrapper.tsx` - Renders app windows

**When adding a new app type:**
1. Add the type to `DockApp` type definition in `apps-data.ts`
2. Update `useDockAppHandler.ts` to handle the new type
3. Update `useAppManager.ts` filter to include the new type
4. Update `AppWrapper.tsx` to render the new type
5. Update this README with documentation

### Widget Type System

Widgets support four types:
- **folder**: Popup with grid of items (images + links)
- **note**: Popup with list of text items
- **image**: Image display widget
- **link**: Direct link widget

**Key Files:**
- `src/data/widget-data.ts` - Widget definitions
- `src/features/desktop/center-canvas/widget-wrapper/WidgetWrapper.tsx` - Widget container
- `src/features/desktop/center-canvas/widget-wrapper/WidgetFolderPopup.tsx` - Folder popup
- `src/features/desktop/center-canvas/widget-wrapper/WidgetNotePopup.tsx` - Note popup

### Z-Index Hierarchy

Understanding the z-index system is important for proper layering:

```
Background/Video: -z-20, -z-10
Overlays: z-30
Base UI (TopNav, Dock, Widgets): z-40
Popups (Apps, Folders, Notes, AboutMe): z-50
```

When adding new popups, ensure they use `z-50` or higher.

### Drag and Drop

The app uses `@dnd-kit` for drag and drop functionality:
- Apps, widgets, and popups are draggable
- Drag handlers are in `src/features/desktop/hooks/useDragAndDrop.ts`
- When adding new draggable elements, update the drag end handler

### Component Locations

**Dock App Components:**
- Location: `src/features/desktop/bottom-dock-apps/dock-apps/<app-name>/`
- Example: `src/features/desktop/bottom-dock-apps/dock-apps/find-me-app/FindMe.tsx`

**Widget Components:**
- Location: `src/features/desktop/center-canvas/widgets/<widget-name>/`
- Example: `src/features/desktop/center-canvas/widgets/wiz-work/BoardGames.tsx`

### File Structure Best Practices

- Keep data definitions in `src/data/`
- Keep feature components in `src/features/desktop/`
- Keep shared hooks in `src/features/desktop/hooks/`
- Import assets from `src/assets/`

## Notes

- The React Compiler is enabled for better performance
- Video background should be optimized for web (recommended: 1920x1080, compressed)
- Open Graph meta tags are configured for social sharing
- All popups are draggable via the header bar
- Mobile detection automatically shows a mobile fallback view
