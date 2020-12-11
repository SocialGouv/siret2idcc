//

import { getEnvManifests } from "@socialgouv/kosko-charts/testing";
import { project } from "@socialgouv/kosko-charts/testing/fake/gitlab-ci.env";

jest.setTimeout(1000 * 60);
test("kosko generate --dev", async () => {
  expect(
    await getEnvManifests("dev", "", {
      ...project("siret2idcc").dev,
      KUBE_NAMESPACE: "siret2idcc-65-master-dev2",
      RANCHER_PROJECT_ID: "c-bd7z2:p-dtlsm",
    })
  ).toMatchSnapshot();
});
