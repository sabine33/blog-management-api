import multerUpload from "@/helpers/multerUpload";
import uploadController from "@/controllers/upload.controller";
import express from "express";
// import { Router } from "express";
const router = express.Router();

export default () => {
  router.post(
    "/image",
    multerUpload.single("image"),
    uploadController.uploadImage
  );

  return router;
};
