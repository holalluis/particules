#!/bin/bash

#git
git add *
git commit -am 'update'
git push

#desplega la web al servidor
# -h  human readable format
# -P  mostra progrés
# -vv incrementa verbositat
# -r  actua recursivament
rsync -h -P -vv -r . root@164.132.111.240:/var/www/html/atoms
