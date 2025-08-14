#!/bin/bash

# Deploy Next.js Portfolio to Google Cloud Run
# Make sure you have Google Cloud SDK installed and authenticated

# Configuration - UPDATE THESE VALUES
PROJECT_ID="your-project-id"
SERVICE_NAME="portfolio-app"
REGION="us-central1"

echo "🚀 Starting deployment to Google Cloud Run..."

# Step 1: Set the active project
echo "🔧 Setting GCP project to $PROJECT_ID..."
gcloud config set project $PROJECT_ID

# Step 2: Enable required APIs
echo "🔌 Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com

# Step 3: Build and deploy to Cloud Run
echo "🏗️ Building and deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --source . \
    --region $REGION \
    --platform managed \
    --allow-unauthenticated \
    --memory 1Gi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10 \
    --port 3000

# Check if deployment was successful
if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Getting service URL..."
    SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)')
    echo "🔗 Your website is live at: $SERVICE_URL"
else
    echo "❌ Deployment failed. Please check the logs."
    exit 1
fi

# Optional: Set up custom domain
echo ""
echo "💡 To set up a custom domain:"
echo "   1. Go to Cloud Console > Cloud Run > $SERVICE_NAME"
echo "   2. Click 'Manage Custom Domains'"
echo "   3. Add your domain and follow the verification steps"
