## IMPORTANT FOR GIT BASH: WORK WITH YOUR OWN ACCOUNT AND DELETE YOUR CREDENTIALS ON A PUBLIC WORKSPACE


1. para mirar con que cuenta esta operando gitbash


git config user.name


lo mismo, para saber con que email esta operando


git config user.email


toca configurar esto en gitbash para operarlo con mi cuenta

bash

    $ git config --global user.name "OllinDesigns" && git config --global user.email cesarvergara@tutanota.com


estos en windows para hacer logout

cmdkey /delete:LegacyGeneric:target=git:https://github.com


este para borrar todas las configuraciones

git config --global --unset-all


## keep your branches working with the updated intalation of the app

by conflicts, clear the cache and run npm install again

npm cache clean --force

Remove the node_modules Folder and package-lock.json:

rm -rf node_modules
rm package-lock.json

npm install



## 

https://stackoverflow.com/questions/28238037/git-log-out-user-from-command-line

- borrar folders en ubuntu terminal

rm -r /path/to/folder


para insertar a la base de datos desde el terminal

// npx ts-node server/src/scripts/insertData.ts

## tree

tree -I 'node_modules|notasInternas|config|seeders|dist'


## jest clear cache

npx jest --clearCache

