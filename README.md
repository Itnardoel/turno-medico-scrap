# Playwright Turnos Checker

Este script utiliza [Playwright](https://playwright.dev/) para automatizar la comprobación de turnos médicos en una página web. Está desarrollado con **Node.js y TypeScript** y se ejecuta periódicamente utilizando **cron**. Si se detectan turnos disponibles, envía una notificación por **Telegram** y detiene la ejecución del cron.

## Requisitos

- Node.js instalado (versión 18 o superior recomendada)
- [pnpm](https://pnpm.io/) instalado
- Archivo `.env` con las credenciales de acceso

## Instalación

1. Clonar el repositorio:
   ```sh
   git clone https://github.com/tu_usuario/playwright-turnos-checker.git
   cd playwright-turnos-checker
   ```
2. Instalar dependencias y navegadores de Playwright:
   ```sh
   pnpm install
   ```

> [!NOTE]  
> *(Gracias al script `postinstall` en el `package.json`, Playwright instalará automáticamente los navegadores necesarios.)*
 

## Configuración

Crear un archivo `.env` en la raíz del proyecto con el siguiente formato:

```
DNI=tu_dni
PASSWORD=tu_contraseña
TELEGRAM_BOT_TOKEN=tu_token
TELEGRAM_CHAT_ID=tu_chat_id
```

## Uso

Ejecutar el script con:
```sh
pnpm start
```

El script iniciará sesión en la página, comprobará si hay turnos disponibles y mostrará el resultado en la consola. Si hay turnos disponibles, enviará una notificación por Telegram y finalizará la ejecución del cron.

## Notas

- Asegúrate de que Playwright tenga acceso al navegador necesario.
- Si la página cambia su estructura, puede ser necesario actualizar los selectores en el script.
- Configura el bot de Telegram correctamente para recibir notificaciones.
