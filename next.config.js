/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_JWT_SECRET: "NEXT_AUTH_JWT_SECRET123456789",
    NEXTAUTH_SECRET: "NEXT_AUTH_SECRET123456789",
    NEXTAUTH_URL: "http://localhost:3000/api/auth",
    GITHUB_ID: "Iv1.086314b3b373f43a",
    GITHUB_SECRET: "96b2426a904f616abb29b182e919680505cb3ab8",
    GOOGLE_CLIENT_ID:
      "907200563302-l7ktkl32e4s6dteie8g5tq4v385r58v7.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    NEXT_PUBLIC_TBDB_API_KEY: "bf94cd9803c55116e4a1c2502eed1f3a",
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "image.tmdb.org",
    ],
  },
};

module.exports = nextConfig;
