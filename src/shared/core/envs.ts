import getConfig from "next/config";

const {
  publicRuntimeConfig: { publicEnvs },
} = getConfig();

export const { NEXT_PUBLIC_MW_URL } = publicEnvs;
