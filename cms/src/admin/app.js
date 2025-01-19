export default {
  config: {
    // Replace these hex colors with your site's color scheme
    theme: {
      colors: {
        primary100: '#f6ecfc',
        primary200: '#e0c1f4',
        primary500: '#ac73e6',
        primary600: '#9736e8',
        primary700: '#8312d1',
        danger700: '#b72b1a'
      },
    },
    // Add your custom favicon
    head: {
      favicon: '/favicon.ico',
    },
    // Customize the admin panel's title
    auth: {
      logo: '/logo.png', // Add your logo here
    },
    menu: {
      logo: '/logo.png', // Add your logo here
    },
    // Add translations if needed
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "Perception Learning",
      },
    },
  },
  bootstrap() {},
}; 