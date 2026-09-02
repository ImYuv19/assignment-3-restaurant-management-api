# Deployment Guide - Render.com

This guide explains how to deploy the Restaurant Management API to Render.com

---

## 🚀 Prerequisites

1. **GitHub Account** - Your code must be on GitHub
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **MongoDB Atlas Account** - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

---

## 📝 Step 1: Prepare Your MongoDB Database

### Create MongoDB Atlas Cluster:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create an account
3. Click **Create a Deployment** → Select **Free Tier (M0)**
4. Choose your preferred region
5. Click **Create**

### Get Your Connection String:

1. Go to **Database** → Click **Connect** on your cluster
2. Select **Drivers** → Copy the connection string
3. Replace `<password>` and `<username>` with your database credentials
4. Should look like: `mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority`

---

## 🔐 Step 2: Configure Environment Variables on Render

### Push Your Code to GitHub:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

**Important:** Make sure your `.env` file is in `.gitignore` (it should be by default)

### Create Render Web Service:

1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → Select **Web Service**
3. Connect your GitHub repository
4. Fill in the configuration:
   - **Name:** `restaurant-api` (or your preferred name)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free (or paid if you prefer)

### Add Environment Variables:

1. In the Render Web Service dashboard, scroll to **Environment**
2. Click **Add Environment Variable** and add these:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
JWT_SECRET = your_secure_jwt_secret_key_here_at_least_32_characters
PORT = (leave empty - Render will assign automatically)
```

3. Click **Save Changes**

---

## ✅ Step 3: Deploy

1. Render will automatically deploy when you push to GitHub
2. You can also manually trigger deployment:
   - Click your Web Service
   - Click **Manual Deploy** → **Deploy latest commit**

3. Wait for the build to complete (usually 2-5 minutes)

4. Once deployed, you'll see a URL like: `https://restaurant-api-xxxxx.onrender.com`

---

## 🧪 Step 4: Test Your Deployment

### Test the API:

```bash
# Check if server is running
curl https://your-render-url.onrender.com/health

# Test register endpoint
curl -X POST https://your-render-url.onrender.com/restaurants/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

Or use **Postman** to test all endpoints with your Render URL.

---

## 🐛 Troubleshooting Common Issues

### **Issue: Application Error (500)**

**Cause:** Usually missing environment variables

**Fix:**
1. Go to your Render Web Service → **Environment**
2. Verify `MONGODB_URI` and `JWT_SECRET` are set
3. Click **Save Changes**
4. Trigger a manual redeploy

### **Issue: MongoDB Connection Timeout**

**Cause:** MongoDB Atlas has IP whitelist enabled

**Fix:**
1. Go to MongoDB Atlas → **Network Access**
2. Click **Add IP Address**
3. Select **Allow Access from Anywhere** (0.0.0.0/0) for development
4. Click **Confirm**

### **Issue: H13 Error or Application Crashed**

**Cause:** Server crashed, likely due to missing dependencies or environment variables

**Fix:**
1. Check Render Logs:
   - Go to Web Service → **Logs**
   - Look for error messages
2. Make sure all environment variables are set
3. Ensure `.env` is in `.gitignore` (don't commit it)

### **Issue: Status 502 Bad Gateway**

**Cause:** Server is not responding on the correct port

**Fix:**
1. Our code uses `process.env.PORT` which Render sets automatically
2. Verify `server.js` has the correct PORT configuration
3. Redeploy the application

---

## 📊 Monitoring

### View Logs:
1. Go to your Web Service
2. Click **Logs** tab
3. You'll see:
   - Server startup logs
   - API request logs
   - Connection status

### View Metrics:
1. Click **Metrics** tab
2. Monitor:
   - CPU usage
   - Memory usage
   - Status checks

---

## 💡 Best Practices for Render Deployment

1. **Keep Secrets Safe**
   - Never commit `.env` file to GitHub
   - Always use Render's Environment Variables
   - Rotate JWT_SECRET periodically

2. **Monitor Your Database**
   - Check MongoDB Atlas usage
   - Monitor free tier limits
   - Set up alerts for high usage

3. **Handle Deployments**
   - Always test locally before pushing
   - Use meaningful commit messages
   - Keep dependencies updated

4. **Performance**
   - Free tier apps go to sleep after 15 minutes of inactivity
   - Upgrade to paid plan for production use
   - Consider adding caching

---

## 🔄 Continuous Deployment

Render automatically redeploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update API endpoints"
git push origin main

# Render will automatically build and deploy!
```

---

## 📱 API Base URL (After Deployment)

All API calls should use:
```
https://your-web-service-name.onrender.com
```

Replace endpoints like:
- `http://localhost:4000/restaurants` → `https://your-url.onrender.com/restaurants`

---

## ❓ Still Having Issues?

1. **Check Render Logs** - Go to Logs tab to see error details
2. **Verify Environment Variables** - Ensure all required vars are set
3. **Test Locally First** - Make sure the app works with `npm start`
4. **Check MongoDB Connection** - Test your connection string in MongoDB Compass

---

**Author:** Yuvraj  
**Last Updated:** 2026-09-02
