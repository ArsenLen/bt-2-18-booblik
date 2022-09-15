import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import Layout from "../layout/Layout";
import {useNavigate} from 'react-router-dom'
import { useEffect, useContext } from 'react'
import {Context} from '../context/Context'
import { useSelector } from "react-redux";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm'

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const stripePromise = loadStripe("pk_test_51LY447HWg33SQmOYkw5NDamYDIC6nmq6E8TuAzs8BFgElOjFEhM8GjZxjoIguoAhF07s5XgS346RXTd4Fx4xz9rX00cYDOothX");

const Cart = () => {
  let navigate = useNavigate()
  const {user} = useContext(Context)
  useEffect(() => {
    if(!user) {
      return navigate("/login")
    }
  }, [user])

  const handleProductCount = () => {
    
  }

  const products = useSelector(state => state.cart.products)
  const totalPrice = useSelector(state => state.cart.totalPrice)

  return (
    <Container>
      <Layout>
        <Wrapper>
          <Title>ВАША КОРЗИНА</Title>
          <Top>
            <TopButton>ПРОДОЛЖИТЬ ПОКУПКИ</TopButton>
            <TopTexts>
              <TopText>Корзина (2)</TopText>
              <TopText>Желаемые (0)</TopText>
            </TopTexts>
            <TopButton type="filled">ОПЛАТИТЬ</TopButton>
          </Top>
          <Bottom>
            <Info>
              {products.map(product => {
                return (
                  <Product>
                    <ProductDetail>
                      <Image src={product.img} />
                      <Details>
                        <ProductName>
                          <b>Продукт:</b> {product.name}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product.id}
                        </ProductId>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Add onClick={handleProductCount}/>
                        <ProductAmount>{product.count}</ProductAmount>
                        <Remove />
                      </ProductAmountContainer>
                      <ProductPrice>{product.price} сом</ProductPrice>
                    </PriceDetail>
                  </Product>
                );
              })}
              
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>ВАШИ ПОКУПКИ</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Цена покупок</SummaryItemText>
                <SummaryItemPrice>{totalPrice} сом</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Доставка</SummaryItemText>
                <SummaryItemPrice>150 с</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Скидка на доставку</SummaryItemText>
                <SummaryItemPrice>-150 с</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Общий</SummaryItemText>
                <SummaryItemPrice>{totalPrice} сом</SummaryItemPrice>
              </SummaryItem>
              <Button>Купить</Button>
            </Summary>
          </Bottom>
          <Elements stripe={stripePromise} >
            <CheckoutForm />
          </Elements>
        </Wrapper>
      </Layout>
    </Container>
  );
};

export default Cart;
