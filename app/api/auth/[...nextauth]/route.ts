import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID || "",
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "",
            tenantId: process.env.AZURE_AD_TENANT_ID,
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
                token.idToken = account.id_token;
                token.provider = account.provider;
                token.providerAccountId = account.providerAccountId;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.idToken = token.idToken;
            session.provider = token.provider;
            session.providerAccountId = token.providerAccountId;
            return session;
        },
    },
});

export { handler as GET, handler as POST };
