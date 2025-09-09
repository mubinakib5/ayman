# Environment Setup Guide

## Database Configuration

This application requires a MongoDB database. You have two options:

### Option 1: MongoDB Atlas (Recommended for Production)

1. **Create a MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account

2. **Create a New Cluster**
   - Choose the free tier (M0)
   - Select your preferred region
   - Create the cluster

3. **Set Up Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password
   - Grant "Read and write to any database" permissions

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development: Add your current IP
   - For production: Add `0.0.0.0/0` (allow access from anywhere)

5. **Get Connection String**
   - Go to "Clusters" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<dbname>` with your values

6. **Update .env.local**
   ```
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/decor-ceo-portfolio?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB (Development Only)

1. **Install MongoDB**
   ```bash
   # macOS with Homebrew
   brew tap mongodb/brew
   brew install mongodb-community
   
   # Start MongoDB
   brew services start mongodb/brew/mongodb-community
   ```

2. **Update .env.local**
   ```
   MONGODB_URI=mongodb://localhost:27017/decor-ceo-portfolio
   ```

## Other Environment Variables

Update the following variables in `.env.local` with your actual values:

```env
# NextAuth (generate a random secret)
NEXTAUTH_SECRET=your-secure-random-secret-here
NEXTAUTH_URL=http://localhost:3000

# SSLCommerz (for payment processing)
SSLCOMMERZ_STORE_ID=your-sslcommerz-store-id
SSLCOMMERZ_STORE_PASSWORD=your-sslcommerz-password

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Admin credentials
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-secure-admin-password
```

## Vercel Deployment

When deploying to Vercel:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add all the environment variables from your `.env.local` file
4. Make sure to use your production MongoDB Atlas connection string

## Testing the Connection

After setting up your database:

1. Restart your development server: `npm run dev`
2. Try accessing any admin API route to test the connection
3. Check the console for any connection errors