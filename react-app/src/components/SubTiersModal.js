import SubscriptionFilters from "./SubscriptionsFilter"
import { Button } from "./StyledComponents"

function SubTiersModal(props) {
    return (
        <div className={`tiers-modal w-100 ${props.visible ? `visible` : null}`}>
            <Button active={true} onClick={props.toggleModal}>Close</Button>
            <SubscriptionFilters subscriptions={props.subscriptions} buttons={props.buttons} handleClick={props.handleClick} />
            <Button>Confirm</Button>
        </div>
    )
}

export default SubTiersModal