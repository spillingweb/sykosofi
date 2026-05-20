# TinaCMS Setup Guide

Your content has been migrated to markdown files in `/content/blogg` and `/content/arrangementer`. Follow these steps to enable visual editing for your client.

## Step 1: Create Tina Cloud Account

1. Go to [https://app.tina.io](https://app.tina.io)
2. Sign up with GitHub (use the same account as your repository)
3. Create a new project
4. Connect it to your GitHub repository: `spillingweb/sykosofi`

## Step 2: Get Your API Credentials

After creating the project:

1. Go to **Project Settings** in Tina Cloud
2. Copy your **Client ID**
3. Generate a **Content Token** (under Tokens section)

## Step 3: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:
   - `TINA_PUBLIC_CLIENT_ID` = your Client ID from Tina Cloud
   - `TINA_TOKEN` = your Content Token from Tina Cloud
   - `GITHUB_BRANCH` = `main`

4. **Redeploy** your site for the changes to take effect

## Step 4: Access the CMS

Once deployed, your client can access the CMS in two ways:

### Option A: Direct URL
Go to: `https://your-domain.vercel.app/admin/index.html`

### Option B: Edit Mode
Add `/admin` to any page URL to enter edit mode for that page.

## Editing Content

### Blog Posts
- Navigate to **Blogginnlegg** in the sidebar
- Click on existing posts to edit or create new ones
- All fields are pre-configured (title, excerpt, date, category, content)
- Markdown and rich text editing available

### Events (Arrangementer)
- Navigate to **Arrangementer** in the sidebar  
- Edit upcoming events or create new ones
- Fields include: title, description, date, time, location, price, capacity, category

### Media
- Upload images to `/public/uploads` through the CMS
- Images can be used in blog posts and events

## Local Development with TinaCMS

To test the CMS locally:

\`\`\`powershell
npx tinacms dev -c "npm run dev"
\`\`\`

This will start both the dev server and TinaCMS admin interface at:
- Frontend: http://localhost:3000
- Admin: http://localhost:3000/admin

## Important Notes

- **Git-based CMS**: All changes are committed directly to your GitHub repository
- **Authentication**: Only users with GitHub access to the repository can edit
- **Preview**: Changes are visible immediately in the Tina editor
- **Publishing**: Commits trigger automatic deployment on Vercel

## Troubleshooting

### "Unauthorized" error
- Check that `TINA_PUBLIC_CLIENT_ID` and `TINA_TOKEN` are set correctly in Vercel
- Ensure the user is logged in to Tina Cloud with access to the connected GitHub repo

### Images not showing
- Make sure images are uploaded to `/public/uploads`
- Check that the path in markdown is correct: `/uploads/filename.jpg`

### Content not updating
- Verify the `GITHUB_BRANCH` is set to `main`
- Check that commits are being pushed to the correct branch

## Next Steps

You can customize the schema in `/tina/config.ts` to:
- Add new content types (e.g., testimonials, services)
- Modify field types and validation
- Add custom components to the editor
- Configure preview URLs

For more information, see: https://tina.io/docs
