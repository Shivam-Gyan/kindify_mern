# Google OAuth Setup Guide for Kindify

This guide will help you set up Google OAuth integration for the Kindify application.

## Prerequisites

- A Google Cloud Console account
- Access to create OAuth 2.0 credentials

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (if not already enabled)

## Step 2: Configure OAuth Consent Screen

1. In the Google Cloud Console, go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type (unless you have a Google Workspace organization)
3. Fill in the required information:
   - App name: "Kindify"
   - User support email: Your email address
   - Developer contact information: Your email address
4. Add the following scopes:
   - `openid`
   - `email`
   - `profile`
5. Add test users (your email addresses) if you're in testing mode

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Set the following:
   - Name: "Kindify Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:5173` (for development)
     - `http://localhost:3000` (if using a different port)
     - Your production domain (when deployed)
   - Authorized redirect URIs:
     - `http://localhost:5173` (for development)
     - Your production domain (when deployed)
5. Click "Create"

## Step 4: Get Your Client ID

After creating the credentials, you'll get a Client ID. Copy this value.

## Step 5: Update the Application

1. Open `src/App.jsx`
2. Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Client ID:

```javascript
const GOOGLE_CLIENT_ID = "your-actual-client-id-here.apps.googleusercontent.com";
```

## Step 6: Backend Integration

You'll need to implement the backend endpoints to handle Google OAuth:

### Required Endpoints:

1. **POST /api/user/google-auth/donor**
   - Handles Google authentication for donors
   - Creates new donor account if user doesn't exist
   - Returns JWT token and user data

2. **POST /api/user/google-auth/ngo**
   - Handles Google authentication for NGOs
   - Creates new NGO account if user doesn't exist
   - Returns JWT token and user data

### Backend Implementation Example:

```javascript
// Example using Node.js and Express
app.post('/api/user/google-auth/:role', async (req, res) => {
  try {
    const { googleToken, role } = req.body;
    
    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;
    
    // Check if user exists
    let user = await User.findOne({ email, role });
    
    if (!user) {
      // Create new user
      user = new User({
        email,
        name,
        profilePicture: picture,
        role,
        googleId: payload.sub,
        isEmailVerified: true
      });
      await user.save();
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture
      }
    });
    
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
});
```

## Step 7: Environment Variables

Create a `.env` file in your project root:

```env
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
JWT_SECRET=your-jwt-secret-here
```

## Step 8: Testing

1. Start your development server
2. Go to the login or signup page
3. Click the "Sign in with Google" button
4. Complete the Google OAuth flow
5. Verify that you're redirected to the appropriate dashboard

## Security Considerations

1. **HTTPS in Production**: Always use HTTPS in production
2. **Token Validation**: Always validate Google tokens on the backend
3. **Secure Storage**: Store sensitive data securely
4. **Rate Limiting**: Implement rate limiting on OAuth endpoints
5. **Error Handling**: Handle OAuth errors gracefully

## Troubleshooting

### Common Issues:

1. **"Invalid Client ID"**: Make sure your Client ID is correct and the domain is authorized
2. **"Redirect URI Mismatch"**: Ensure the redirect URI in Google Console matches your app URL
3. **"OAuth Consent Screen Not Configured"**: Complete the OAuth consent screen setup
4. **"API Not Enabled"**: Enable the Google+ API in your Google Cloud Console

### Debug Tips:

1. Check browser console for JavaScript errors
2. Verify network requests in browser dev tools
3. Check Google Cloud Console logs
4. Ensure all environment variables are set correctly

## Production Deployment

When deploying to production:

1. Update authorized origins and redirect URIs in Google Console
2. Use environment variables for sensitive data
3. Enable HTTPS
4. Set up proper error monitoring
5. Test the OAuth flow thoroughly

## Support

If you encounter issues:

1. Check the [Google OAuth documentation](https://developers.google.com/identity/protocols/oauth2)
2. Review the [@react-oauth/google documentation](https://github.com/MomenSherif/react-oauth)
3. Check your browser's developer console for errors
4. Verify your Google Cloud Console configuration

---

**Note**: This setup guide assumes you're using the @react-oauth/google library. If you're using a different OAuth library, the implementation details may vary. 