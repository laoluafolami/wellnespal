# WellnesPal - Deployment Guide

## 🚀 Netlify Deployment

### Prerequisites
- GitHub repository: https://github.com/laoluafolami/wellnespal.git
- Supabase project with database setup
- Environment variables configured

### Step-by-Step Deployment

#### 1. **Connect to Netlify**
1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Choose GitHub and authorize
4. Select `laoluafolami/wellnespal` repository

#### 2. **Build Settings**
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: `20`

#### 3. **Environment Variables**
Add these in Netlify Dashboard → Site Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### 4. **Database Setup**
Run these SQL migrations in your Supabase SQL Editor:

1. **Glucose Monitoring**: `supabase/migrations/002_add_glucose_monitoring.sql`
2. **Medication Management**: `supabase/migrations/003_add_medication_management.sql`
3. **Reminder System**: `supabase/migrations/004_add_reminder_system.sql`

#### 5. **Deploy**
- Click "Deploy site"
- Wait for build to complete
- Your app will be available at: `https://your-site-name.netlify.app`

### 🔧 Post-Deployment

#### Custom Domain (Optional)
1. Go to Site Settings → Domain management
2. Add custom domain
3. Configure DNS settings

#### PWA Features
- ✅ Service Worker automatically deployed
- ✅ Manifest.json configured
- ✅ Install prompts work on mobile
- ✅ Offline functionality enabled

#### Security
- ✅ HTTPS enabled by default
- ✅ Security headers configured
- ✅ Environment variables secured

### 🐛 Troubleshooting

#### Build Fails
- Check Node version (should be 20)
- Verify environment variables are set
- Check build logs for specific errors

#### App Loads but Features Missing
- Verify Supabase URL and key are correct
- Check if database migrations were run
- Verify RLS policies are enabled

#### PWA Not Installing
- Ensure HTTPS is enabled (automatic on Netlify)
- Check manifest.json is accessible
- Verify service worker registration

### 📊 Monitoring
- **Build logs**: Netlify Dashboard → Deploys
- **Function logs**: Netlify Dashboard → Functions
- **Analytics**: Enable Netlify Analytics for usage stats

### 🔄 Updates
- Push to GitHub main branch
- Netlify auto-deploys on git push
- Check deploy status in Netlify dashboard

---

## 🌐 Live URL
Once deployed, your WellnesPal app will be available at:
`https://your-site-name.netlify.app`

## 📱 PWA Installation
Users can install the app by:
- **Mobile**: Tap "Add to Home Screen" in browser menu
- **Desktop**: Click install icon in address bar
- **In-app**: Use the install prompt when it appears