import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.aqualeaf.peoplefundme',
  appName: 'ionic fundriser',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
