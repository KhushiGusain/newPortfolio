#!/bin/bash

# Deploy Next.js Portfolio to Google Cloud Storage
# Make sure you have Google Cloud SDK installed and authenticated

# Configuration - UPDATE THESE VALUES
PROJECT_ID="your-project-id"
BUCKET_NAME="your-portfolio-bucket"
DOMAIN_NAME="your-domain.com"  # Optional: your custom domain

echo "🚀 Starting deployment to Google Cloud Storage..."

# Step 1: Build the Next.js app for static export
echo "📦 Building Next.js application..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

# Step 2: Set the active project
echo "🔧 Setting GCP project to $PROJECT_ID..."
gcloud config set project $PROJECT_ID

# Step 3: Create storage bucket (if it doesn't exist)
echo "🪣 Creating storage bucket..."
gsutil mb -c STANDARD -l us-central1 gs://$BUCKET_NAME 2>/dev/null || echo "Bucket already exists or creation failed"

# Step 4: Make bucket publicly readable
echo "🌐 Making bucket publicly accessible..."
gsutil iam ch allUsers:objectViewer gs://$BUCKET_NAME

# Step 5: Configure bucket for website hosting
echo "🏠 Configuring bucket for website hosting..."
gsutil web set -m index.html -e 404.html gs://$BUCKET_NAME

# Step 6: Upload the static files
echo "📤 Uploading files to bucket..."
gsutil -m rsync -r -d ./out gs://$BUCKET_NAME

# Step 7: Set proper cache headers for static assets
echo "🗄️ Setting cache headers..."
gsutil -m setmeta -h "Cache-Control:public, max-age=31536000" gs://$BUCKET_NAME/**/*.{js,css,png,jpg,jpeg,gif,svg,ico,woff,woff2}

# Step 8: Set HTML cache headers
gsutil -m setmeta -h "Cache-Control:public, max-age=3600" gs://$BUCKET_NAME/**/*.html

echo "✅ Deployment complete!"
echo "🌐 Your website is available at: https://storage.googleapis.com/$BUCKET_NAME/index.html"
echo "🔗 Or if using custom domain: https://$DOMAIN_NAME"

# Optional: Set up Cloud CDN for better performance
echo ""
echo "💡 For better performance, consider setting up Cloud CDN:"
echo "   1. Go to Cloud Console > Network Services > Cloud CDN"
echo "   2. Create a new CDN with your bucket as origin"
echo "   3. Configure your custom domain"
