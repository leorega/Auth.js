import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "email",
                    placeholder: "Your@email.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<User | null> {
                //Acá simulamos la base de datos llamada users
                const users = [
                    {
                        id: "1",
                        name: "admin",
                        email: "admin@prueba.com",
                        password: "admin",
                    },
                    {
                        id: "2",
                        name: "user",
                        email: "user@prueba.com",
                        password: "user",
                    },
                ];

                // Esta sería la consulta a la base de datos
                const user = users.find(
                    (user) =>
                        user.email === credentials?.email &&
                        user.password === credentials?.password
                );
                return user
                    ? { id: user.id, name: user.name, email: user.email }
                    : null;
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    secret: process.env.AUTH_SECRET,
});
