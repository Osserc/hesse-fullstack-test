import { ReactComponent as Silver } from '../assets/Silver.svg'
import { ReactComponent as Gold } from '../assets/Gold.svg'
import { ReactComponent as Platinum } from '../assets/Platinum.svg'

function returnSymbol(tier) {
    switch (tier) {
        case 'Silver':
            return (
                <Silver />
            )
        case 'Gold':
            return (
                <Gold />
            )
        default:
            return (
                <Platinum />
            )
    }
}

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

export { returnSymbol, checkType }