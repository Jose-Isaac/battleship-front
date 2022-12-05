import styled from "styled-components";

export const Target = ({coordinate, isVisibleOccupied, attack}) => {
    return (
        <Container
            isHit={coordinate.gotHit}
            isOccupied={coordinate.isOccupied && isVisibleOccupied}
            disabled={coordinate.isOccupied && isVisibleOccupied}
            onClick={() => {attack(coordinate)}}
        >
            {coordinate.axisX},{coordinate.axisY}
        </Container>
    )
}

const Container = styled.button`
  border: 1px solid #FFF7E9;
  cursor:  ${props => props.isOccupied ? "" : "pointer"};
  background-color: ${props =>  props.isHit ? "#FF731D" : props.isOccupied ? "#FFF7E9" : "#5F9DF7" };
  
  &:hover {
    border: 1px solid #E94560;
  }
`