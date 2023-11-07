import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./Components/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const FetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("unable to fetch data from server");
      }
    };
    FetchFoodData();
  }, []);

  const searchfood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);
    if (searchValue == "") {
      setFilteredData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };
  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn(selectedBtn);
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading data from server...</div>;

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  return (
    <>
      <Container>
        <Header>
          <UpperContainer>
            <div className="logo">
              <img src="logo.svg" alt="logo here" />
            </div>
            <div className="searchbox">
              <input onChange={searchfood} placeholder="Search Food" />
            </div>
          </UpperContainer>

          <Navbtns>
            {filterBtns?.map((value) => (
              <Button key={value.name} onClick={() => filterFood(value.type)}>
                {value.name}
              </Button>
            ))}
          </Navbtns>
        </Header>
      </Container>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const Header = styled.div`
  background-color: #3a3a3a;
  position: relative;
  left: -290px;
  width: 1677px;
  height: 100px;
  padding: 51px;
  display: flex;
  flex-direction: column;
  gap: 60px;

  @media (0<width< 600px){
    width: 455px;
    left: 0;
    padding: 40px;
    
  }
`;
const UpperContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (0 < width <600px){
    flex-direction: column;
    height: 30px;
    gap: 5px;
  }
  input {
    height: 35px;
    padding: 0 8px;
    border: hidden;
    outline: 3px solid red;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    background-color: transparent;
    font-family: "Poppins", sans-serif;
  }
`;
const Navbtns = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;
export const Button = styled.button`
  background-color: red;
  border: none;
  color: white;
  padding: 7px 15px;
  border-radius: 5px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #a80202;
  }
`;
