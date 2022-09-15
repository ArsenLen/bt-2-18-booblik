import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import {useEffect, useState} from "react"
import axios from 'axios'
import {useParams} from 'react-router-dom';
import { addToCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const fetchProduct = (id) => {
  return axios.get(`http://localhost:8000/api/products/${id}`)
}

const ProductPage = () => {
  const [product, setProduct] = useState({}) // на странице
  const {id} = useParams()
  const dispatch = useDispatch()
  const [productCount, setProductCount] = useState(1)
  const [isProductInCart, setIsProductInCart] = useState(false)

  useEffect(() => {
    fetchProduct(id).then(res => setProduct(res.data))
  }, [])

  const handleCart = () => {
    product.count = productCount
    dispatch(addToCart({product}))
  }

  const products = useSelector(state => state.cart.products) // из корзины

  const checkProductInCart = () => {
    const prod = products.find(p => p._id === product._id) // виден только внутри функции
    if(prod) {
      setIsProductInCart(true)
    }
  }

  useEffect(() => {
    checkProductInCart()
  }, [products, product])

  const handleProductCount = (type) => {
    if(type === 'add') {
      setProductCount(productCount + 1)
    } else {
      productCount > 1 && setProductCount(productCount - 1)
      if(productCount > 1) {
        setProductCount(productCount - 1)
      }
    }
  }

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={`http://localhost:8000/` + product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <Desc>
            {product.descr}
          </Desc>
          <Price>{product.price}</Price>
          {isProductInCart ? (
            <h3>Такой продукт уже есть в корзине</h3>
          ) : (
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleProductCount('remove')}  />
              <Amount>{productCount}</Amount>
              <Add onClick={() => handleProductCount('add')} />
            </AmountContainer>
            <Button onClick={handleCart}>ДОБАВИТЬ В КОРЗИНУ</Button>
          </AddContainer>
          )}
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default ProductPage;
