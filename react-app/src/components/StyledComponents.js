import styled, { css } from 'styled-components'
import { checkType } from './SubscriptionSymbols'

const Button = styled.button`
    background: white;
    padding: 5px 10px;
    font-weight: bold;
    border-radius: ${props => props.type === 'Category' ? '25px' : '5px'};
    border: 2px solid ${props => checkType(props.type)};
    color: ${props => checkType(props.type)};

    ${props => props.active && css`
    background: ${props => checkType(props.type)};
    color: white;
    `}
`

export { Button }