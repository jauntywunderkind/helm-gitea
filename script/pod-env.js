#!/usr/bin/env node
"use module"
import ini from "./ini.js"
import Camel from "camel-case"

const
	camel= Camel.camelCase,
	INDENT= "  ",
	indenter= INDENT.repeat.bind( INDENT)

export function walk( o, path= "", level= 5){
	const buf= []
	for( let key in o){
		const
			val= o[ key],
			valType= typeof val,
			camelKey= camel( key)
		if( valType=== "string"|| valType=== "boolean"){
			const indention= indenter( level)
			buf.push(
				`${indention}- name: ${key}\n`,
				`${indention}  value: "{{ .Values${path}.${camelKey} }}"\n`
			)
		}else{
			buf.push(
				...walk( val, `${path}.${camel(key)}`, level)
			)
		}
	}
	return buf
}

export function main( i= ini){
	console.log( walk( i).join(""))
}

if( typeof process!== "undefined"&& `file://${process.argv[ 1]}`=== import.meta.url){
	main()
}
