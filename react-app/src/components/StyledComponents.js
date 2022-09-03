import styled, { css } from 'styled-components'

function checkType(type) {
    switch (type) {
        case 'Silver':
            return '#04E995'
        case 'Gold':
            return '#337DFF'
        case 'Platinum':
            return '#A100FF'
        default:
            return 'black'
    }
}

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