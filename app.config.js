export default {
  "expo": {
    "name": "apptutorias",
    "slug": "apptutorias",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/launcher.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/launcher.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.apptutorias.utpl"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      "eas": {
        "projectId": "907367b5-3033-48d5-95bf-175e2023d1b9"
      }
    }
  }
}
