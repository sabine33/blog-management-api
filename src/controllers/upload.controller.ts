class UploadController {
  constructor() {}
  uploadImage = async (req, res, next) => {
    const fileUrl = req.file;
    res.success({
      status: true,
      data: { filename: fileUrl.filename },
      message: "Image uploaded successfully.",
    });
  };
}
export default new UploadController();
