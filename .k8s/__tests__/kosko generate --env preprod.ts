//

import { getEnvManifests } from "@socialgouv/kosko-charts/testing";
import { project } from "@socialgouv/kosko-charts/testing/fake/gitlab-ci.env";

jest.setTimeout(1000 * 60);
test("kosko generate --preprod", async () => {
  expect(
    await getEnvManifests("preprod", "", {
      ...project("siret2idcc").preprod,
      KUBE_NAMESPACE: "siret2idcc-65-preprod-dev2",
      RANCHER_PROJECT_ID: "c-bd7z2:p-dtlsm",
    })
  ).toMatchSnapshot();
});
