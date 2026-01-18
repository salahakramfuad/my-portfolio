# Portfolio Dashboard Setup Guide

This guide will help you set up the portfolio dashboard with Firebase authentication and Cloudinary integration.

## Prerequisites

1. Firebase project with Firestore and Authentication enabled
2. Cloudinary account
3. Node.js 18+ installed

## Step 1: Firebase Setup

### 1.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable **Authentication** with Email/Password provider
4. Enable **Firestore Database** in production mode (we'll set up security rules later)

### 1.2 Get Firebase Client SDK Configuration

1. Go to Project Settings > General
2. Scroll down to "Your apps" section
3. Click on the web icon (`</>`) to add a web app
4. Copy the configuration values

### 1.3 Get Firebase Admin SDK Credentials

1. Go to Project Settings > Service Accounts
2. Click "Generate new private key"
3. Save the JSON file securely (DO NOT commit to git)
4. Place it as `lib/firebase-service-account.json` OR use environment variables

## Step 2: Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com/) (free tier available)
2. Go to Dashboard > Settings > Product Environment Credentials
3. Copy your Cloudinary URL or individual credentials

## Step 3: Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK (Option 1: Environment Variables)
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email@your_project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"

# Cloudinary
CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@dvxxa4sho
```

### Option 2: Service Account JSON File

Instead of using environment variables for Admin SDK, you can:
1. Download the service account JSON from Firebase Console
2. Save it as `lib/firebase-service-account.json`
3. Make sure it's in `.gitignore` (already added)

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Firestore Security Rules

In Firebase Console, go to Firestore Database > Rules and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Portfolio data (public read, authenticated write)
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Resume downloads (authenticated read, public write for tracking)
    match /resumeDownloads/{downloadId} {
      allow read: if request.auth != null;
      allow create: if true;
    }
  }
}
```

## Step 6: Create Your First Admin Account

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/login`
3. Click "Register" and create an account
4. **Verify your email** (check your inbox)
5. Log in with your verified account

## Dashboard Features

### Projects Management (`/dashboard`)
- View all projects
- Add new projects
- Edit existing projects
- Delete projects
- Set featured projects (by reordering - first project is featured)

### Experience Management (`/dashboard/experience`)
- Manage work experience entries
- Add company, dates, description, tech stack
- Add links to live sites, repos, and case studies

### Skills Management (`/dashboard/skills`)
- Add/remove technical skills
- Comma-separated input for quick addition

### Resume Management (`/dashboard/resume`)
- Upload PDF resume (max 10MB)
- View current resume
- Track download statistics
- See download history with timestamps

## API Endpoints

All API routes require authentication (except download tracking):

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Save projects (requires auth)
- `GET /api/experience` - Get all experience
- `POST /api/experience` - Save experience (requires auth)
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Save skills (requires auth)
- `GET /api/resume` - Get resume info and download stats
- `POST /api/resume` - Upload resume (requires auth)
- `POST /api/resume/download` - Track download (public)
- `POST /api/auth/session` - Create session cookie
- `GET /api/auth/session` - Get current session
- `DELETE /api/auth/session` - Logout
- `POST /api/upload-image` - Upload image to Cloudinary (requires auth)

## Data Structure

### Firestore Collections

```
portfolio/
  projects/
    items: Array<Project>
  experience/
    items: Array<Experience>
  skills/
    items: Array<string>
  resume/
    url: string
    filename: string
    publicId: string
    uploadedAt: string
    size: number

resumeDownloads/
  {downloadId}/
    timestamp: Timestamp
    userAgent: string
    ip: string
```

## Frontend Integration

The portfolio components will automatically fetch data from Firebase:

- **Projects**: Will fetch from `/api/projects`
- **Experience**: Will fetch from `/api/experience`
- **Skills**: Will fetch from `/api/skills`
- **Resume**: Will fetch from `/api/resume` and track downloads

Update your components to fetch from these endpoints instead of hardcoded data.

## Troubleshooting

### "Unauthorized" errors
- Make sure you're logged in with a verified email
- Check that the session cookie is being set
- Verify Firebase Admin SDK credentials

### Image upload fails
- Check Cloudinary URL format: `cloudinary://api_key:api_secret@cloud_name`
- Verify file size is under 5MB
- Ensure file type is JPEG, PNG, WebP, or GIF

### Resume upload fails
- Check file is PDF format
- Verify file size is under 10MB
- Ensure Cloudinary is properly configured

### Data not loading
- Check Firestore security rules allow read access
- Verify collection structure matches expected format
- Check browser console for errors

## Security Notes

1. **Never commit** `.env.local` or `firebase-service-account.json` to git
2. Firebase Admin credentials are server-side only
3. All write operations require authentication
4. Download tracking is public but doesn't expose sensitive data

## Production Deployment

1. Set all environment variables in your hosting platform (Vercel, Netlify, etc.)
2. For Firebase Admin SDK, use environment variables (not JSON file)
3. Ensure Firestore security rules are properly configured
4. Test authentication and data operations thoroughly

## Support

For issues or questions, check the Firebase and Cloudinary documentation or review the error messages in the browser console and server logs.
