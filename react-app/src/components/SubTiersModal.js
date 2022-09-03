import SubscriptionFilters from "./SubscriptionsFilter"
import { Button } from "./StyledComponents"
import CloseButton from '../assets/CloseButton.png'
import { useState } from 'react'

function SubTiersModal(props) {
    const [buttons, setButtons] = useState(props.populate(props.subscriptions))

    function activateButton(event) {
        setButtons(prevState => {
            return prevState.map((button) => {
                return button.id === +event.target.dataset.id ? { ...button, active: !button.active } : { ...button }
            })
        })
    }

    function sendUpdate() {
        props.toggleModal()
        props.handleClick(buttons)
    }

    return (
        <div className={`tiers-modal flex flex-c align-start w-100 gap-15 ${props.visible ? `visible` : ''}`}>
            <div className='self-end mt-25'>
                <img src={CloseButton} onClick={props.toggleModal} alt='Close modal button'></img>
            </div>
            <div className='t-big t-bold'>Filtra la ricerca</div>
            <div className='t-bold'>Abbonamento</div>
            <SubscriptionFilters subscriptions={props.subscriptions} buttons={buttons} handleClick={activateButton} />
            <div className='flex f-grow self-end'>
                <div className='self-end'><Button active={true} type='Subscription' onClick={sendUpdate}>Conferma</Button></div>
            </div>
        </div>
    )
}

export default SubTiersModal