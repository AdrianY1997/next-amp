import executeQuery from "@/lib/MySQL";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const formData = new URLSearchParams(req.body);
    console.log(req.body);
    try {
      const result = await executeQuery({
        query: `DELETE FROM products WHERE id = '${formData.get("id")}'`,
      });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  } else {
    // Manejar otros métodos HTTP aquí
    res.status(405).json({ message: "Método no permitido" });
  }
}
