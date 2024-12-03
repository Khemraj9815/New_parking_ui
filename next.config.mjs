/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/live-feed', // The route you want to proxy
          destination: 'http://127.0.0.1:5000/live-feed', // Flask backend URL
        },
      ];
    },
  };
  
  export default nextConfig;
  