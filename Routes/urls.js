import express from "express";
import { addURL, getURL, getAllURL, urlDayCount, urlMonthCount, updateCount } from "../Controller/urls.js";
import { nanoid } from 'nanoid' 

const router = express.Router();  

router.post("/createURL", async (req,res) => { 
    try{
      console.log("creating url");
      console.log("get url id ");  
  
      const id = nanoid();
      console.log(id)
      const url = await getURL({urlID:id});
      if(url){
        return res.status(404).json({message:"Try again"})
      }
      const shortURL = `/${id}`
      const data = {...req.body, shortURL:shortURL, urlID:id, clicked:0}
      const result = await addURL(data) 
      if(!result.acknowledged){
        return res.status(404).json({message:"Error uploading user information"})
      }
      res.status(200).json({result:result, data:data})
    }
    catch(err){
      console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
  })


  router.post("/all", async (req,res) => {
    try{
      console.log("get all url"); 
      // console.log(req.body);
      if(!req.body.email){
        return res.status(400).json({message:"User not found"});
      }
      const urlList = await getAllURL(req.body.email);
      
      if(!urlList){
        return res.status(404).json({message:"No data found"})
      }
      res.status(200).json({data:urlList})
  
    }
    catch(err){
      console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
  })

  
  router.post("/today", async (req,res) => {
    console.log("get all url today"); 
      // console.log(req.body);
      if(!req.body.email){
        return res.status(400).json({message:"User not found"});
      }
    try{
      const urlList = await urlDayCount(req.body.email, req.body.today);
      
      if(!urlList){
        return res.status(404).json({message:"No data found"})
      }
      res.status(200).json({data:urlList})
  
    }
    catch(err){
      console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
  })


  router.post("/monthly", async (req,res) => {
    console.log("get all url this month"); 
      // console.log(req.body);
    try{
      const urlList = await urlMonthCount(req.body.email, req.body.date);
      
      if(!urlList){
        return res.status(404).json({message:"No data found"})
      }
      res.status(200).json({data:urlList})
  
    }
    catch(err){
      console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
  })

  router.post("/clickcount", async (req,res) => {
    console.log("update click count"); 
      // console.log(req.body);
    try{
      const updatedURL = await updateCount(req.body.id);
      
      if(!updatedURL){
        return res.status(404).json({message:"No data found"})
      }
      res.status(200).json({data:updatedURL})
  
    }
    catch(err){
      console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
  })

export const urlRouter = router;