# Google Cloud Platform Setup Guide

## Prerequisites

1. **Google Cloud Account**: Create one at [cloud.google.com](https://cloud.google.com)
2. **Google Cloud SDK**: Install from [cloud.google.com/sdk](https://cloud.google.com/sdk)
3. **Node.js**: Ensure you have Node.js installed

## Initial Setup

### 1. Create a New GCP Project

```bash
# Create a new project
gcloud projects create your-portfolio-project --name="Portfolio Website"

# Set as active project
gcloud config set project your-portfolio-project

# Enable billing (required for most services)
# Go to: https://console.cloud.google.com/billing/linkedaccount
```

### 2. Enable Required APIs

```bash
# Enable Cloud Storage API
gcloud services enable storage-api.googleapis.com

# Enable Cloud CDN API (optional, for better performance)
gcloud services enable compute.googleapis.com

# Enable Cloud DNS API (if using custom domain)
gcloud services enable dns.googleapis.com
```

### 3. Authenticate

```bash
# Authenticate your account
gcloud auth login

# Set application default credentials
gcloud auth application-default login
```

## Deployment Options

### Option A: Static Hosting (Recommended for Portfolio)

**Cost**: ~$0.01-$1/month depending on traffic
**Best for**: Portfolio websites, blogs, documentation

1. Configure Next.js for static export (already done)
2. Run the deployment script:
   ```bash
   chmod +x deploy-static.sh
   ./deploy-static.sh
   ```

### Option B: Cloud Run (Serverless)

**Cost**: Pay per request, ~$0-$5/month for low traffic
**Best for**: Dynamic sites, APIs, when you need server-side rendering

1. Use the Cloud Run deployment configuration
2. Supports automatic scaling and zero downtime

### Option C: App Engine

**Cost**: ~$7-$25/month minimum
**Best for**: Applications requiring persistent instances

## Custom Domain Setup

1. **Purchase domain** (if you don't have one)
2. **Set up Cloud DNS**:
   ```bash
   # Create DNS zone
   gcloud dns managed-zones create portfolio-zone --dns-name="yourdomain.com." --description="Portfolio DNS zone"
   
   # Get name servers
   gcloud dns managed-zones describe portfolio-zone
   ```
3. **Update domain registrar** with Google Cloud name servers
4. **Create DNS records** pointing to your hosting solution

## SSL Certificate

- **Cloud Storage**: Automatic with Cloud Load Balancer
- **Cloud Run**: Automatic HTTPS
- **Custom Domain**: Use Google-managed SSL certificates

## Monitoring and Analytics

1. **Cloud Monitoring**: Track performance and errors
2. **Google Analytics**: Add tracking to your portfolio
3. **Cloud Logging**: View deployment and runtime logs

## Cost Optimization Tips

1. Use Cloud Storage for static sites (cheapest)
2. Enable Cloud CDN for global performance
3. Set up proper cache headers
4. Monitor usage in Cloud Console
5. Set up billing alerts

## Security Best Practices

1. Use IAM roles properly
2. Enable Cloud Security Scanner
3. Keep dependencies updated
4. Use HTTPS everywhere
5. Regular security audits
