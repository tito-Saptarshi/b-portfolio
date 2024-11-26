// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ['lh3.googleusercontent.com', 'c4.wallpaperflare.com', "utfs.io"],
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Specify "https" for security
        hostname: '**', // Match any hostname
      },
    ],
  },
};

export default nextConfig;
