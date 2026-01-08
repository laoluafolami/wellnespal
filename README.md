# 🏥 WellnesPal - Your Complete Health Companion

A comprehensive Progressive Web App for tracking blood pressure, glucose levels, medications, and smart health reminders. Built with modern web technologies for a native app-like experience.

## ✨ Features

### 📊 **Health Monitoring**
- **Blood Pressure Tracking** with AHA guideline compliance
- **Glucose Monitoring** with ADA standard classifications
- **Interactive Charts** and trend analysis
- **Medical-grade reporting** for healthcare providers

### 💊 **Medication Management**
- **Smart scheduling** with custom dosage times
- **Adherence tracking** with detailed history
- **Color-coded organization** for easy identification
- **Comprehensive analytics** and progress monitoring

### 🔔 **Intelligent Reminders**
- **Multi-channel notifications** (browser, email, in-app)
- **Sound and vibration alerts** for mobile devices
- **Customizable timing** with lead time configuration
- **Smart scheduling** based on your preferences

### 📱 **Progressive Web App**
- **Install on any device** (iOS, Android, Desktop)
- **Offline functionality** with data sync
- **Native app experience** with fullscreen mode
- **Push notifications** for reliable reminders

## 🚀 Live Demo

**[Try WellnesPal Live](https://wellnesspal.netlify.app)**

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Charts**: Recharts
- **PWA**: Service Workers, Web App Manifest
- **Deployment**: Netlify

## 📱 Screenshots

*Add screenshots of your app here*

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 20+
- Supabase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/laoluafolami/wellnespal.git
   cd wellnespal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run database migrations**
   - Go to your Supabase SQL Editor
   - Run the migrations in `supabase/migrations/` folder in order

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📊 Database Setup

Run these SQL migrations in your Supabase SQL Editor:

1. **Glucose Monitoring**: `supabase/migrations/002_add_glucose_monitoring.sql`
2. **Medication Management**: `supabase/migrations/003_add_medication_management.sql`
3. **Reminder System**: `supabase/migrations/004_add_reminder_system.sql`

## 🔧 Configuration

### PWA Settings
The app is configured as a PWA with:
- Service worker for offline functionality
- Web app manifest for installation
- Push notification support
- Caching strategies for performance

### Reminder System
Configure reminders in the Settings page:
- Enable/disable notification methods
- Set custom reminder times
- Configure sound and vibration
- Adjust lead time preferences

## 📖 Usage Guide

### Getting Started
1. **Sign up** for a new account
2. **Enable features** in Settings (glucose monitoring, medication reminders)
3. **Add your first reading** using the dashboard
4. **Set up medications** if needed
5. **Configure reminders** for optimal health tracking

### Key Features
- **Dashboard**: Overview of your health metrics
- **Add Readings**: Quick entry for BP and glucose
- **Medications**: Manage your medication schedule
- **History**: View trends and export data
- **Settings**: Customize your experience

## 🚀 Deployment

### Netlify (Recommended)
1. Fork this repository
2. Connect to Netlify
3. Set environment variables
4. Deploy automatically

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain responsive design
- Add proper error handling
- Include accessibility features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Privacy & Security

- **HIPAA Compliant**: Designed with healthcare data privacy in mind
- **Secure Authentication**: Powered by Supabase Auth
- **Data Encryption**: All data encrypted in transit and at rest
- **No Third-party Tracking**: Your health data stays private

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/laoluafolami/wellnespal/issues)
- **Documentation**: Check the `/docs` folder
- **Email**: [Your email for support]

## 🙏 Acknowledgments

- **American Heart Association** for BP guidelines
- **American Diabetes Association** for glucose standards
- **Supabase** for the excellent backend platform
- **Vercel** for Next.js framework

---

**⚠️ Medical Disclaimer**: This app is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult your healthcare provider for medical decisions.

---

Made with ❤️ for better health management