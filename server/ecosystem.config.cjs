module.exports = {
  apps: [
    {
      script: "server.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: process.env.PORT,
      },
      watch: ".",
    },
  ],
};

// module.exports = {
//   apps: [
//     {
//       name: "DegreeDay",
//       script: "./server.js",
//       env: {
//         NODE_ENV: "development",
//       },
//       env_production: {
//         NODE_ENV: "production",
//         PORT: process.env.PORT,
//       },
//     },
//   ],
// };
