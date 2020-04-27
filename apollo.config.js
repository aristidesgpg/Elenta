module.exports = {
  client: {
    service: {
      name: 'elenta',
      url: 'https://elenta.dev/graphql',
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
