module.exports = {
  client: {
    service: {
      name: 'elenta',
      //url: 'https://elenta.dev/graphql',
      url: "http://localhost:8000/graphql",
      headers: {
        authorization: 'Bearer lkjfalkfjadkfjeopknavadf'
      },
      skipSSLValidation: true
    },
    includes: ['./resources/js/**/*.ts', './resources/js/**/*.tsx'],
    tagName: "gql",
    addTypename: true
  }
};
