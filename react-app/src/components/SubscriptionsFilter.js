import { Button } from "./StyledComponents";
import { returnSymbol } from "./SubscriptionSymbols";

function SubscriptionFilters(props) {
    function matchButton(id) {
        return props.buttons.find((button) => button.id === id).active
    }

    return (
        <div className='flex self-start gap-15'>
            {props.subscriptions.map((sub) => {
                return <Button key={sub.id} active={matchButton(sub.id)} type={sub.attributes.tier} onClick={props.handleClick} data-filter='Subscriptions' data-id={sub.id}>
                        {returnSymbol(sub.attributes.tier)} {sub.attributes.subscription_price} €
                </Button>
            })}
        </div>
    )
}

export default SubscriptionFilters