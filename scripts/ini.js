#!/usr/bin/env node
import Ini from "ini"
import fs from "fs"

export const
  filename= process.argv[ 2]|| "app.ini.sample",
  file= fs.readFileSync( filename, "utf8"),
  ini= Ini.parse( file)
export default ini

if( typeof process!== "undefined"&& `file://${process.argv[ 1]}`=== import.meta.url){
	console.log( JSON.stringify( ini, null, "\t"))
}
