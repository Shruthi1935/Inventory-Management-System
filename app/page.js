"use client"
import Image from "next/image";
import {useState, useEffect} from 'react'
import { firestore } from "@/firebase"
import { Box, Typography } from "@mui/material";
import { query, collection, getDocs} from "firebase/firestore";


export default function Home() {
  // Inventory Management Helper Functions
  const [inventory, setInventory] = useState([]) // default value is empty array
  const [open, setOpen] = useState(false)       // default valie is false
  const [itemName, setItemName] = useState('') // default value is empty string

  const updateInventory = async () => {      // async: prevents the code from being blocked while fetching so website wont freeze
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc)=>{
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    } 
    else {
      await setDoc(docRef, {quantity: 1})
    }
    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      if (quantity === 1) 
      {
        await deleteDoc(docRef)
      }
      else 
      {
        await setDoc(docRef, {quantity: quantity - 1 })
      }
    } 
    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, [])




  return (
    <Box> 
      <Typography variant="h2"> Inventory Management </Typography> 
      {
        inventory.forEach((item) => {
          console.log(item)
          return(<Box> {item.name} {item.count} </Box>)
        })
      }
    </Box>
  );
}
