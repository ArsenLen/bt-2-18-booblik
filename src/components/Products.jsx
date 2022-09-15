import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const fetchProducts = () => {
  return axios.get("http://localhost:8000/api/products")
} 

const Products = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetchProducts().then(res => setProducts(res.data))
  }, [])
  return (
    <Container>
      {products.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
