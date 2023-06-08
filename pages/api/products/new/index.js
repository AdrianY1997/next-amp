import executeQuery from "@/lib/MySQL";
import IncomingForm from "formidable/src/Formidable";
import mv from "mv";
import { rimraf } from "rimraf";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) res.status(500).json({ error: err });

    if (files.file) {
      var splitName = files.file.originalFilename.split(".");
      var newName = `${fields.name
        .toLowerCase()
        .replace(/(\W+)/gi, "")}-${new Date().getTime()}.${
        splitName[splitName.length - 1]
      }`;
      var oldPath = files.file.filepath;
      var newPath = `./public/img/products/${newName}`;
      mv(oldPath, newPath, function (err) {
        if (err)
          res.status(500).json({
            error: {
              message: "No se ha podido subir la imagen del producto.",
              err,
            },
          });
      });
    } else {
      var newName = `no-image-product-large.jpg`;
    }

    try {
      const result = await executeQuery({
        query: `INSERT INTO products (name, price, description, img_path) VALUES ('${fields.name}', '${fields.price}', '${fields.description}', '${newName}')`,
      });
      if (result.error) {
        const imgDelete = await rimraf(
          `./public/img/products/${files.file.originalFilename}`
        );
        res.status(500).json({
          error: {
            resourceDeleted: imgDelete,
            message: "No es posible guardar el producto en la base de datos.",
          },
        });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        error: {
          resourceDeleted: imgDelete,
          message: "Ha ocurrido un error inesperado",
          error,
        },
      });
    }
  });
}
