import executeQuery from "@/lib/MySQL";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const result = await executeQuery({
        query: "TRUNCATE TABLE products",
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
