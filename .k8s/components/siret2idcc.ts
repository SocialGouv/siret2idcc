import env from "@kosko/env";

import { create } from "@socialgouv/kosko-charts/components/app";

const manifests = create("siret2idcc", {
  env,
  config: { containerPort: 3000 },
  deployment: {
    image: `harbor.fabrique.social.gouv.fr/cdtn/siret2idcc:${process.env.CI_COMMIT_SHA}`,
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
