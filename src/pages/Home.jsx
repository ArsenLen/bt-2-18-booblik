import React from "react";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Layout from "../layout/Layout"

const Home = () => {
  return (
    <div>
      <Layout>
        <Categories />
        <Products/>
      </Layout>
    </div>
  );
};

export default Home;
