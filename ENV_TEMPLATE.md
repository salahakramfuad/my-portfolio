# Environment Variables Template

This file shows the structure of your `.env` or `.env.local` file. Copy this template and fill in your actual values.

## Required Environment Variables

### Firebase Client SDK (Public - starts with NEXT_PUBLIC_)
```env
# Get these from Firebase Console > Project Settings > General > Your apps
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Firebase Admin SDK (Server-side only)
```env
# Option 1: Environment Variables (Recommended)
# Get these from Firebase Console > Project Settings > Service Accounts
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email@your_project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

**Note:** For `FIREBASE_ADMIN_PRIVATE_KEY`, the newlines must be escaped as `\n` in the `.env` file.

### Cloudinary Image Upload
```env
# Format: cloudinary://api_key:api_secret@cloud_name
# Get this from Cloudinary Dashboard > Settings > Product Environment Credentials
CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@dvxxa4sho
```

**OR** use individual variables:
```env
CLOUDINARY_CLOUD_NAME=dvxxa4sho
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Complete .env File Example

```env
# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyExample123456789
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=my-portfolio.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=my-portfolio
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=my-portfolio.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Firebase Admin SDK
FIREBASE_ADMIN_PROJECT_ID=my-portfolio
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk@my-portfolio.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"

# Cloudinary
CLOUDINARY_URL=cloudinary://123456789012345:abcdefghijklmnopqrstuvwxyz@dvxxa4sho
```

## How to Get These Values

### Firebase Client SDK:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon ⚙️ > Project Settings
4. Scroll to "Your apps" section
5. Click the web icon `</>` or create a web app
6. Copy the config values

### Firebase Admin SDK:
1. In Firebase Console > Project Settings > Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Extract the values:
   - `project_id` → `FIREBASE_ADMIN_PROJECT_ID`
   - `client_email` → `FIREBASE_ADMIN_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_ADMIN_PRIVATE_KEY` (with `\n` for newlines)

### Cloudinary:
1. Go to [Cloudinary Dashboard](https://cloudinary.com/)
2. Navigate to Settings > Product Environment Credentials
3. Copy the "Cloudinary URL" or individual credentials

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` or `.env.local` to git (already in `.gitignore`)
- Keep these values secret
- For production, set these in your hosting platform's environment variables
- The `NEXT_PUBLIC_*` variables are exposed to the browser
- The `FIREBASE_ADMIN_*` variables are server-side only
