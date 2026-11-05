# Employee Management Dashboard (React)

A responsive, accessible **Employee Management Dashboard** built with **React.js** and **Vite**. Administrators can log in, view a dashboard, search and filter employees, add, edit and delete employees, switch between light and dark mode, and navigate between pages without reloading, as a Single Page Application (SPA).

> **Project:** Sumerix Global – Full Stack Web Development Internship, **Task 3**
> (React.js Fundamentals, JSX, Components, Props, State, Hooks, React Router, Forms, Context API, React Lifecycle & SPA Development)
> **Author:** Anjan Basak

> This project extends **Task 2 (Employee Directory)**. The API, service and storage logic from Task 2 was reused, and the vanilla JavaScript UI was rebuilt as React components with Router and Context API. See [Connection to Task 2](#14-connection-to-task-2).

---

## Table of Contents

1. [What is this project?](#1-what-is-this-project)
2. [Live Demo and Screenshots](#2-live-demo-and-screenshots)
3. [Features](#3-features)
4. [Technologies Used](#4-technologies-used)
5. [Before You Start (Prerequisites)](#5-before-you-start-prerequisites)
6. [Installation: Step by Step](#6-installation-step-by-step)
7. [Demo Login](#7-demo-login)
8. [Available Scripts](#8-available-scripts)
9. [Folder Structure](#9-folder-structure)
10. [How the App Works](#10-how-the-app-works)
11. [React Concepts Demonstrated](#11-react-concepts-demonstrated)
12. [Styling, Responsive Design and Accessibility](#12-styling-responsive-design-and-accessibility)
13. [Data, API and Browser Storage](#13-data-api-and-browser-storage)
14. [Connection to Task 2](#14-connection-to-task-2)
15. [Testing Checklist](#15-testing-checklist)
16. [Common Errors and How to Fix Them](#16-common-errors-and-how-to-fix-them)
17. [Deploying the Project](#17-deploying-the-project)
18. [Uploading to GitHub (First Time)](#18-uploading-to-github-first-time)
19. [Learning Resources](#19-learning-resources)
20. [Future Enhancements and Connection to Task 4](#20-future-enhancements-and-connection-to-task-4)
21. [License](#21-license)

---

## 1. What is this project?

This is a front-end web application for managing a company's employees. After logging in, you see a dashboard with summary numbers, an employee list you can search and filter, and pages to view, add, edit and delete employees.

It is the Task 3 project of the internship and practises:

- React fundamentals: components, JSX, props and state
- React Hooks: `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback` and custom hooks
- Component lifecycle with `useEffect` (mount, update, cleanup)
- Client-side routing with React Router (SPA navigation)
- Controlled forms with validation and error messages
- Global state with the Context API (theme, authentication, employees)
- Responsive and accessible UI with CSS Modules and global CSS
- Loading, empty and error states
- A professional, scalable folder structure

You do **not** need any backend. Employee data comes from a free public API on the first load. After that, your changes (add, edit, delete) are saved in your browser.

---

## 2. Live Demo and Screenshots

**Live site:** `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/` *(replace after deploying, or remove this line)*

Add your screenshots to a `screenshots/` folder and link them here:

| View | Screenshot |
|------|-----------|
| Login page | `![Login](screenshots/login.png)` |
| Dashboard | `![Dashboard](screenshots/dashboard.png)` |
| Employee list | `![Employees](screenshots/employees.png)` |
| Search and filters | `![Search](screenshots/search-filter.png)` |
| Employee details | `![Details](screenshots/details.png)` |
| Add employee form (with validation errors) | `![Add](screenshots/add-employee.png)` |
| Edit employee form | `![Edit](screenshots/edit-employee.png)` |
| Delete confirmation | `![Delete](screenshots/delete.png)` |
| Dark mode | `![Dark](screenshots/dark-mode.png)` |
| Desktop layout | `![Desktop](screenshots/desktop.png)` |
| Tablet layout | `![Tablet](screenshots/tablet.png)` |
| Mobile layout and menu | `![Mobile](screenshots/mobile.png)` |
| Loading state | `![Loading](screenshots/loading.png)` |
| Error state | `![Error](screenshots/error.png)` |
| Empty state | `![Empty](screenshots/empty.png)` |
| React Developer Tools (component tree) | `![DevTools](screenshots/react-devtools.png)` |

---

## 3. Features

- **Login page (frontend only):** demo credentials, with protected pages
- **Dashboard:** total employees, available, out of office, department count, employees-by-department bars, recently listed employees
- **Employee list:** cards with photo or initials, name, job title, department and availability
- **Search:** by name, debounced so the list does not re-filter on every key press
- **Filter:** by department and by availability, with a "Clear filters" button
- **Employee details:** a page for each employee at `/employees/:id`
- **Add employee:** a validated form
- **Edit employee:** the same form, pre-filled
- **Delete employee:** with a confirmation prompt
- **Responsive navigation:** full menu on desktop, hamburger menu on mobile (closes with the `Esc` key)
- **Dark mode:** follows your system setting the first time, then remembers your choice
- **Loading state**, **empty state** and **error state with a Retry button**
- **Context API:** `ThemeContext`, `AuthContext` and `EmployeesContext`
- **React Router:** nested, dynamic and protected routes, plus a 404 page
- **Saved in the browser:** employees, theme and login state
- **Accessible UI:** skip link, labels, ARIA attributes, keyboard support and visible focus outlines

---

## 4. Technologies Used

| Technology | Purpose |
|-----------|---------|
| React 19 (JSX) | User interface components |
| Vite | Dev server and production build |
| React Router (`react-router-dom`) | Client-side routing (SPA) |
| Context API | Global state (theme, auth, employees) |
| CSS Modules and global CSS | Styling and dark mode (CSS variables) |
| `react-icons` | Icons |
| Google Fonts (Inter) | Typography |
| Fetch API | Getting data from the REST API |
| [RandomUser API](https://randomuser.me/) | Source of the employee data |
| ESLint | Code quality checks |
| `gh-pages` | Publishing to GitHub Pages |
| Git and GitHub | Version control and hosting the code |

---

## 5. Before You Start (Prerequisites)

Install these on your computer first:

| Tool | Why | How to check it is installed |
|------|-----|------------------------------|
| **Node.js (LTS version)** | Runs Vite and npm | `node -v` |
| **npm** (comes with Node.js) | Installs packages | `npm -v` |
| **Git** | Downloads and uploads the code | `git --version` |
| **VS Code** (recommended) | Code editor | – |
| **Google Chrome** and **Firefox** | Running, debugging and testing | – |
| **React Developer Tools** (browser extension) | Inspecting components, props and state | Look for the "Components" tab in DevTools |

Download Node.js from <https://nodejs.org/> (choose the **LTS** button). Download Git from <https://git-scm.com/>.

An internet connection is required for the first load, because the employees come from the API.

---

## 6. Installation: Step by Step

This section is written for someone who has never opened this repository before.

### Step 1: Download the code

Open a terminal (Command Prompt, PowerShell, Terminal or the VS Code terminal) and run:

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
```

**No Git?** On the GitHub page click the green **Code** button → **Download ZIP**, extract it, and open the folder in your terminal.

### Step 2: Install the dependencies

```bash
npm install
```

This reads `package.json` and downloads everything the project needs into a `node_modules/` folder. It may take a minute. You only need to do this once. If you see an `npm audit` message about vulnerabilities, you can ignore it. Do **not** run `npm audit fix --force`, because it can break the project.

### Step 3: Start the development server

```bash
npm run dev
```

The terminal prints something like:

```
  VITE  ready in 300 ms
  ➜  Local:   http://localhost:5173/
```

Open that address in your browser. The app reloads automatically whenever you save a file.

### Step 4: Log in

Use the [demo login](#7-demo-login).

### Step 5: Stop the server

Press `Ctrl + C` in the terminal.

### Starting this project from scratch (instead of cloning)

```bash
npm create vite@latest Task-3 -- --template react
cd Task-3
npm install
npm install react-router-dom react-icons
npm install -D gh-pages
```

Choose **React** and **JavaScript** (not TypeScript) if Vite asks, and choose **ESLint** if it asks which linter to use. Then create the folders shown in [Folder Structure](#9-folder-structure), add the source files, and import `./styles/global.css` in `src/main.jsx`. Delete the template's `src/App.css` and `src/index.css`.

---

## 7. Demo Login

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

> **Important:** this login is a **frontend-only placeholder** for learning. It is not secure, because the credentials are in the source code. Real authentication with a backend, tokens and role-based access is planned for Task 4.

---

## 8. Available Scripts

Run these from the project root (the folder containing `package.json`).

| Command | What it does |
|---------|--------------|
| `npm install` | Installs all dependencies |
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Creates an optimised production build in `dist/` and copies `index.html` to `404.html` (needed for page refreshes on GitHub Pages) |
| `npm run preview` | Serves the `dist/` build locally so you can test it before deploying |
| `npm run lint` | Checks the code with ESLint |
| `npm run deploy` | Builds the project and publishes `dist/` to the `gh-pages` branch |

---

## 9. Folder Structure

```
Task-3/
├── public/                      # Static files (favicon.svg)
├── src/
│   ├── assets/                  # Images and other static assets
│   ├── components/
│   │   ├── common/              # Reusable pieces used on many pages
│   │   │   ├── Avatar.jsx       #   photo, or initials when there is no photo
│   │   │   ├── EmptyState.jsx   #   "nothing found" message (accepts children)
│   │   │   ├── ErrorMessage.jsx #   error message with a Retry button
│   │   │   ├── Spinner.jsx      #   loading indicator
│   │   │   └── StatCard.jsx     #   number card for the dashboard
│   │   ├── layout/
│   │   │   ├── Layout.jsx       #   page frame: skip link, navbar, <Outlet />
│   │   │   ├── Navbar.jsx       #   responsive navigation, theme and logout buttons
│   │   │   └── Navbar.module.css
│   │   ├── employees/
│   │   │   ├── EmployeeCard.jsx #   one employee in the list (wrapped in memo)
│   │   │   ├── EmployeeCard.module.css
│   │   │   └── EmployeeFilters.jsx  # search box and filters (controlled inputs)
│   │   └── forms/
│   │       ├── EmployeeForm.jsx #   add / edit form with validation
│   │       └── FormField.jsx    #   label + input + error message wrapper
│   ├── context/
│   │   ├── ThemeContext.jsx     # light / dark mode
│   │   ├── AuthContext.jsx      # demo login state
│   │   └── EmployeesContext.jsx # employee list + add / edit / delete / reload
│   ├── hooks/
│   │   ├── useLocalStorage.js   # state that is saved in Local Storage
│   │   ├── useDebounce.js       # delays a fast-changing value (search)
│   │   └── useDocumentTitle.js  # sets the browser tab title per page
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── EmployeesPage.jsx
│   │   ├── EmployeeDetailsPage.jsx
│   │   ├── AddEmployeePage.jsx
│   │   ├── EditEmployeePage.jsx
│   │   └── NotFoundPage.jsx
│   ├── routes/
│   │   ├── AppRoutes.jsx        # all routes (nested + dynamic)
│   │   └── ProtectedRoute.jsx   # sends logged-out users to /login
│   ├── services/
│   │   ├── employeeApi.js       # fetch() call to the REST API
│   │   ├── employeeService.js   # raw API users -> employee objects
│   │   └── storage.js           # safe Local Storage wrapper
│   ├── styles/
│   │   └── global.css           # variables, light/dark themes, shared classes
│   ├── utils/
│   │   ├── constants.js         # departments, job titles, storage keys
│   │   └── helpers.js           # small helper functions
│   ├── App.jsx
│   └── main.jsx                 # entry point: Router + providers
├── index.html                   # page shell, Google Fonts, favicon
├── package.json                 # project info, scripts, dependencies
├── vite.config.js               # Vite configuration (GitHub Pages base path)
├── eslint.config.js             # ESLint rules
├── README.md                    # this file
└── .gitignore                   # files Git should not upload (node_modules, dist)
```

**Why so many small files?** Each file has one job (UI, logic, API, storage, routing). This follows the "single responsibility" best practice, makes the code easier to read and test, and makes it easy to grow into Task 4.

---

## 10. How the App Works

### Component tree

```
main.jsx
└── BrowserRouter
    └── ThemeProvider
        └── AuthProvider
            └── EmployeesProvider
                └── App
                    └── AppRoutes
                        ├── /login ........................ LoginPage
                        └── ProtectedRoute
                            └── Layout (Navbar + <Outlet />)
                                ├── /                ......... DashboardPage
                                ├── /employees       ......... EmployeesPage
                                │                              ├── EmployeeFilters
                                │                              └── EmployeeCard (many)
                                ├── /employees/new   ......... AddEmployeePage -> EmployeeForm
                                ├── /employees/:id   ......... EmployeeDetailsPage
                                └── /employees/:id/edit ...... EditEmployeePage -> EmployeeForm
```

### Routes

| URL | Page | Notes |
|-----|------|-------|
| `/login` | Login | Public. Logged-in users are redirected away |
| `/` | Dashboard | Protected |
| `/employees` | Employee list | Protected. Search and filters |
| `/employees/new` | Add employee | Protected |
| `/employees/:id` | Employee details | Protected. `:id` is a route parameter |
| `/employees/:id/edit` | Edit employee | Protected |
| anything else | 404 page | Public |

If you open a protected page while logged out, you are sent to `/login`, and after logging in you return to the page you wanted.

### Data flow

```
 randomuser.me API  ──(fetch, first load only)──►  services/employeeApi.js
                                                          │
                                                          ▼
                                   services/employeeService.js  (toEmployee)
                                                          │
                                                          ▼
                   context/EmployeesContext.jsx  ◄──►  Local Storage (ed3:employees)
                                                          │
                              (useEmployees() hook gives every page the data)
                                                          ▼
              pages  ──►  components  ──►  what you see on screen
```

1. On the very first visit there is nothing saved, so `EmployeesContext` fetches 24 employees from the API.
2. The list is saved in Local Storage. From then on the app loads it from storage, so it opens instantly and your changes are kept.
3. Add, edit and delete update the state in the context, and the new list is saved again automatically.
4. **Reset demo data** (on the dashboard) clears the saved list and fetches fresh data.

### State in, UI out

React re-draws the screen automatically whenever state changes. You never call a `render()` function yourself (in Task 2 you did). For example, typing in the search box changes state, React re-runs `EmployeesPage`, and the list updates.

### Loading, success, empty and error states

| State | When it happens | What the user sees |
|-------|-----------------|--------------------|
| Loading | First load, or after "Reset demo data" | Spinner and a message (`role="status"`) |
| Success | Data is ready | Employee list and the result count |
| Empty | No employee matches the search or filters | "No employees found" with a "Clear filters" button |
| Error | The API request fails | Error message and a **Retry** button (`role="alert"`) |

### Component lifecycle with `useEffect`

| Lifecycle idea | Where it is used |
|----------------|------------------|
| **Mounting** (runs once when the component appears) | `EmployeesContext` loads data; `EmployeeFilters` and `EmployeeForm` focus their first field with `useRef` |
| **Updating** (runs when a value changes) | `useLocalStorage` saves when the value changes; `useDocumentTitle` updates the tab title |
| **Unmounting / cleanup** | `useDebounce` clears its timer; `Navbar` removes its `keydown` listener |

---

## 11. React Concepts Demonstrated

This table follows the parts of the Task 3 brief.

| Brief part | Concept | Where to find it |
|-----------|---------|------------------|
| A, B | SPA, Vite with React, folder structure, npm scripts | The whole project, `package.json` |
| C – JSX | Expressions, conditional rendering, lists with `key`, fragments | `EmployeesPage`, `DashboardPage`, `EmployeeCard` |
| D – Components | Functional, reusable and composed components | `components/` |
| E – Props | Passing data, parent to child, the `children` prop, default values | `EmployeeCard`, `StatCard`, `EmptyState`, `EmployeeForm` |
| F – State and Hooks | `useState`, derived state, event handling, `useEffect`, dependency arrays | `EmployeesPage`, `EmployeesContext` (`loading` is derived) |
| G – Forms | Controlled components, validation, submission, error messages | `EmployeeForm`, `LoginPage` |
| H – React Router | `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `useNavigate`, dynamic routes, route parameters, nested routes | `routes/`, `Navbar`, `EmployeeDetailsPage` |
| I – Context API | Context, Provider, `useContext`, global state, theme context, authentication context | `context/` |
| J – Hooks | `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, custom hooks | `hooks/`, `EmployeesPage`, `DashboardPage` |
| K – Styling | CSS Modules, global CSS, component CSS, responsive design, icons, Google Fonts | `styles/`, `*.module.css`, `index.html` |
| L – Error handling | Loading, empty and error states, fallback UI | `components/common/` |
| M, N – Mini project | Employee Management Dashboard | The whole app |
| Best practices | Small reusable components, `memo`, `useMemo`, `useCallback`, semantic HTML, keyboard support, form labels | `EmployeeCard`, `Navbar`, `EmployeeForm` |

---

## 12. Styling, Responsive Design and Accessibility

### Styling

- **Global CSS** (`styles/global.css`): colour variables, the light and dark themes (`[data-theme='dark']`), buttons, forms, grids and shared classes
- **CSS Modules** (`Navbar.module.css`, `EmployeeCard.module.css`): styles that belong to one component only, so class names never clash
- **Icons:** `react-icons` (Feather icons)
- **Font:** Inter from Google Fonts

### Responsive design

| Screen | Behaviour |
|--------|-----------|
| Mobile (under 720 px) | Hamburger menu; the employee cards stack in one column |
| Tablet | Two columns of cards; filters in a row |
| Desktop | Full navigation bar and a wider card grid (content width up to 1100 px) |

### Accessibility

- "Skip to content" link for keyboard users
- Every input has a `<label>`; form errors use `role="alert"` and `aria-describedby`
- All actions work with the keyboard (Tab, Enter, Space, `Esc` closes the mobile menu)
- Visible focus outlines (`:focus-visible`)
- `aria-live="polite"` announces how many employees match
- `aria-expanded` and `aria-controls` on the menu button; `aria-pressed` on the theme button
- Icon-only buttons have descriptive `aria-label`s (for example "Delete Anna Smith")
- Colours were chosen for readable contrast in both themes, and the spinner slows down if the user prefers reduced motion
- Semantic HTML: `header`, `nav`, `main`, `section`, `article`, `dl`

---

## 13. Data, API and Browser Storage

### API

**RandomUser API:** <https://randomuser.me/>

```
GET https://randomuser.me/api/?results=24&seed=sumerix&nat=us,gb,au&inc=login,name,email,phone,picture,location
```

| Query parameter | Meaning |
|-----------------|---------|
| `results=24` | Number of users to return |
| `seed=sumerix` | Gives the same people every time |
| `nat=us,gb,au` | Nationalities to include |
| `inc=...` | Only return the listed fields |

RandomUser does not provide departments, job titles or availability. `toEmployee()` in `employeeService.js` assigns them in a predictable way.

### Employee object

```js
{
  id, name, title, department, availability,   // availability: 'Available' | 'Out'
  email, phone, city, photo                    // photo is '' for employees you add yourself
}
```

### Browser storage (Local Storage)

| Key | Contains |
|-----|----------|
| `ed3:employees` | The full employee list, including your edits |
| `ed3:theme` | `"light"` or `"dark"` |
| `ed3:auth` | The logged-in username, or `null` |

The `ed3:` prefix keeps Task 3's data separate from Task 2's (`ed:`), because GitHub Pages sites for the same account share one browser address.

**To inspect it:** open Chrome DevTools (`F12`) → **Application** → **Local Storage**.
**To reset everything:** run `localStorage.clear()` in the Console, or use **Reset demo data** on the dashboard.

---

## 14. Connection to Task 2

> This project extends Task 2 (Employee Directory). The API, service and storage logic from Task 2 was reused, and the vanilla JavaScript UI was rebuilt as React components with Router and Context API.

### How they connect in your code

| From Task 2 | Used in Task 3 |
|-------------|----------------|
| Fetch API and the RandomUser API | `services/employeeApi.js` calls the same API with the same seed |
| Mapping raw API data to employee objects | `services/employeeService.js` uses the same logic, with `toEmployee()` |
| Safe Local Storage wrapper | `services/storage.js` is the same code |
| Debounced search | `useDebounce` hook, the React version of Task 2's `debounce` |
| Loading, error and empty states | `Spinner`, `ErrorMessage` and `EmptyState` components |
| Dark mode saved in the browser | `ThemeContext` |
| Departments and job titles | `utils/constants.js` |
| "State in, UI out" with one `render()` | React state and automatic re-rendering |
| Vite and npm | The same tooling, with the React template |

### What is not connected

- **Separate folders and repos:** `Task-2` and `Task-3` don't import from each other.
- **Separate storage:** Task 3 uses the `ed3:` prefix on its storage keys, so the two apps don't overwrite each other's saved data on the same github.io address.
- **Different deployments:** each task has its own GitHub Pages site.

---

## 15. Testing Checklist

Tick these off before submitting.

**Features**
- [x] Login works with `admin` / `admin123`, and a wrong password shows an error
- [x] Logged-out users are redirected to the login page
- [x] Dashboard shows the correct numbers and department bars
- [x] Employee list shows cards
- [x] Search works, and clearing the box restores the list
- [x] Department and availability filters work, and "Clear filters" works
- [x] Employee details page opens from a card (`/employees/<id>`)
- [ ] Add employee works, and the form shows validation errors for bad input
- [ ] Edit employee works and keeps the changes
- [ ] Delete employee works after confirming
- [ ] Changes are still there after refreshing the page
- [ ] Dark mode works and is remembered after a refresh
- [ ] Logout works
- [ ] A wrong URL shows the 404 page

**States**
- [ ] Loading spinner appears (DevTools → Network → **Slow 3G**, then **Reset demo data**)
- [ ] Error screen and Retry button appear (DevTools → Network → **Offline**, then **Reset demo data**)
- [ ] Empty state appears (search for `zzzz`)

**Devices and browsers**
- [ ] Desktop layout (1280 px or wider)
- [ ] Tablet layout (about 768 px)
- [ ] Mobile layout (about 375 px), and the hamburger menu opens and closes
- [ ] Works in Chrome and Firefox (DevTools device toolbar: `Ctrl + Shift + M`)

**Quality**
- [ ] No red errors in the Console
- [ ] Everything works with the keyboard only
- [ ] Lighthouse Accessibility score is 90 or higher
- [ ] React Developer Tools shows the component tree, props and state (take a screenshot)
- [ ] `npm run lint` shows no errors
- [x] `npm run build` finishes with no errors, and `npm run preview` works

**Repository**
- [x] Meaningful commit history
- [ ] README with screenshots
- [x] `node_modules/` is NOT uploaded

---

## 16. Common Errors and How to Fix Them

### A. Setup and installation errors

**`'npm' is not recognized as an internal or external command`**
- Node.js is not installed, or its folder is not in your PATH.
- Install Node.js LTS from nodejs.org, then **close and reopen the terminal** (and VS Code). Check with `node -v`.

**`Cannot read package.json` / `npm ERR! code ENOENT`**
- You are in the wrong folder. `cd` into the project folder (the one that contains `package.json`).

**The Vite setup asks "Which linter to use?" or other questions**
- Choose **ESLint**. For the other questions, press Enter to accept the default. If you used `--template react`, Vite already knows you want JavaScript, so it does not ask about TypeScript.

**`npm audit` message about vulnerabilities after installing**
- You can ignore it. Do **not** run `npm audit fix --force`, because it can upgrade packages and break the project.

**`Failed to resolve import "react-router-dom"` or `"react-icons/fi"`**
- The package is not installed. Run `npm install react-router-dom react-icons`, then restart `npm run dev`.

**`npm ERR! network` / `ETIMEDOUT`** during `npm install`
- Internet or proxy problem. Check your connection and run it again. If it keeps failing, try `npm cache clean --force`.

**Install is broken or half-finished**
- Delete the `node_modules` folder and `package-lock.json`, then run `npm install` again.

### B. Dev server and Vite errors

**The dev server started by itself after creating the project**
- Newer Vite versions can start it automatically. Press `Ctrl + C` in the terminal (type `Y` if asked) before running other commands.

**`Port 5173 is in use, trying another one...`**
- Another Vite app is running. Use the new port Vite prints, or stop the other server with `Ctrl + C`.

**Blank page and `Failed to resolve import "./something.jsx"` in the Console**
- The file name or path is wrong. Check the spelling and capital letters (`Navbar.jsx` is not `navbar.jsx`). Include the extension (`.jsx` for components, `.js` for hooks and services).

**Changes do not appear in the browser**
- Save the file (`Ctrl + S`), hard refresh with `Ctrl + Shift + R`, and check the terminal for errors.

### C. `package.json` and ESLint errors

**Red squiggles in `package.json` after adding scripts**
- JSON needs a **comma after every line except the last** in a block. A missing comma after `"preview": "vite preview"` is the usual cause. The `postbuild` line must keep its backslashes exactly:
  ```json
  "postbuild": "node -e \"require('fs').copyFileSync('dist/index.html','dist/404.html')\"",
  ```

**`Fast refresh only works when a file only exports components` (`react-refresh/only-export-components`)**
- This is only a **warning**. It appears in the `context/` files because they export both a component (the Provider) and a hook. To remove it, add this block at the end of the array in `eslint.config.js`, then run **ESLint: Restart ESLint Server** in VS Code:
  ```js
  {
    files: ['src/context/**/*.{js,jsx}'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  ```

### D. React errors

**`useTheme must be used inside ThemeProvider`** (or `useAuth` / `useEmployees`)
- A component is using the context outside its Provider. Check that `main.jsx` wraps `<App />` in `ThemeProvider`, `AuthProvider` and `EmployeesProvider`, inside `BrowserRouter`.

**`Cannot read properties of undefined (reading 'map')` or `... 'filter')`**
- A list is `undefined`. The context returns `employees ?? []` so it should always be an array. Check that you are reading `employees` from `useEmployees()` and not from somewhere else.

**`Warning: Each child in a list should have a unique "key" prop`**
- Add `key={employee.id}` to the element returned inside `.map()`.

**`Invalid hook call`**
- A hook (`useState`, `useEffect`, ...) is used outside a component, inside a loop or condition, or two copies of React are installed. Call hooks only at the top of a component or custom hook. If it persists, delete `node_modules` and `package-lock.json`, then reinstall.

**`Objects are not valid as a React child`**
- You tried to display an object, such as `{employee}` instead of `{employee.name}`.

**The page refreshes when you submit a form**
- Add `e.preventDefault()` at the top of the submit handler.

**An input is stuck and cannot be typed in**
- A controlled input needs both `value` and `onChange`. Check that `name` on the input matches the key in your state object.

**Infinite loop or the component keeps re-rendering**
- Check the dependency array of `useEffect`. Do not set state inside `useEffect` without a condition or the right dependencies.

### E. Routing errors

**Nothing shows, or you are always sent to `/login`**
- You are not logged in. Log in with `admin` / `admin123`. If you are logged in, check `ThemeProvider`/`AuthProvider` wrap the routes and that `ed3:auth` exists in Local Storage.

**404 page appears for every URL on the dev server**
- `basename` and `base` do not match. In dev the base must be `/`. Use the conditional in `vite.config.js`: `base: command === 'build' ? '/YOUR-REPO-NAME/' : '/'`.

**`/employees` and `/employees/new` are both highlighted in the menu**
- Add the `end` prop to the `NavLink` for `/employees` (already done in this project).

### F. Login and data errors

**"Invalid username or password" on the login page**
- The fields are empty or wrong. Type `admin` and `admin123` in lowercase with no spaces. Check `DEMO` in `AuthContext.jsx`.

**The error screen shows `Failed to fetch`**
- You are offline, a firewall or ad-blocker is blocking `randomuser.me`, or the URL is wrong. Open the API URL in a new tab to test it, then click **Retry**.

**`Request failed (HTTP 429)`**
- Too many requests. Wait a minute. The saved list in Local Storage means the API is only called once.

**Old data keeps showing, or you want fresh data**
- Click **Reset demo data** on the dashboard, or run `localStorage.clear()` in the Console and refresh.

**`crypto.randomUUID is not a function` when adding an employee**
- `crypto.randomUUID()` only works on secure origins (`https://` or `http://localhost`). If you open the dev server from a phone using an address like `http://192.168.x.x:5173`, it will fail. Test the Add form on `localhost`, or on the deployed `https` site.

**Settings are not saved**
- Private/Incognito mode or blocked site data. Use a normal window and allow site data.

### G. Styling errors

**The page is unstyled or looks wrong**
- Check that `src/main.jsx` has `import './styles/global.css';` and that no leftover import of the template's `index.css` or `App.css` remains.

**Dark mode does nothing**
- `ThemeContext` sets `data-theme` on the `<html>` element. Check that the `[data-theme='dark']` block exists in `global.css`.

**The login card is not centred**
- Delete the template's leftover `#root` rules (in `App.css` or `index.css`) and make sure those files are not imported.

**A CSS Module style does not apply**
- Import it as `import styles from './Navbar.module.css'` and use `className={styles.header}`. The file name must end in `.module.css`.

### H. Build and deployment errors

**`npm run build` fails**
- Read the first red error line. It usually names a file and line number. Fix it and build again.

**Blank page after deploying to GitHub Pages**
- The base path is wrong. In `vite.config.js`, `base` must be exactly `'/YOUR-REPO-NAME/'` (same capital letters, slashes at both ends) for the build. Then run `npm run deploy` again.

**Page shows 404 when you refresh on `/employees`**
- GitHub Pages does not know React Router routes. The `postbuild` script copies `index.html` to `404.html` to fix this. Make sure that script exists and that you deployed after adding it.

**The Pages site still shows the raw project or old version**
- In **Settings → Pages**, the branch must be `gh-pages` with `/ (root)`. Hard refresh with `Ctrl + Shift + R`. It can take 1–2 minutes to update.

**`npm run deploy` overwrote the Task 2 site**
- Task 3 shares a Git repo with Task 2. Give Task 3 its **own** repository (see below) so each task has its own `gh-pages` branch.

**`gh-pages` is not recognized**
- Run `npm install -D gh-pages`.

### I. Git and GitHub errors

**Task 3 files show up in the Task 2 repo**
- Add `Task-3/` on its own line to the parent folder's `.gitignore`, **with no spaces before it** (leading spaces break the rule), then run `git rm -r --cached Task-3` if it was already added.

**`fatal: not a git repository`**
- Run `git init` in the project folder first.

**`fatal: remote origin already exists`**
- Run `git remote set-url origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git`.

**`error: failed to push some refs ... (rejected)`**
- The GitHub repo has commits you do not have locally. Run `git pull origin main --rebase`, then `git push`.

**`fatal: The current branch ... has no upstream branch`**
- Run `git push -u origin main` once (use your branch name).

**`Authentication failed`**
- GitHub no longer accepts account passwords for Git. Use a **Personal Access Token** as the password, sign in through VS Code or GitHub Desktop, or use SSH.

**`node_modules` was uploaded to GitHub**
- Make sure `.gitignore` contains `node_modules` and `dist`, then run `git rm -r --cached node_modules`, commit and push.

**`Author identity unknown`** when committing
- Run `git config --global user.name "Your Name"` and `git config --global user.email "you@example.com"`.

### J. How to debug any problem

1. Read the **terminal** output where `npm run dev` is running.
2. Open Chrome DevTools (`F12`) → **Console** and read the first red error.
3. Use the **React Developer Tools** "Components" tab to check props and state.
4. Check **Network** to see whether the API request succeeded (status 200).
5. Check **Application** → Local Storage to see what is saved.
6. Add a temporary `console.log(...)` to see a value.
7. Copy the exact error message into a search engine, or ask for help with the message and the file name.

---

## 17. Deploying the Project

> **Use a separate Git repository for Task 3.** If `Task-3` sits inside the same Git repo as Task 2, `npm run deploy` will overwrite Task 2's `gh-pages` branch. Run `git init` inside `Task-3`, create a new GitHub repo, and add `Task-3/` to the parent folder's `.gitignore`.

### Option 1: GitHub Pages with `gh-pages`

1. In `vite.config.js`, set the repo name:
   ```js
   export default defineConfig(({ command }) => ({
     base: command === 'build' ? '/YOUR-REPO-NAME/' : '/',
     plugins: [react()],
   }));
   ```
2. Make sure `package.json` has these scripts:
   ```json
   "postbuild": "node -e \"require('fs').copyFileSync('dist/index.html','dist/404.html')\"",
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run:
   ```bash
   npm install -D gh-pages
   npm run deploy
   ```
4. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `gh-pages`, folder `/ (root)` → Save**.
5. Wait 1–2 minutes and open `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`.

### Option 2: Vercel or Netlify

1. Push the code to GitHub.
2. Import the repository on <https://vercel.com> or <https://netlify.com>.
3. Framework: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. The `base` path is not needed there, so use `'/'`, or set an environment variable.

Before deploying, run `npm run build` and `npm run preview` locally to make sure the production build works.

---

## 18. Uploading to GitHub (First Time)

1. Create a new **public** repository on GitHub (do not add a README or .gitignore there).
2. In the `Task-3` folder run:

```bash
git init
git add .
git commit -m "feat: scaffold React project with Vite"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

3. Keep committing small, meaningful changes as you build:

```bash
git add .
git commit -m "feat: add employee list and filters"
git push
```

**Commit message tips:** start with `feat:` (new feature), `fix:` (bug fix), `docs:` (documentation) or `style:` (design changes), followed by a short description. Examples: `feat: add context providers`, `feat: add add/edit/delete forms`, `docs: add README and screenshots`.

**Without typing commands:** in VS Code, open the `Task-3` folder, use the **Source Control** panel → **Initialize Repository** → **Commit** → **Publish Branch**.

---

## 19. Learning Resources

- React documentation: <https://react.dev/learn>
- React Router: <https://reactrouter.com/>
- Vite: <https://vite.dev/>
- Node.js: <https://nodejs.org/en/learn>
- npm: <https://docs.npmjs.com/>
- React Icons: <https://react-icons.github.io/react-icons/>
- Chrome DevTools: <https://developer.chrome.com/docs/devtools/>
- MDN Web Docs (CSS, accessibility): <https://developer.mozilla.org/>
- freeCodeCamp: <https://www.freecodecamp.org/>

---

## 20. Future Enhancements and Connection to Task 4

### Future enhancements

- Real authentication with a backend, tokens and role-based access control
- A Node.js / Express REST API and a MongoDB database instead of Local Storage
- Pagination and sorting options for large employee lists
- Image upload for employee photos
- Export the employee list to CSV
- Unit tests (Vitest and React Testing Library) and end-to-end tests (Playwright)
- Cloud deployment with a CI/CD pipeline (GitHub Actions)

### Connection to Task 4

**Task 4:** Advanced React, Custom Hooks, State Management, Redux Toolkit, API Integration, Authentication, Protected Routes, React Query, Form Validation, UI Component Libraries & Enterprise Frontend Development.

Task 4 extends React fundamentals by introducing advanced state management, authentication, protected routing, API integration with backend services, Redux Toolkit, React Query, advanced form handling and enterprise frontend architecture.

| Task 4 topic | Already prepared in Task 3 | What changes in Task 4 |
|---|---|---|
| Custom hooks | `useLocalStorage`, `useDebounce`, `useDocumentTitle` | More hooks, for example `useFetch` |
| State management and Redux Toolkit | `EmployeesContext` holds the list and the actions | Move that logic into a Redux Toolkit slice |
| API integration | `services/employeeApi.js` | Point it at your own backend |
| Authentication | `AuthContext` with demo credentials | Real login with tokens |
| Protected routes | `ProtectedRoute.jsx` | Add role checks (admin vs. staff) |
| React Query | Loading and error handling in the context | React Query handles fetching, caching and retries |
| Form validation | `validate()` in `EmployeeForm.jsx` | A form library with schema validation |
| UI component libraries | Plain CSS and CSS Modules | Try one library, for example Material UI |
| Enterprise architecture | The folder structure from the brief | Feature-based folders and environment config |

---

## 21. License

This project was created for learning purposes as part of the Sumerix Global internship. You may use it for study and portfolio purposes. Add a `LICENSE` file (for example MIT) if you want to make the terms explicit.

---

*Made by Anjan Basak as part of the Sumerix Global Full Stack Web Development Internship, Task 3.*
