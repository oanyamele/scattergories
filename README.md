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

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)