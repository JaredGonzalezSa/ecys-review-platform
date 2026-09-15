# 🔐 Credenciales y Variables de Entorno

> [!WARNING]
> **Aviso de Seguridad:** En un entorno laboral real profesional, NUNCA se suben contraseñas a un repositorio (GitHub). Se comparten por canales seguros. Sin embargo, para facilitar el desarrollo ágil de esta práctica universitaria, centralizamos las credenciales aquí.

Para que el servidor Backend les funcione localmente, cada desarrollador debe crear un archivo llamado `.env` dentro de la carpeta `/backend` (al mismo nivel que `server.js`) y pegar **exactamente** el siguiente contenido. 

Con esto, **todos estaremos conectados a la misma Base de Datos en la nube** (TiDB), por lo que si alguien agrega un dato, todos los demás lo verán inmediatamente. ¡No necesitan instalar MySQL localmente!

```env
DB_HOST=gateway01.us-east-1.prod.aws.tidbcloud.com
DB_PORT=4000
DB_USER=3HGW9fvNG3YFai2.root
DB_PASS=kTvI2hcU6wmCcqMk
DB_NAME=ecys_db
JWT_SECRET=super_secret_jwt_key_ecys_2026
PORT=3000
```
