# Social Login Setup Guide

## 1. Google OAuth Setup

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a new project or select an existing one.
3.  Navigate to **APIs & Services** > **Credentials**.
4.  Click **Create Credentials** > **OAuth client ID**.
5.  If prompted, configure the **OAuth consent screen**:
    *   Select **External** (unless you have a Google Workspace organization).
    *   Fill in required fields (App name, User support email, Developer contact email).
    *   Click **Save and Continue**.
6.  Select **Web application** as the Application type.
7.  Name your OAuth client (e.g., "Ayurveda Chat App").
8.  Under **Authorized redirect URIs**, add:
    *   `http://localhost:3000/api/auth/callback/google`
9.  Click **Create**.
10. Copy the **Client ID** and **Client Secret**.

## 2. Microsoft (Azure AD) OAuth Setup

1.  Go to the [Azure Portal](https://portal.azure.com/).
2.  Search for and select **Microsoft Entra ID** (formerly Azure Active Directory).
3.  In the left menu, select **App registrations** > **New registration**.
4.  Fill in the details:
    *   **Name**: Ayurveda Chat App
    *   **Supported account types**: Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts (e.g. Skype, Xbox).
    *   **Redirect URI**: Select **Web** and enter `http://localhost:3000/api/auth/callback/azure-ad`.
5.  Click **Register**.
6.  Copy the **Application (client) ID** and **Directory (tenant) ID** from the Overview page.
7.  In the left menu, select **Certificates & secrets** > **New client secret**.
8.  Add a description and expiry, then click **Add**.
9.  Copy the **Value** of the new client secret (not the Secret ID).

## 3. Configure Environment Variables

Open your `.env` file and fill in the values:

```env
# Google
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Microsoft
AZURE_AD_CLIENT_ID=your_azure_client_id
AZURE_AD_CLIENT_SECRET=your_azure_client_secret
AZURE_AD_TENANT_ID=your_azure_tenant_id

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_key # Generate with: openssl rand -base64 32
```
