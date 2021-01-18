import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/app";

const IMAGE_TAG = process.env.CI_COMMIT_TAG
  ? process.env.CI_COMMIT_TAG.replace(/^v/, "")
  : process.env.CI_COMMIT_SHA;

const manifests = create("siret2idcc", {
  env,
  config: { containerPort: 3000 },
  deployment: {
    image: `harbor.fabrique.social.gouv.fr/cdtn/siret2idcc:${IMAGE_TAG}`,
    container: {
      resources: {
        requests: {
          cpu: "100m",
          memory: "128Mi",
        },
        limits: {
          cpu: "500m",
          memory: "1280Mi",
        },
      },
    },
  },
});

export default manifests;
