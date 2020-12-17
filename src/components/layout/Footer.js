import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
  height: 40px;
  width: 100%;
  opacity: 0.49;
  background-color: #ebeaeb;
  display: flex;
  .footer-link {
    margin: auto;
    width: 70%;
    display: flex;
    &__item {
      color: #2d2e2c;
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 0;
      line-height: 21px;
      cursor: pointer;
      margin-right: 20px;
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="footer-link">
        <a
          className="footer-link__item"
          href="https://www.trevi.io/info/terms-conditions/"
        >
          EULA
        </a>
        <a
          className="footer-link__item"
          href="https://www.trevi.io/info/privacy/"
        >
          Privacy
        </a>
        <a
          className="footer-link__item"
          href="https://www.trevi.io/info/legal-disclosures/"
        >
          Disclosures
        </a>
        <a className="footer-link__item" href="https://www.trevi.io/contact/">
          Contact
        </a>
      </div>
    </StyledFooter>
  );
};

export default Footer;
