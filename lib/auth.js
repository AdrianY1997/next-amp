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

        const user = result[0];

        if (!user) return null;

        if (user.password != credentials.password) return null;

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
