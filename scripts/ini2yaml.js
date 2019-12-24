#!/usr/bin/env node
import Ini from "ini"
import fs from "fs"

const
  filename= process.argv[ 2]|| "app.ini.sample",
  file= fs.readFileSync( filename, "utf8"),
  ini= Ini.parse( file)
console.log(ini)
