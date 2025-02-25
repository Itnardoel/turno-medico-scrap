import { chromium } from 'playwright'
import { format } from '@formkit/tempo'
import { CronJob } from 'cron'
import { styleText } from 'util'

process.loadEnvFile()

const job = new CronJob(
  '0 * * * *', // cronTime every hour
  async () => {
    const browser = await chromium.launch()

    const page = await browser.newPage()

    await page.goto(`${process.env.BASE_URL}`)

    const loginForm = page.locator('#REGISTRO-PASO-1')

    const loginDoc = loginForm.getByPlaceholder('N° Documento')
    const loginPass = loginForm.getByPlaceholder('Clave')
    const loginButton = loginForm.getByRole('button', { name: 'Ingresar' })

    await loginDoc.fill(`${process.env.ACCORD_DNI}`)
    await loginPass.fill(`${process.env.ACCORD_PASS}`)
    await loginButton.click()

    const appointmentButton = page
      .locator('#MENU-Afiliados')
      .getByRole('link', { name: 'Turnos' })
    await appointmentButton.click()

    const newAppointmentButton = page.getByRole('button', {
      name: 'Solicitar Turno',
    })
    await newAppointmentButton.click()

    page.locator('[id="formPrincipal\\:j_idt98_label"]').click()

    const appointmentBy = page.getByRole('option', { name: 'ESPECIALIDAD' })
    await appointmentBy.click()

    page.locator('[id="formPrincipal\\:j_idt109_label"]').click()

    const appointmentCategory = page.getByRole('option', {
      name: 'ENDOCRINOLOGIA',
    })
    await appointmentCategory.click()

    page.locator('[id="formPrincipal\\:j_idt113_label"]').click()

    const appointmentType = page.getByRole('cell', {
      name: 'CONSULTA MEDICA ENDOCRINOLOGIA ADULTOS',
    })
    await appointmentType.click()

    if (page.locator('#mensajePracticaSinTurnoDiv div')) {
      console.log(styleText('bgRedBright', 'No hay turnos disponibles'))
    } else {
      const date = new Date()

      await fetch(
        `https://api.telegram.org/bot${
          process.env.TELEGRAM_KEY
        }/sendMessage?chat_id=-1002377077537&text=${encodeURIComponent(
          `Hay turnos disponibles siendo ${format(date, {
            date: 'full',
            time: 'short',
          })}`
        )}`
      )
      console.log(
        styleText(
          'bgGreenBright',
          `Hay turnos disponibles siendo ${format(date, {
            date: 'full',
            time: 'short',
          })}`
        )
      )
      job.stop()
    }

    browser.close()
  },
  null, // onComplete
  true // start
)
