import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  return (
    <Container>
      <Navbar />
      <Title>/</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Фильтровать по:</FilterText>
          <Select>
            <Option disabled selected>
              Категория
            </Option>
            <Option>ФФ</Option>
            <Option>Паста</Option>
            <Option>Салат</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Сортировать по:</FilterText>
          <Select>
            <Option selected>Новейшие</Option>
            <Option>Цена (asc)</Option>
            <Option>Цена (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      <Footer />
    </Container>
  );
};

export default ProductList;
