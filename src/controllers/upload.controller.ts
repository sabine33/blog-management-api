import { Request, Response, NextFunction } from "express";

class UploadController {
  constructor() {}
  uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    const fileUrl = req.file;
    res.success({
      status: true,
      data: { filename: fileUrl.filename },
      message: "Image uploaded successfully.",
    });
  };
}
export default new UploadController();
