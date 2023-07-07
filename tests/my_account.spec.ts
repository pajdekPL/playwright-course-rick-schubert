import { test } from "@playwright/test";
import { getLoginToken } from "../api-calls/getLoginToken";
import { MyAccountPage } from "../page-objects/MyAccountPage";
import { adminDetails } from "../data/userDetails";

test("My Account using cookie injection and mocking network request", async ({
  page,
}) => {
  const loginToken = await getLoginToken(adminDetails);
  await page.route(
    "**/api/user?id=**",
    async (route, request) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "PLAYWRIGHT ERROR FROM MOCKING" }),
      });
    }
  );
  const myAccount = new MyAccountPage(page);
  await myAccount.visit();
  await page.evaluate(
    (loginTokenInsideBrowserCode) => {
      document.cookie = `token=${loginTokenInsideBrowserCode}`;
    },
    [loginToken]
  );
  await myAccount.visit();
  await myAccount.waitForPageHeading();
  await myAccount.waitForErrorMessage();
});
