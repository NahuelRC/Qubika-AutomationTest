import { Locator, Page } from "@playwright/test";
import { expect } from "../../testconfig/fixture";

export class ClubAdministracionPage {
private readonly UserEmail: Locator
private readonly UserPassword: Locator
private readonly LoginButton: Locator   
private readonly avatarImage : Locator
private readonly profileOption : Locator
private readonly UserProfilePage: Locator
private readonly TipoDeCategoriaMenuBotton: Locator
private readonly TituloDeLaPagina: Locator
private readonly AdicionarBotton: Locator
private readonly TituloPopUp: Locator
private readonly NombreCategoriaInput: Locator
private readonly AceptarBotton: Locator
private readonly CheckEsSubCategoria: Locator




constructor(page: Page){
    this.UserEmail = page.locator('input[type="email"]');
    this.UserPassword = page.locator('input[type="password"]');
    this.LoginButton = page.locator('button:has-text("Autenticar")'); 
    this.avatarImage  = page.getByAltText(/image placeholder/i) ;
    this.profileOption = page.getByText('My profile');
    this.UserProfilePage = page.locator('h1', { hasText: 'Hello Nahuel' });
    this.TipoDeCategoriaMenuBotton = page.getByText(' Tipos de Categorias ');
    this.TituloDeLaPagina = page.locator('h3', { hasText: 'Tipos de categorías' });
    this.AdicionarBotton = page.locator('button:has-text("  Adicionar ")');
    this.TituloPopUp = page.locator('h1', { hasText: 'Adicionar tipo de categoría' });
    this.NombreCategoriaInput = page.locator('#input-username');
    this.AceptarBotton = page.locator('button:has-text(" Aceptar")');
    this.CheckEsSubCategoria = page.getByText('Es subcategoria?');
    
    }


async fillUserEmail(UserEmail: string){
    await this.UserEmail.fill(UserEmail)
}


async fillUserPassword(UserPassword: string){
    await this.UserPassword.fill(UserPassword)
}

async clickLoginButton(){
    await this.LoginButton.click()
}   

async VerifyLoginIsSuccessful(page: Page){
  await expect.soft(this.avatarImage ).toBeVisible();
}  


async clickAvatarImage(){
  await this.avatarImage.click();  
}

async clickProfileOption(){
  await this.profileOption.click();
}

async VerifyUserProfilePageIsVisible(page: Page ){
    await expect.soft(this.UserProfilePage).toBeVisible();
}

async clickTipoDeCategoriaMenuBotton(){
  await this.TipoDeCategoriaMenuBotton.click();
}

async VerifyTituloDeLaPaginaCategoriaIsVisible(page: Page ){
    await expect.soft(this.TituloDeLaPagina).toBeVisible();
}

async clickAdicionarBotton(){
    await this.AdicionarBotton.click();
}

async VerifyTituloPopUpIsVisible(page: Page ){ 
    await expect.soft(this.TituloPopUp).toBeVisible();
}

async fillNombreCategoriaInput(nombreCategoria: string){
    await this.NombreCategoriaInput.fill(nombreCategoria);
}

async clickAceptarBotton(){
    await this.AceptarBotton.click();
}

async VerifyCategoriaCreadaIsVisible(nompbreCategoria: string, page: Page){
    await page.getByText('461').click(); 
    const cell = page.getByRole('cell', { name: nompbreCategoria });
    await cell.waitFor({ state: 'visible' });
    await expect.soft(cell).toBeVisible();
}

async clickCheckEsSubCategoria(){
    await this.CheckEsSubCategoria.click();
}


async SelectCategoriaPadre(nombreCategoria: string, page: Page){
    
    const categorySelect = page.locator('ng-select[formcontrolname="categoryId"]');
    await categorySelect.locator('.ng-select-container').click();
    await categorySelect.locator('.ng-input > input[type="text"]').fill(nombreCategoria);
    await page.waitForTimeout(3000);
    await page.keyboard.press('Enter');
}

async  clickNextUntilDisabled(page: Page, maxIterations = 10) {
  await page.getByText('461').click(); 
  const nextLi = page.locator('li.page-item:has(.fa-angle-right)');
  const nextLink = nextLi.locator('a.page-link');

  // Asegura que exista el control antes de empezar
  await nextLi.waitFor({ state: 'visible' });

  for (let i = 0; i < maxIterations; i++) {
    const cls = (await nextLi.getAttribute('class')) ?? '';
    const isDisabled = cls.split(/\s+/).includes('disabled');
    if (isDisabled) return ; // listo
    await nextLink.click();
  }

 console.log('Next nunca quedó deshabilitado (se alcanzó maxIterations).');
}

}
 export default ClubAdministracionPage;

