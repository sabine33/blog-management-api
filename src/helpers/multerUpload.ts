import crypto from "crypto";
import multer, { FileFilterCallback } from "multer";
const fileSize = 10 * 1024 * 1024;

/**
 * storage mechanism
 */
export default multer({
  dest: "public/uploads",
  fileFilter: (
    request: Express.Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
  ) => {
    const acceptedTypes = file.mimetype.split("/");

    if (acceptedTypes[0] === "image") {
      callback(null, true);
    } else {
      callback(null, false);
      callback(new Error("Only image format allowed!"));
    }
  },
  limits: {
    fileSize,
  },
  storage: multer.diskStorage({
    destination: "public/uploads",
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName);
    },
  }),
});
