import { createYoga, createSchema } from "graphql-yoga";
import { db } from "@/lib/firebaseAdmin";

/**
 * Converte Firestore Timestamp para string YYYY-MM-DD
 */
function timestampToISO(timestamp) {
  if (!timestamp) return null;

  if (timestamp.toDate) {
    return timestamp.toDate().toISOString().split("T")[0];
  }

  return timestamp;
}

const yoga = createYoga({
  graphqlEndpoint: "/api/graphql",

  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Filme {
        id: ID!
        title: String!
        slug: String!
        director: String
        year: Int
        rating: Int
        release: String
        date: String
      }

      type Query {
        filmes(orderByDateDesc: Boolean = false): [Filme!]!
        filme(slug: String!): Filme
      }
    `,

    resolvers: {
      Query: {
        filmes: async (_, { orderByDateDesc }) => {
          let query = db.collection("filmes");

          if (orderByDateDesc) {
            query = query.orderBy("date", "desc");
          }

          const snapshot = await query.get();

          return snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
              id: doc.id,
              title: data.title ?? "",
              slug: data.slug ?? "",
              director: data.director ?? null,
              year: data.year ?? null,
              rating: data.rating ?? null,
              release: timestampToISO(data.release),
              date: timestampToISO(data.date),
            };
          });
        },

        filme: async (_, { slug }) => {
          const snapshot = await db
            .collection("filmes")
            .where("slug", "==", slug)
            .limit(1)
            .get();

          if (snapshot.empty) return null;

          const doc = snapshot.docs[0];
          const data = doc.data();

          return {
            id: doc.id,
            title: data.title ?? "",
            slug: data.slug ?? "",
            director: data.director ?? null,
            year: data.year ?? null,
            rating: data.rating ?? null,
            release: timestampToISO(data.release),
            date: timestampToISO(data.date),
          };
        },
      },
    },
  }),
});

export { yoga as GET, yoga as POST };
