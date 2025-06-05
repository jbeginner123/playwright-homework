import {test,expect} from '@playwright/test';

test.beforeEach(async({page}) => {
  await page.goto('/')
})

test ('Test Case 1: Validate selected specialties', async({page}) => {
    await page.getByRole('button',{name:'Veterinarians'}).click()
    await page.getByRole('link',{name:"All"}).click()
    await expect(page.getByRole('heading',{name:'Veterinarians'})).toBeVisible()
    await page.getByRole('button',{name:'Edit'}).nth(1).click()
    const selectedSpecialities = page.locator('.selected-specialties')    
    await expect(selectedSpecialities).toHaveText('radiology')
    await selectedSpecialities.click()
    expect(await page.getByRole('checkbox', {name:"radiology"}).isChecked()).toBeTruthy()
    expect(await page.getByRole('checkbox', {name:"surgery"}).isChecked()).toBeFalsy()
    expect(await page.getByRole('checkbox', {name:"dentistry"}).isChecked()).toBeFalsy()
    await page.getByRole('checkbox', {name: "surgery"}).check()
    await page.getByRole('checkbox', {name: "radiology"}).uncheck()
    await expect(selectedSpecialities).toHaveText('surgery')   
    await page.getByRole('checkbox', {name: "dentistry"}).check()
    await expect(page.locator('#vet_form .control-group .form-group .control-label')).toContainText('Specialties')
    await expect(selectedSpecialities).toHaveText('surgery, dentistry')
})

test ('Test Case 2: Select all specialties', async({page}) => {
    await page.getByRole('button',{name:'Veterinarians'}).click()
    await page.getByRole('link',{name:"All"}).click()
    await page.getByRole('button',{name:'Edit'}).nth(3).click() 
    const selectedSpecialities = page.locator('.selected-specialties')    
    await expect(page.locator('[for="spec"]')).toContainText('Specialties')
    await expect(selectedSpecialities).toHaveText('surgery') 
    await selectedSpecialities.click()
    const allBoxes = page.getByRole('checkbox')
    for (const box of await allBoxes.all()){
        await box.check({force:true})
        expect(await box.isChecked()).toBeTruthy()
    }
    await expect(selectedSpecialities).toHaveText('surgery, radiology, dentistry')

})

test ('Test Case 3: Unselect all specialties', async({page}) => {
    await page.getByRole('button',{name:'Veterinarians'}).click()
    await page.getByRole('link',{name:"All"}).click()
    await page.getByRole('button',{name:'Edit'}).nth(2).click() 
    await expect(page.locator('#vet_form .control-group .form-group .control-label')).toContainText('Specialties')  
    const selectedSpecialities = page.locator('.selected-specialties') 
    await expect(selectedSpecialities).toHaveText('dentistry, surgery') 
    await selectedSpecialities.click()
     const allBoxes = page.getByRole('checkbox')
    for (const box of await allBoxes.all()){
        await box.uncheck({force:true})
        expect(await box.isChecked()).toBeFalsy()
    }
    await expect(selectedSpecialities).toBeEmpty()


})