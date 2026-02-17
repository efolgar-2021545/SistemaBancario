# SistemaBancario

**Probar sistema de autenticacion AUTH:** 
/ Para probar el sistema de auth se debe de estar en la ruta:
    :C\\IN6BM Folgar\\KinalBank\\SistemaBancario\\AuthBanco

/ Abrir DockerDesktop y pgAdmin4

/ En PgAdmin crear una base de datos llamada KinalBankAuth **CON OWNER: root**

/ Abrir la terminar de :C\\IN6BM Folgar\\KinalBank\\SistemaBancario\\AuthBanco

/ **Instalar en la terminal pnpm con:** pnpm install nodemon 

/ **En la terminal colocar:** docker run -d --name kinalbank-postgres -e POSTGRES\_DB=KinalBankAuth -e POSTGRES\_USER=root -e POSTGRES\_PASSWORD=admin -p 5436:5432 postgres:16

/ **Verificar** que el contenedor se haya inicializado en docker desktop

/ **En la terminar iniciar la API:** pnpm run dev

/ ***Por ultimo, para probar la API... probar los endpoints en postman de la autenticacion***

***https://www.postman.com/aalvarez-2024004-2419738/workspace/kinalbank-apis***



# SistemaBancario

/ Para probar el sistema bancario se debe de estar en la ruta:

 	:C\\IN6BM Folgar\\KinalBank\\SistemaBancario\\SistemaBancario

/ **Instalar en la terminal pnpm con:** pnpm install nodemon

/ **En la terminar iniciar la API:** pnpm run dev

/ El sistema bancario utiliza autenticación mediante JWT (JSON Web Token).

/ **Por ultimo, para poder acceder a los endpoints del sistema bancario**
/ 1. Primero se debe iniciar sesión en el sistema AuthBanco.
/ 2. Obtener el token JWT(de Admin o de User).
/ 3. Enviar el token en Autorizathion en el thype **Bearer Token** de cada petición en Postman: En algunos se utiliza el token de admin y en otros se usa el de user.

***https://alacan-2024010-3215566.postman.co/workspace/EJEMPLO~3a315322-cf2c-4a64-8448-ab67e4d8e872/request/48332460-d96402d2-8d02-4514-b1f5-ff2c1d5d31ba?action=share&creator=48332460&ctx=documentation***

/ **Para acceder al API de Divisas**
/ Para probar el api de divisas se debe de estar en la ruta:

 	:C\\IN6BM Folgar\\KinalBank\\SistemaBancario\\ApiDivisas

/ **Instalar en la terminal pnpm con:** pnpm install 

/ **En la terminar iniciar la API:** pnpm run dev


