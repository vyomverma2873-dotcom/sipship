# Deploying Sip & Ship to Vercel

This guide explains how to deploy both the frontend and backend of the Sip & Ship application to Vercel.

## Prerequisites

1. [Vercel account](https://vercel.com/signup)
2. [Vercel CLI](https://vercel.com/download) installed globally: `npm i -g vercel`
3. MongoDB Atlas account (for database)
4. Email service account (for sending emails)

## Setting Up Environment Variables

### 1. Create Vercel Secrets

Run the following commands to set up your environment variables as Vercel secrets:

```bash
# Backend secrets
vercel secrets add mongo_uri "your-mongodb-connection-string"
vercel secrets add jwt_secret "your-jwt-secret"
vercel secrets add email_service "your-email-service"
vercel secrets add email_username "your-email-username"
vercel secrets add email_password "your-email-password"
vercel secrets add email_from "your-email-from-address"

# Frontend secrets
vercel secrets add vite_api_url "https://your-backend-api-url.vercel.app/api"
```

## Deploying the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Login to Vercel (if not already logged in):
   ```bash
   vercel login
   ```

3. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

4. Follow the prompts. When asked about the build settings, use the following:
   - Build Command: `npm install`
   - Output Directory: `./`
   - Development Command: `npm run dev`

5. Note the deployment URL for your backend (you'll need it for the frontend).

## Deploying the Frontend

1. Update the frontend environment variable with your backend URL:
   ```bash
   vercel secrets add vite_api_url "https://your-backend-url.vercel.app/api"
   ```

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

4. Follow the prompts. When asked about the build settings, use the following:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Development Command: `npm run dev`

## Alternative: Deploy from GitHub

You can also deploy directly from your GitHub repository:

1. Push your code to GitHub
2. Import your repository in the Vercel dashboard
3. Configure the project settings:
   - For the frontend: Set the root directory to `frontend`
   - For the backend: Set the root directory to `backend`
4. Add the environment variables in the Vercel project settings
5. Deploy

## Verifying Your Deployment

1. Visit your frontend URL to ensure the application is working
2. Test the API endpoints by visiting `https://your-backend-url.vercel.app/api/products`
3. Test user authentication and other features

## Troubleshooting

- If you encounter CORS issues, verify that your backend's CORS configuration is correctly set up to allow requests from your frontend domain
- Check Vercel logs for any deployment errors
- Ensure all environment variables are correctly set
- For MongoDB connection issues, verify your IP whitelist settings in MongoDB Atlas

## Continuous Deployment

Vercel automatically sets up continuous deployment when you connect your GitHub repository. Any push to your main branch will trigger a new deployment.