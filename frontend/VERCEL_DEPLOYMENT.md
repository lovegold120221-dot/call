# Vercel Deployment Guide for CSR Agent Frontend

This guide explains how to deploy the CSR Agent frontend to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: The frontend should be pushed to GitHub
3. **Environment Variables**: Configure required environment variables

## Environment Variables

The following environment variables need to be configured in Vercel:

### Frontend Environment Variables
- `VITE_LIVEKIT_URL`: LiveKit server URL (e.g., `wss://tts-mozilla-f1zttm7l.livekit.cloud`)
- `VITE_LIVEKIT_API_KEY`: LiveKit API key (e.g., `APIRWWXA4MPYw6h`)
- `VITE_GOOGLE_API_KEY`: Google AI API key for Gemini Live API

### Backend Integration
- `VITE_API_URL`: Backend API URL (for production, this should be your deployed backend URL)

## Deployment Steps

### 1. Connect to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel
```

### 2. Configure Project Settings

During the first deployment, Vercel will ask for:

- **Framework**: Vite (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Set Environment Variables

In the Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the required variables:
   ```
   VITE_LIVEKIT_URL = wss://tts-mozilla-f1zttm7l.livekit.cloud
   VITE_LIVEKIT_API_KEY = APIRWWXA4MPYw6h
   VITE_GOOGLE_API_KEY = your_google_api_key_here
   ```

### 4. Deploy

```bash
# Deploy to production
vercel --prod

# Or use the Vercel dashboard to trigger deployment
```

## Configuration Files

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "devCommand": "npm run dev",
  "functions": {
    "api/*.js": {
      "runtime": "nodejs18.x"
    }
  },
  "env": {
    "VITE_LIVEKIT_URL": "@livekit_url",
    "VITE_LIVEKIT_API_KEY": "@livekit_api_key",
    "VITE_GOOGLE_API_KEY": "@google_api_key"
  }
}
```

### .vercelignore
```
# Dependencies
node_modules/
.venv/
.env
.env.local

# Build outputs
dist/
build/

# Development
.DS_Store
.vscode/
*.log
```

## API Routes

The frontend includes a health check API route:

- **GET /api/health**: Returns health status of the frontend

## Custom Domain (Optional)

1. In Vercel dashboard, go to "Domains"
2. Add your custom domain
3. Configure DNS records as instructed by Vercel

## Monitoring and Logs

- **Build Logs**: Available in Vercel dashboard
- **Function Logs**: For serverless functions
- **Analytics**: Built-in Vercel Analytics

## Troubleshooting

### Common Issues

1. **Build Failures**: Check environment variables and dependencies
2. **API Connection Issues**: Verify backend URL is accessible
3. **CORS Issues**: Ensure backend allows requests from your Vercel domain

### Debug Mode

```bash
# Deploy with debug logging
vercel --prod --debug
```

## Performance Optimization

The frontend is optimized for Vercel:

- **Static Assets**: Automatically optimized
- **Edge Functions**: API routes run at the edge
- **CDN**: Global content delivery

## Security Considerations

- **Environment Variables**: Never commit secrets to Git
- **HTTPS**: Automatic SSL certificates
- **API Security**: Use proper authentication for backend calls

## Continuous Deployment

Vercel automatically deploys on pushes to the main branch. Configure:

1. **GitHub Integration**: Connect repository in Vercel
2. **Deploy Hooks**: Set up automatic deployments
3. **Preview Deployments**: For pull requests

## Scaling

Vercel automatically scales based on traffic:

- **Serverless Functions**: Scale to zero when not in use
- **Static Assets**: Global CDN distribution
- **Edge Caching**: Improved performance worldwide

## Support

For deployment issues:
- Check Vercel documentation
- Review build logs
- Contact Vercel support if needed
