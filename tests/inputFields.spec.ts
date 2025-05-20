import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Test Case 1: Update pet type', async ({page}) => {
  
  await page.getByTitle('pettypes').click()  
  await expect(page.getByRole('heading',{name:'Pet Types'})).toBeVisible() 
  await (page.getByRole('button',{name:'Edit'}).first()).click()
  await expect(page.getByRole('heading', {name: 'Edit Pet Type'})).toBeVisible()
  const petNameInputField = await page.locator('#name')
  await expect(petNameInputField).toHaveValue('cat')  
  await petNameInputField.click() 
  await petNameInputField.clear()
  await petNameInputField.fill('rabbit')
  await page.getByRole('button',{name:"Update"}).click()
  const firstPetTypeName = page.locator('[name="pettype_name"]').nth(0)
  await expect(firstPetTypeName).toHaveValue('rabbit')  
  await page.getByRole('button',{name:'Edit'}).first().click()
  await petNameInputField.click()
  await petNameInputField.clear()
  await petNameInputField.fill('cat')
  await page.getByRole('button',{name:"Update"}).click()
  await expect(firstPetTypeName).toHaveValue('cat') 
});

test('Test Case 2: Cancel pet type update', async ({page}) => {
  await page.getByTitle('pettypes').click()
  await expect(page.getByRole('heading',{name:'Pet Types'})).toBeVisible()  
  await page.getByRole('button',{name:'Edit'}).nth(1).click()
  const petNameInputField = await page.locator('#name')   
  await petNameInputField.clear()
  await petNameInputField.click()
  await petNameInputField.fill('moose')    
  await expect (petNameInputField).toHaveValue('moose')
  await page.getByRole('button',{name:"Cancel"}).click()
  await expect (page.locator('[name="pettype_name"]').nth(1)).toHaveValue('dog') 
});

  test('Test Case 3: Pet type name is required validation', async ({page}) => {
    await page.getByTitle('pettypes').click()
    await expect(page.getByRole('heading',{name:'Pet Types'})).toBeVisible()
    const thirdeditButton = page.getByRole('button',{name:'Edit'}).nth(2)
    await thirdeditButton.click()
    const petNameInputField = page.locator('#name') 
    await petNameInputField.click()
    await petNameInputField.clear()    
    await expect(page.locator('.help-block')).toHaveText('Name is required')
    await page.getByRole('button',{name:"Update"}).click()
    await expect(page.getByRole('heading', {name: 'Edit Pet Type'})).toBeVisible()
    await page.getByRole('button',{name:"Cancel"}).click()
    await expect(page.getByRole('heading',{name:'Pet Types'})).toBeVisible()
  });
