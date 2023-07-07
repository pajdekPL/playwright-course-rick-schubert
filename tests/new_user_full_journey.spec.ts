import { test } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import { Navigation } from "../page-objects/Navigation";
import { ProductsPage } from "../page-objects/ProductsPage";
import { Checkout } from "../page-objects/Checkout";
import { LoginPage } from "../page-objects/LoginPage";
import { RegisterPage } from "../page-objects/RegisterPage";
import { DeliveryDetailsPage } from "../page-objects/DeliveryDetailsPage";
import { PaymentPage } from "../page-objects/PaymentPage";
import { mockDeliveryDetails } from "../data/deliveryDetails";
import { mockPaymentDetails } from "../data/paymentDetails";

test.skip("New user full end-to-end test journey", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.visit();

  await productsPage.sortByCheapest();

  await productsPage.addProductToBasket(0);
  await productsPage.addProductToBasket(1);
  await productsPage.addProductToBasket(2);

  const navigation = new Navigation(page);
  await navigation.goToCheckout();

  const checkout = new Checkout(page);
  await checkout.removeCheapestProduct();

  await checkout.continueToCheckout();

  const login = new LoginPage(page);
  await login.goToRegisterPage();

  const registerPage = new RegisterPage(page);
  const email = uuidv4() + "@gmail.com";
  const password = uuidv4();
  await registerPage.signUpAsNewUser(email, password);

  const deliveryDetailsPage = new DeliveryDetailsPage(page);
  await deliveryDetailsPage.fillDeliveryDetails(mockDeliveryDetails);
  await deliveryDetailsPage.saveDeliveryDetails();
  await deliveryDetailsPage.continueToPayment();

  const paymentPage = new PaymentPage(page);
  await paymentPage.activateDiscount();
  await paymentPage.fillPaymentDetails(mockPaymentDetails);
  await paymentPage.completePayment();
});
