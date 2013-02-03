#!/bin/bash

function realpath_f () {(cd "$1" && echo "$(pwd -P)")}

basedir="$( realpath_f `dirname ${0}` )";
basedir="$( dirname `dirname ${basedir}` )";

APPDIR="${basedir}/mac/app";
INSTALLERDIR="${basedir}/mac/installer";
TARDIR="${basedir}/mac/installer/bin";
APPNAME="${TARDIR}/Collaborlist.app";


cp -Rpa ${INSTALLERDIR}/AppBundle.skel.app ${APPNAME};
cp -Rpa ${APPDIR}/data/bin/* ${APPNAME}/Contents/MacOS/bin/;
cp -Rpa ${APPDIR}/data/node_modules ${APPNAME}/Contents/Resources/;
cp -Rpa ${APPDIR}/data/content ${APPNAME}/Contents/Resources/;
cp -Rpa ${APPDIR}/data/app.js ${APPNAME}/Contents/Resources/;

ln -s /Applications/ ${TARDIR}/Applications

pwd

test -f Collaborlist.dmg && rm Collaborlist.dmg
sh ${INSTALLERDIR}/create-dmg --window-size 500 300 --background /Users/jameswood/Git/listbro/src/artwork/grey_@2X.png --icon-size 96 --volname "Collaborlist" --icon "Applications" 380 205 --icon "Collaborlist" 110 205 Collaborlist.dmg ${INSTALLERDIR}/bin/


