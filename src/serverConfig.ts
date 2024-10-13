import { z } from "zod";
export const allBaseUrls = {
  local: "http://localhost:8070",
  uat: "http://3.235.107.223:5000",
  ec2: "http://10.10.19.229:8070",
  aws: "http://18.216.3.227:8070",
  staging: "https://backend-staging.ellacor.com",

  
};
//   later will setup env variables

//production
export const baseUrl = process.env.REACT_APP_API_URL || allBaseUrls.ec2;
// export const baseUrl = allBaseUrls.local
//export const baseUrl = allBaseUrls.aws
///statging url
// export const baseUrl = allBaseUrls.staging
// export const baseUrl = allBaseUrls.ec2

// export const shopifyBaseUrl = envVariables.REACT_APP_SHOPIFY_BASE_URL;
// export const shopifyBaseUrl = "https://quick-start-240cd931.myshopify.com";

const envSchema = z.object({
  REACT_APP_API_URL: z.string().default(allBaseUrls.uat),

});

export type EnvType = z.infer<typeof envSchema>;
//  typeof process.env;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvType {}
  }
}
// type envType = typeof process.env
// const envVariables = envSchema.parse(process.env);
// export const shopifyConfig = {
//   BASE_URL: shopifyBaseUrl,
//   API_URL: `${shopifyBaseUrl}/api/graphql`,
//   CHECKOUT_URL: `${shopifyBaseUrl}/checkout`,
//   ACCESS_TOKEN: envVariables.REACT_APP_SHOPIFY_SECRET_TOKEN,
// } as const;
export const PUBLIC_URL = process.env.PUBLIC_URL;

export const isDevEnv = process.env.NODE_ENV === "development";
export const isLocalUrl = baseUrl === allBaseUrls.local;

export const tokenPayId =
  process.env.REACT_APP_TOKEN_PAY || "tokenpay14980api20230303110325758";
