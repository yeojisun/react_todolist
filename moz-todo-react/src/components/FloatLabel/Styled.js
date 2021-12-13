import styled from 'styled-components'

const AppStyled = styled.div`
.float-label {
  position: relative;
  margin-bottom: 12px;
}

.label {
  font-size: 12px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 12px;
  top: 12px;
  transition: 0.2s ease all;
}

.label-float {
  top: 6px;
  font-size: 10px;
}
`;
export default AppStyled;
