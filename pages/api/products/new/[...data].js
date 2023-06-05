import executeQuery from "@/lib/MySQL";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    const formData = new URLSearchParams(req.body);
    try {
      const result = await executeQuery({
        query: `INSERT INTO products (name, price) VALUES ('${formData.get(
          "name"
        )}', '${formData.get("price")}')`,
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
