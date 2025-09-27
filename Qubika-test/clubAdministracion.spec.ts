//import { test, expect } from '@playwright/test';
import { test, expect } from '../testconfig/fixture';
import { ClubAdministracionPage } from './Qubika-page/clubAdministracionPage';

test.use({ viewport: { width: 668, height: 440 } });




test('e2e', async ({ request, page,creds }) => {

  const n = Math.floor(Math.random() * 1_000_000);
  const nombreCategoria='automation Category '+n;
  const nombreSubCategoria='automation SubCategory '+n;

    const res = await request.post('https://api.club-administration.qa.qubika.com/api/auth/register', {
    data: { ...creds, 
      "roles": ["ROLE_ADMIN"]
    }, 
    headers: { 'Content-Type': 'application/json' },
  });

  expect(res.ok()).toBeTruthy();
  const body = await res.json();

  expect(body).toHaveProperty('id');
  console.log(`Usuario creado: ${body.userName } / ${body.email} / ${body.id}`);
  await page.goto('https://club-administration.qa.qubika.com/');

//Login
  await expect.soft(page.getByText('Por favor ingrese correo y contraseña')).toBeVisible();
  const clubAdminPage = new ClubAdministracionPage(page);
  await clubAdminPage.fillUserEmail(creds.email);
  await clubAdminPage.fillUserPassword(creds.password);
  await clubAdminPage.clickLoginButton();
  await clubAdminPage.VerifyLoginIsSuccessful(page);
  
  //Go to User Profile
  await clubAdminPage.clickAvatarImage();
  await clubAdminPage.clickProfileOption();
  await clubAdminPage.VerifyUserProfilePageIsVisible(page);

  await page.setViewportSize({ width: 1280, height: 720 });


  //Add New Category
  await clubAdminPage.clickTipoDeCategoriaMenuBotton();
  await clubAdminPage.VerifyTituloDeLaPaginaCategoriaIsVisible(page);
  await clubAdminPage.clickAdicionarBotton();
  await clubAdminPage.VerifyTituloPopUpIsVisible(page);
  await clubAdminPage.fillNombreCategoriaInput(nombreCategoria);
  await clubAdminPage.clickAceptarBotton();
  await page.getByText('461').click()
  await clubAdminPage.VerifyCategoriaCreadaIsVisible(nombreCategoria, page);
  


// Add new Subcategory
await clubAdminPage.clickAdicionarBotton();
await clubAdminPage.VerifyTituloPopUpIsVisible(page);
await clubAdminPage.fillNombreCategoriaInput(nombreSubCategoria);
await clubAdminPage.clickCheckEsSubCategoria(); 
await clubAdminPage.SelectCategoriaPadre(nombreCategoria, page);
await clubAdminPage.clickAceptarBotton();
await page.getByText('461').click()
await clubAdminPage.VerifyCategoriaCreadaIsVisible(nombreSubCategoria, page);
  
});
