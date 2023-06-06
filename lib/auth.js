import CredentialsProvider from "next-auth/providers/credentials";
import executeQuery from "./MySQL";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const result = await executeQuery({
          query: `SELECT * FROM users WHERE email = '${credentials.email}' LIMIT 1`,
        });

        if (result.error)
          throw new Error(
            JSON.stringify({
              status: "error",
              message: "No es posible conectarse a la base de datos",
            })
          );

        const user = result[0];

        if (!user)
          throw new Error(
            JSON.stringify({
              status: "warning",
              message: "El email ingresado es invalido",
            })
          );

        if (user.password != credentials.password)
          throw new Error(
            JSON.stringify({
              status: "warning",
              message: "La contraseña ingresada invalida",
            })
          );

        const data = {
          id: user.id,
          nick: user.nick,
          email: user.email,
        };

        return data;
      },
    }),
  ],
  callbacks: {
    credentials: () => {
      return {
        error: "error",
      };
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
  },
};

export default authOptions;
