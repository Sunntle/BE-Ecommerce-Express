var express = require("express");
var router = express.Router();
var db = require("../models/database");
var modelImages = require("../models/images");
const parser = require("../middlewares/uploader"); // Changed the import to the new file name
const cloudinary = require("cloudinary").v2;

router.post("/", parser.array("Image"), (req, res) => {
  const files = req.files; // Use req.file to access the uploaded file
  const id = req.body.product_id;
  const data = files.map((file) => [file.path.replace("/upload/", "/upload/w_600,h_800/"), id]);
  modelImages.createImg(data, function (d) {
    res.sendStatus(200);
  });
});
router.delete("/", async (req, res) => {
  let id = req.query.idSp;

  try {
    const images = await new Promise((resolve, reject) => {
      modelImages.getImgProduct(id, (d) => {
        resolve(d);
      });
    });

    // Process and delete images using Cloudinary API
    await Promise.all(
      images.map(async (el) => {
        const public_id = el.img.split("/").at(-1).split(".")[0];
        await cloudinary.uploader.destroy("ImagesProduct/" + public_id);
      })
    );

    // Delete the product from the database
    await new Promise((resolve, reject) => {
      modelImages.deleteProductImg(id, (d) => {
        resolve(d);
      });
    });

    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting images and product:", error);
    res.sendStatus(500);
  }
});

// router.delete("/", async (req, res) => {

//   let id = req.query.idSp;
//   await new Promise((resolve, reject) => {
//     modelImages.getImgProduct(id, (d) => {
//       d.forEach(async (el) => {
//         const public_id = el.img.split("/").at(-1).split(".")[0];
//         await cloudinary.uploader.destroy("ImagesProduct/" + public_id);
//         console.log(12);
//       });
//     });
//   });
//   await new Promise((resolve, reject) => {
//     modelImages.deleteProductImg(id, (d) => {
//       res.sendStatus(200);
//     });
//   });
// });
router.delete("/deleteOne", async (req, res) => {
  const { img, idSp } = req.query;
  const public_id = img.split("/").at(-1).split(".")[0];
  modelImages.deleteImg(idSp, public_id, async (d) => {
    await cloudinary.uploader.destroy("ImagesProduct/" + public_id).then(res.sendStatus(200));
  });
});
module.exports = router;
