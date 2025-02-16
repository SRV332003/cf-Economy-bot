const env = {
  NODE_ENV: process.env.NODE_ENV || "",
  MONGO_URI: process.env.MONGO_URI || "",
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID || "",
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET || "",
};

/**
 * @description  Checks if all env's are defined i.e have some true value
 *  NOTE: will through error if boolean false is set to some env,
 * */
function handleEnvCheck() {
  const envArray = Object.values(env)
  for (let i = 0; i < envArray.length; i++) {
    if (!envArray[i])
      throw new Error(`missing env value at index ${i}`)
  }


  console.log("ENV Check Passed")
}
handleEnvCheck()
export const config = {
  env,
  healthCheck: handleEnvCheck
};
