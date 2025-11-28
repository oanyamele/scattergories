# Getting Started

**1. Clone the Repo in the terminal:**
```
git clone https://github.com/<YOUR_USERNAME>/scattegories_frontend.git
cd scattegories-frontend/scattegories-frontend
```

**2. Install Dependencies:**

\** Make sure you're inside the *scattegories-frontend/* folder then `npm install`

**3. Run the Development Server:**

`npm start` - The website should now open automatically.

# Project Structure

All code changes should be made inside: `scattegories-frontend/src/`  

Specifically:
* Add new pages to: `src/pages/` (ex. Login, Dashboard, Game Screen, etc.)  
* Add assets to: `src/assets/`  
* Add reusable UI components to: `src/components/`  
* Add API calls in: `src/services/`  
* Update routes in: `src/routes/AppRoutes.js`  

If any of these folders are not yet made, create them.

# Branch Workflow

**1. Pull the latest dev branch:**

```
git checkout dev
git pull origin dev
```

**2. Create your a new branch for your feature (with clear naming)**

Ex) `git checkout -b feature/login-ui`

**3. Make changes and add a clear commit message:**

```
git add .
git commit -m "{commit message}"
```

**4. Push your branch:**

Ex) `git push origin feature/login-ui`

**5. Open a pull request to** `dev`:

\** All frontend work should be merged into **dev**, *not main*.

**6. If you add tests, include them under** `/src/tests/`

