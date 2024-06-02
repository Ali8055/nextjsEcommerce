import React from 'react'
import ListProducts from './../components/products/ListProducts'
const homePage = async () => {

    // const baseUrl = typeof window === 'undefined' 
    // ? process.env.NEXT_PUBLIC_BASE_URL // Use an environment variable for the base URL on the server
    // : '';
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
console.log(`${baseUrl}/api/productsss`,"aaaaaaaaaaaaaaaa");
    const response = await fetch(`${baseUrl}/api/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const productsData = await response.json();
  return (
    <ListProducts data={productsData}/>
  )
}

export default homePage 