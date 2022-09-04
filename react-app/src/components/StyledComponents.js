import styled, { css } from 'styled-components'
import { checkType } from './SubscriptionSymbols'

const Button = styled.button`
    background: white;
    padding: 5px 10px;
    font-weight: bold;
    border-radius: ${props => ((props.type === 'Category') || (props.type === 'Generic')) ? '25px' : '5px'};
    border: 2px solid ${props => checkType(props.type)};
    color: ${props => checkType(props.type)};

    ${props => props.active && css`
    background: ${props => checkType(props.type)};
    color: white;
    `}
`

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    justify-content: center;
    width: 100%;
`
const TiersModal = styled.div`
    display: none;
    position: absolute;
    background-color: white;
    border-radius: 50px 50px 0 0;
    bottom: 0;
    width: 50%;
    height: 98%;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    padding: 15px;
    box-sizing: border-box;

    ${props => props.visible && css`
        display: flex;
    `}

    .bold {
        font-weight: bold;
    }
    .title {
        font-size: 36px;
    }
    .end {
        align-self: flex-end
    }
    .grow-container {
        display: flex;
        flex-grow: 1;
    }
    .mt {
        margin-top: 25px;
    }
    div {
        padding: 5px 25px
    }

    @media (max-width: 800px) {
        width: 100%;
    }
`

export { Button, ProductsGrid, TiersModal }