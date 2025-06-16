# Netlify Deployment Guide

## Prerequisites
1. A GitHub/GitLab/Bitbucket account
2. A Netlify account (free tier is sufficient)
3. A ClickUp account

## Setup Instructions

### 1. Deploy to Netlify

1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Log in to [Netlify](https://app.netlify.com/)
3. Click "Add new site" > "Import an existing project"
4. Connect to your Git provider and select your repository
5. Click "Deploy site" (Netlify will automatically detect the settings from `netlify.toml`)

### 2. Set Up Environment Variables

1. In Netlify, go to "Site settings" > "Build & deploy" > "Environment"
2. Add the following environment variables:
   - `CLICKUP_API_KEY`: Your ClickUp API key
   - `CLICKUP_LIST_ID`: The ID of your ClickUp list where tasks should be created
   - `NODE_VERSION`: Set to `16` (or higher)

### 3. Get ClickUp API Key

1. Log in to your ClickUp account
2. Click your profile picture in the bottom left
3. Go to "Apps"
4. Find and copy your API key

### 4. Get ClickUp List ID

1. In ClickUp, navigate to the list where you want form submissions to go
2. The URL will be in this format: `https://app.clickup.com/1234567/v/li/123456789`
   - The number after `li/` is your List ID

### 5. Test Your Forms

1. After deployment, navigate to your Netlify site URL
2. Fill out and submit the contact and partner forms
3. Check your ClickUp list to see the new tasks

## Local Development

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Create a `.env` file in the project root:
   ```
   CLICKUP_API_KEY=your_clickup_api_key
   CLICKUP_LIST_ID=your_list_id
   ```

3. Start the local development server:
   ```bash
   netlify dev
   ```

4. Access the site at `http://localhost:8888`

## Troubleshooting

- If forms aren't submitting, check the browser's developer console (F12) for errors
- View Netlify function logs in the Netlify dashboard under "Functions"
- Ensure your ClickUp API key has the necessary permissions
- Check that the List ID is correct and the list exists in your workspace
