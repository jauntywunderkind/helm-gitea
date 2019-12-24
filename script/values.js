#!/usr/bin/env node
"use module"
import ini from "./ini.js"
import Camel from "camel-case"

const
	camel= Camel.camelCase,
	INDENT= "  ",
	indenter= INDENT.repeat.bind( INDENT)

export function walk( o, level= 0){
	const buf= []
	for( let key in o){
		const
			val= o[ key],
			valType= typeof val
		if( valType=== "string"|| valType=== "boolean"){
			buf.push(
				indenter( level),
				camel( key),
				": ",
				val|| "",
				"\n"
			)
		}else{
			buf.push(
				indenter( level),
				key,
				": ",
				"\n",
				...walk( val, level+ 1)
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
