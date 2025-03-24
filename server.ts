import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();


import { v2 as cloudinary } from "cloudinary"


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

console.log(cloudinary.config());


const port: number | string | undefined = process.env.PORT || 9999;
const dbUrl: any = process.env.MONGO_DB_CLOUD_URL;
const dbname: string | undefined = process.env.MONGO_DB_DATABASE;
const hostname: string = "127.0.0.1";

const app: Application = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// Routers
import SubCategoryRouter from "./router/subCategoryRouter";
import CategoryRouter from "./router/CategoryRouter";
import ProductRouter from "./router/ProductRouter";

app.use('/category' , CategoryRouter)
app.use('/subCategory' , SubCategoryRouter)
app.use("/product" , ProductRouter)



if (port) {
  app.listen(port, () => {
    if (dbUrl && dbname) {
      mongoose
        .connect(dbUrl, { dbName: dbname })
        .then(() => {
          console.log("database done");
        })
        .catch(() => {
          console.error(`err`);
          process.exit(0);
        });
    }
    console.log(`http://${hostname}:${port}`);
  });
}
