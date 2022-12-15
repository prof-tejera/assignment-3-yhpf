import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid #FFFFFF;
  margin: 20px 0px;
`;

const Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  width: 1000px;
  color: #FFFFFF;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  font-size: 1.3rem;
  color: #FFFFFF;
`;

const RenderComponent = styled.div`
  padding: 25px;
  display: flex;
  align-items: center;
`;

const Documentation = styled.table`
  width: 800px;
`;

const DocumentComponent = ({ title, component, propDocs }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Container>
        <RenderComponent>{component}</RenderComponent>
        <Documentation>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Description</th>
              <th>Type</th>
              <th>Default value</th>
            </tr>
          </thead>
          <tbody>
            {propDocs.map((doc, index) => {
              return (
                <tr key={index}>
                  <td>{doc.prop}</td>
                  <td>{doc.description}</td>
                  <td>{doc.type}</td>
                  <td>
                    <code>{doc.defaultValue}</code>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Documentation>
      </Container>
    </Wrapper>
  );
};

export default DocumentComponent;
