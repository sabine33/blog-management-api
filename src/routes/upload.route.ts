import { Router } from "express";
import multerUpload from "@/helpers/multerUpload";
import uploadController from "@/controllers/upload.controller";
const router = Router();

export default () => {
  router.post(
    "/image",
    multerUpload.single("image"),
    uploadController.uploadImage
  );

  return router;
};
