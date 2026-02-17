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




**Probar sistema bancario KINALBANK:**
/ Para probar el sistema bancario se debe de estar en la ruta:

 	:C\\IN6BM Folgar\\KinalBank\\SistemaBancario\\SistemaBancario



/ Abrir DockerDesktop y pgAdmin4



/ Abrir la terminar de :C\\IN6BM Folgar\\KinalBank\\SistemaBancario\\AuthBanco





/ **Instalar en la terminal pnpm con:** pnpm install nodemon



/ **En la terminar iniciar la API:** pnpm run dev

