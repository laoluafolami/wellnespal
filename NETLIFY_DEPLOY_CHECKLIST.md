# 🚀 Netlify Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. **Code Ready**
- [x] All TypeScript errors fixed
- [x] Build configuration optimized for Netlify
- [x] PWA assets configured
- [x] Environment variable handling implemented
- [x] Dynamic rendering configured for all pages using Supabase

### 2. **Configuration Files**
- [x] `netlify.toml` - Netlify build configuration
- [x] `next.config.ts` - Next.js optimized for Netlify
- [x] `package.json` - Build scripts configured
- [x] All pages using Supabase hooks set to dynamic rendering

### 3. **Database Setup**
- [ ] Supabase project created
- [ ] Database migrations run:
  - [ ] `002_add_glucose_monitoring.sql`
  - [ ] `003_add_medication_management.sql`
  - [ ] `004_add_reminder_system.sql`

## 🌐 Deployment Options (Choose One)

### Option A: Manual Upload (Recommended for network issues)
1. [ ] Run `npm install`
2. [ ] Run `npm run build` (optional - Netlify can build)
3. [ ] Go to [Netlify Dashboard](https://app.netlify.com)
4. [ ] Click "Add new site" → "Deploy manually"
5. [ ] Drag and drop project folder
6. [ ] Set environment variables (see below)

### Option B: GitHub Integration
1. [ ] Fix network connectivity
2. [ ] Push to GitHub: `git push origin main`
3. [ ] Connect repository to Netlify
4. [ ] Set environment variables (see below)

### Option C: Netlify CLI
1. [ ] Install CLI: `npm install -g netlify-cli`
2. [ ] Login: `netlify login`
3. [ ] Deploy: `netlify deploy --prod --dir=.next`

## 🔑 Environment Variables (REQUIRED)

Add these in Netlify Dashboard → Site Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**⚠️ Critical**: Set these BEFORE deploying or the build will fail!

## 🎯 Post-Deployment

### 1. **Test Core Features**
- [ ] User registration/login
- [ ] Blood pressure readings
- [ ] Glucose monitoring (if enabled)
- [ ] Medication management
- [ ] PWA installation

### 2. **Database Verification**
- [ ] User settings created automatically
- [ ] All features accessible
- [ ] Data persistence working

### 3. **PWA Testing**
- [ ] Install prompt appears
- [ ] Offline functionality works
- [ ] Service worker registered

## 🐛 Common Issues & Solutions

### Build Fails: "Supabase URL required"
- **Solution**: Set environment variables in Netlify dashboard

### Network Issues with GitHub
- **Solution**: Use Manual Upload (Option A)

### App loads but features missing
- **Solution**: Check database migrations and environment variables

### PWA not installing
- **Solution**: Verify HTTPS is enabled (automatic on Netlify)

## 📞 Support Resources

- **Netlify Docs**: https://docs.netlify.com/frameworks/next-js/
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## 🎉 Success Indicators

Your deployment is successful when:
- ✅ Build completes without errors
- ✅ App loads at your Netlify URL
- ✅ User can register/login
- ✅ All features work as expected
- ✅ PWA can be installed

**Your WellnesPal app will be live at**: `https://your-site-name.netlify.app`