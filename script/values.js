#!/usr/bin/env node
"use module"
import ini from "./ini.js"
import Camel from "camel-case"

const
	camel= Camel.camelCase,
	INDENT= "  ",
	indenter= INDENT.repeat.bind( INDENT)

function convertValue( str){
	if( str=== null){
		throw new Error( "unexpected null")
	}
	if( str=== true|| str=== false){
		return str
	}
	if( /^\s*$/.test( str)){
		return ""
	}
	if( str=== "false"|| str=== "true"){
		return str
	}
	if ( /^\s*[+-]?\s*\d*\.?\d*\s*$/.test( str)){
		return str
	}
	const escaped= str.split("\"").join("\\\"")
	return `"${escaped}"`
}

export function walk( o, level= 0){
	const buf= []
	for( let key in o){
		const
			val= o[ key],
			valType= typeof val,
			camelKey= camel( key)
		if( valType=== "string"|| valType=== "boolean"){
			buf.push(
				`${indenter( level)}${camelKey}: ${convertValue( val)}\n`
			)
		}else{
			buf.push(
				indenter( level),
				camelKey,
				":\n",
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
