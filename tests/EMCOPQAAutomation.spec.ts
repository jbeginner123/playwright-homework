import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('https://ci-qa.devcop.em.vic.gov.au/sadisplay/main.seam')
  await (page.getByRole('button', {name: 'Login'})).click()
})

test('Verification of EMCOP Login Page UI', async ({page}) => {
  await expect (page.getByRole('heading', {name: 'Login to EM-COP'})).toBeVisible()
  await expect (page.getByRole('tab').filter({hasText:'Home'})).toBeVisible() 
  await expect (page.getByRole('tab').filter({hasText:'Login'})).toBeVisible()
  await expect (page.getByRole('tab').filter({hasText:'Register'})).toBeVisible()
  await expect (page.locator('.panel-title').filter({hasText:'Latest News'})).toBeVisible()
  await expect (page.getByRole('heading', {name: 'Login to EM-COP'})).toBeVisible()
  await expect (page.getByRole('textbox', {name: 'Email'})).toBeVisible() 
  await expect (page.getByRole('textbox', {name: 'Password'})).toBeVisible()   
  await expect (page.locator('#form-signin').getByRole('button', { name: 'Register' })).toBeVisible()
  await expect (page.getByRole('button', {name: 'Sign in'})).toBeVisible()
  await expect (page.locator('[href="forget-password.seam"]')).toBeVisible()
  await expect (page.getByText('EM-COP SUPPORTFor urgent enquiries phone (03) 8822 8181, otherwise Submit a request')).toBeVisible();
})

test('Verification of Login functionality', async ({page}) => {  
  await page.getByPlaceholder('Email').fill('Jeff.Varghese@justice.vic.gov.au')
  await page.getByPlaceholder('Password').fill('AppleLemonOranges@12')
  await page.getByRole('button', {name: 'Sign in'}).click()
  
})