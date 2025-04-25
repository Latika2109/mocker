/** @type { import("drizzle-kit").Config } */

export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  
  dbCredentials:{
    url:'postgresql://neondb_owner:npg_VJO3KZfsz5Tu@ep-flat-fog-a8hjye91-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
  }
};