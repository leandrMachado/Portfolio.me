const axios = require("axios");

class Articles {
  constructor() {}

  #starts = async ({ index }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(
          `https://bash-system-d3d64-default-rtdb.europe-west1.firebasedatabase.app/articles/${index}.json`
        );

        if (result.data === null) throw new Error();

        const count = (result.data.likes) + 1;
        result.data.likes = count;
        resolve(result.data);
        
      } catch (err) {
        err.message = "Article not found";
        err.status = 404;
        reject(err);
      }
    });
  };

  #find = ({ data, slug }) => {
    return data.find(post => post.slug === slug);
  };

  articles = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(
          `https://bash-system-d3d64-default-rtdb.europe-west1.firebasedatabase.app/articles.json`
        );

        if (result.data === null) throw new Error();

        for (const i in result.data) result.data[i].index = i;
        resolve(result.data);

      } catch (err) {
        err.message = "Articles not found";
        err.status = 404;
        reject(err);
      }
    });
  };

  article = ({ slug }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await axios.get(
          `https://bash-system-d3d64-default-rtdb.europe-west1.firebasedatabase.app/articles.json`
        );

        const post = this.#find({ data: result.data, slug });
        if (post === undefined) throw new Error();

        resolve(post);

      } catch (err) {
        err.status = 404;
        err.message = "Article not found";
        reject(err);
      }
    });
  };

  update = ({ index }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dta = await this.#starts({index})
        const result = await axios.put(
          `https://bash-system-d3d64-default-rtdb.europe-west1.firebasedatabase.app/articles/${index}.json`,
          dta
        );
        resolve("Tanks for liking my projects");
      } catch (err) {
        reject(err);
      }
    });
  };
}

module.exports = Articles;
