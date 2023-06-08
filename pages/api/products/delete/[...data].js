import executeQuery from "@/lib/MySQL";
import { rimraf } from "rimraf";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const formData = new URLSearchParams(req.body);
    console.log(req.body);
    try {
      const result = await executeQuery({
        query: `DELETE FROM products WHERE id = '${formData.get("id")}'`,
      });

      if (result.error) {
        res.status(500).json({
          error: {
            message: "No se ha podido eliminar el producto",
          },
        });
      }
      // rimraf()
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  } else {
    // Manejar otros métodos HTTP aquí
    res.status(405).json({ message: "Método no permitido" });
  }
}
