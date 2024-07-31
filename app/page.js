"use client"
import Image from "next/image";
import {useState, useEffect} from 'react'
import { Firestore } from "@/firebase"
import { Box, Typography } from "@mui/material";


export default function Home() {
  // Inventory Management Helper Functions
const [inventory, setInventory] = useState([]) // default value is empty array
const [open, setOpen] = useState(false)          // default valie is false
const [itemName, setItemName] = useState('') // default value is empty string


  return (
    <Box> 
      <Typography variant="h2"> Inventory Management </Typography> 
    </Box>
  );
}
