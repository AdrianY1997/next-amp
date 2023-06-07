import executeQuery from "@/lib/MySQL";
import IncomingForm from "formidable/src/Formidable";
import mv from "mv";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) res.status(500).json({ error: err });
      var oldPath = files.file.filepath;
      var newPath = `./public/img/products/${files.file.originalFilename}`;
      mv(oldPath, newPath, function (err) {
        if (err) res.status(500).json({ error: err });
      });
      try {
        const result = await executeQuery({
          query: `INSERT INTO products (name, price, description, img_path) VALUES ('${fields.name}', '${fields.price}', '${fields.description}', '${files.file.originalFilename}')`,
        });
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: error });
      }
    });
  });
}
