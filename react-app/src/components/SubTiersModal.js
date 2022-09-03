import SubscriptionFilters from "./SubscriptionsFilter"
import { Button } from "./StyledComponents"
import CloseButton from '../assets/CloseButton.png'

function SubTiersModal(props) {
    return (
        <div className={`tiers-modal flex flex-c w-100 gap-15 ${props.visible ? `visible` : ''}`}>
            <div className='self-end mt-25 p-25'>
                <img src={CloseButton} onClick={props.toggleModal} alt='Close modal button'></img>
            </div>
            <div className='self-start p-25'>
                <SubscriptionFilters subscriptions={props.subscriptions} buttons={props.buttons} handleClick={props.handleClick} />
            </div>
            <div className='flex f-grow self-end'>
                <div className='self-end p-25'><Button active={true} type='Category' onClick={props.toggleModal}>Conferma</Button></div>
            </div>
        </div>
    )
}

export default SubTiersModal