import executeQuery from "@/lib/MySQL";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("req nom", req.body);
      const result = await executeQuery({
        query: "SELECT * FROM users",
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
