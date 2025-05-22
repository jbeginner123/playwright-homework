import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test ('Test Case 1: Validate selected specialties', async({page}) => {
    await page.getByRole('button',{name:'Veterinarians'}).click()
    await page.getByRole('link',{name:"All"}).click()
    await expect(page.getByRole('heading',{name:'Veterinarians'})).toBeVisible()
    await page.getByRole('button',{name:'Edit'}).nth(1).click()       
    await expect (page.locator('#vet_form .control-group .form-group .control-label')).toContainText('Specialties')  
    await expect (page.locator('.selected-specialties')).toHaveText('radiology')
    await (page.locator('.dropdown-arrow')).click()
    expect (await page.getByRole('checkbox', {name:"radiology"}).isChecked()).toBeTruthy()
    expect (await page.getByRole('checkbox', {name:"surgery"}).isChecked()).toBeFalsy()
    expect (await page.getByRole('checkbox', {name:"dentistry"}).isChecked()).toBeFalsy()
    await page.getByRole('checkbox', {name: "surgery"}).check({force:true})
    await page.getByRole('checkbox', {name: "radiology"}).uncheck({force:true})
    await expect (page.locator('.selected-specialties')).toHaveText('surgery')
    await page.getByRole('checkbox', {name: "dentistry"}).check({force:true})
    await expect (page.locator('#vet_form .control-group .form-group .control-label')).toContainText('Specialties')
    await expect (page.locator('.selected-specialties')).toHaveText('surgery, dentistry')
})

test ('Test Case 2: Select all specialties', async({page}) => {
    await page.getByRole('button',{name:'Veterinarians'}).click()
    await page.getByRole('link',{name:"All"}).click()
    await page.getByRole('button',{name:'Edit'}).nth(3).click() 
    await expect (page.locator('#vet_form .control-group .form-group .control-label')).toContainText('Specialties')  
    await expect (page.locator('.selected-specialties')).toHaveText('surgery') 
    await (page.locator('.dropdown-arrow')).click()
    const allBoxes = page.getByRole('checkbox')
    for (const box of await allBoxes.all()){
        await box.check({force:true})
        expect(await box.isChecked()).toBeTruthy()
    }
    await expect (page.locator('.selected-specialties')).toHaveText('surgery, radiology, dentistry')

})

test ('Test Case 3: Unselect all specialties', async({page}) => {
    await page.getByRole('button',{name:'Veterinarians'}).click()
    await page.getByRole('link',{name:"All"}).click()
    await page.getByRole('button',{name:'Edit'}).nth(2).click() 
    await expect (page.locator('#vet_form .control-group .form-group .control-label')).toContainText('Specialties')  
    await expect (page.locator('.selected-specialties')).toHaveText('dentistry, surgery') 
    await (page.locator('.dropdown-arrow')).click()
     const allBoxes = page.getByRole('checkbox')
    for (const box of await allBoxes.all()){
        await box.uncheck({force:true})
        expect(await box.isChecked()).toBeFalsy()
    }
    await expect (page.locator('.selected-specialties')).toHaveText('')


})