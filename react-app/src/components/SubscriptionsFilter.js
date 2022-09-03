import { Button } from "./StyledComponents";
import { ReactComponent as Silver } from '../assets/Silver.svg'
import { ReactComponent as Gold } from '../assets/Gold.svg'
import { ReactComponent as Platinum } from '../assets/Platinum.svg'

function SubscriptionFilters(props) {
    function matchButton(id) {
        return props.buttons.find((button) => button.id === id).active
    }

    function detectType(tier) {
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

    return (
        <div className='flex self-start gap-15'>
            {props.subscriptions.map((sub) => {
                return <Button key={sub.id} active={matchButton(sub.id)} type={sub.attributes.tier} onClick={props.handleClick} data-filter='Subscriptions' data-id={sub.id}>
                        {detectType(sub.attributes.tier)} {sub.attributes.subscription_price} €
                </Button>
            })}
        </div>
    )
}

export default SubscriptionFilters