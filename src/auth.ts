import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Entra from "next-auth/providers/microsoft-entra-id";
import Google from "next-auth/providers/google";

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
                password: {
                    label: "Password",
                    type: "password",
                },
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
        Entra({
            clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
            clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
            tenantId: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    pages: {
        signIn: "/login",
    },
    secret: process.env.AUTH_SECRET,
});
