# WellnesPal - Deployment Guide

## 🚀 Netlify Deployment

### Prerequisites
- Supabase project with database setup
- Environment variables configured
- Code ready for deployment

### Method 1: Direct Upload (Recommended if GitHub is unavailable)

#### 1. **Prepare Build Locally**
```bash
# Install dependencies
npm install

# Build the project
npm run build
```

#### 2. **Manual Deployment via Netlify Dashboard**
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click "Add new site" → "Deploy manually"
3. Drag and drop your entire project folder (or zip it first)
4. Netlify will automatically detect it's a Next.js project

#### 3. **Environment Variables**
In Netlify Dashboard → Site Settings → Environment Variables, add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**⚠️ Important**: These environment variables MUST be set before deploying, as they are required during the build process.

### Method 2: GitHub Integration (When connectivity is restored)

#### 1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. **Connect to Netlify**
1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Choose GitHub and authorize
4. Select your repository

#### 3. **Build Settings** (Auto-detected)
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: `20`

### Method 3: Netlify CLI (Alternative)

#### 1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

#### 2. **Login and Deploy**
```bash
# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=.next
```

## 🔧 Configuration Files

### netlify.toml (✅ Already configured)
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### next.config.ts (✅ Optimized for Netlify)
- Image optimization disabled (Netlify handles this)
- Trailing slash disabled
- PWA headers configured

## 📊 Database Setup

Run these SQL migrations in your Supabase SQL Editor:

1. **Glucose Monitoring**: `supabase/migrations/002_add_glucose_monitoring.sql`
2. **Medication Management**: `supabase/migrations/003_add_medication_management.sql`
3. **Reminder System**: `supabase/migrations/004_add_reminder_system.sql`

## 🐛 Troubleshooting

### Build Fails with "Supabase URL and API key required"
- Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in Netlify environment variables
- Environment variables must be available during build time, not just runtime
- Redeploy after setting environment variables

### Network Connectivity Issues
- Use **Method 1 (Manual Upload)** if GitHub is unavailable
- Zip your project folder and upload directly to Netlify
- All configurations are already in place for manual deployment

### Build Fails
- Check Node version (should be 20)
- Verify environment variables are set
- Check build logs for specific errors

### App Loads but Features Missing
- Verify Supabase URL and key are correct
- Check if database migrations were run
- Verify RLS policies are enabled

### PWA Not Installing
- Ensure HTTPS is enabled (automatic on Netlify)
- Check manifest.json is accessible
- Verify service worker registration

## 📱 PWA Features
- ✅ Service Worker automatically deployed
- ✅ Manifest.json configured
- ✅ Install prompts work on mobile
- ✅ Offline functionality enabled

## 🔒 Security
- ✅ HTTPS enabled by default
- ✅ Security headers configured
- ✅ Environment variables secured

## 📊 Monitoring
- **Build logs**: Netlify Dashboard → Deploys
- **Function logs**: Netlify Dashboard → Functions
- **Analytics**: Enable Netlify Analytics for usage stats

## 🔄 Updates
- **GitHub Method**: Push to main branch → Auto-deploy
- **Manual Method**: Re-upload project folder
- **CLI Method**: Run `netlify deploy --prod --dir=.next`

---

## 🌐 Live URL
Once deployed, your WellnesPal app will be available at:
`https://your-site-name.netlify.app`

## 📱 PWA Installation
Users can install the app by:
- **Mobile**: Tap "Add to Home Screen" in browser menu
- **Desktop**: Click install icon in address bar
- **In-app**: Use the install prompt when it appears

---

## 🚨 Quick Deploy (Network Issues)

If you're experiencing network connectivity issues with GitHub:

1. **Zip your project folder**
2. **Go to Netlify Dashboard**
3. **Click "Deploy manually"**
4. **Drag and drop the zip file**
5. **Set environment variables**
6. **Your app will be live!**

All configurations are already optimized for Netlify deployment.