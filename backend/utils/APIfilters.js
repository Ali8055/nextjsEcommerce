class APIfilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    // console.log("query", this.query);
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    console.log("checking");
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    console.log("keyworddddd", queryCopy);
    const removeFields = ["keyword", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    // If category exists, add it to the query
    if (queryCopy.category) {
      this.query = this.query.find({ category: queryCopy.category });
      delete queryCopy.category;
    }

    let output = {};
    let prop = "";
    // Handle price and other numeric range filters
    if (queryCopy.price) {
      const priceFilters = {};
      if (queryCopy.price.gte) {
        priceFilters.$gte = queryCopy.price.gte;
      }
      if (queryCopy.price.lte) {
        priceFilters.$lte = queryCopy.price.lte;
      }
      output.price = priceFilters;
      console.log("querycopy", output.price);
      delete queryCopy.price;
    }

    for (let key in queryCopy) {
      if (!key.match(/\b(gt|gte|lt|lte)/)) {
        output[key] = queryCopy[key];
      } else {
        prop = key.split("[")[0];
        output[prop] = {
          ...output[prop],
          [`$${key.split("[")[1].split("]")[0]}`]: queryCopy[key],
        };
      }
    }

    this.query = this.query.find(output);
    return this;
  }

  pagination(resPerPage) {
    console.log("resperpage", resPerPage);
    const currentPage = Number(this.queryStr.page) || 1;
    console.log("currentpage", currentPage);
    const skip = resPerPage * (currentPage - 1);
    console.log("skip", skip);
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIfilters;
