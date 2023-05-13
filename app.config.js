export default {
  "expo": {
    "name": "appgestiontutorias",
    "slug": "appgestiontutorias",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/favicon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/icon_android.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.example.project"
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
        "projectId": "62e0cf09-735d-4795-a1b9-5d2c54c85039"
      }
    }
  }
}
