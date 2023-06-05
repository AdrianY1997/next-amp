import executeQuery from "@/lib/MySQL";

export default async function handler(req, res) {
  let result;
  if (req.method === "GET") {
    try {
      result = await executeQuery({
        query: `SELECT * FROM users WHERE email = '${req.body.email}' LIMIT 1`,
      });
    } catch (error) {
      result = { error: error };
    }

    const user = result[0];

    if (!user) {
      res.status(401).json({
        error: {
          message: "El Usuario ingresado es invalido",
        },
      });
    }

    if (user.password != req.body.password) {
      res.status(401).json({
        data: {
          email: user.email,
        },
        error: {
          message: "La contraseña ingresada es invalida",
        },
      });
    }

    res.status(200).json({
      data: {
        nick: user.nick,
        email: req.body.email,
      },
    });
  } else {
    // Manejar otros métodos HTTP aquí
    res.status(405).json({ error: { message: "Método no permitido" } });
  }
}
