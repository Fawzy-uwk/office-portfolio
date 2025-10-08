"use client"
export default function Loading({src,width,quality}){
  if(src.startwith("https://")){
    return `https://ahmed.abdelkawy.com/${src}?w=${width}&q=${quality || 75}`;
  }
} 