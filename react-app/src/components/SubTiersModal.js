import SubscriptionFilters from "./SubscriptionsFilter"
import { Button } from "./StyledComponents"
import CloseButton from '../assets/CloseButton.png'
import { useState } from 'react'

function SubTiersModal(props) {
    const [buttons, setButtons] = useState(generateSubStatus())

    function activateButton(event) {
        setButtons(prevState => {
            return prevState.map((button) => {
                return button.id === +event.target.dataset.id ? { ...button, active: !button.active } : { ...button }
            })
        })
    }

    function generateSubStatus() {
        return props.subscriptions.map((sub) => {
          return { id: sub.id, tier: sub.attributes.tier, active: false }
        })
    }

    function sendUpdate() {
        props.toggleModal()
        props.update(gatherFilters())
    }

    function gatherFilters() {
        let activeButtons = buttons.filter((btn) => btn.active === true)
        return activeButtons.map((btn) => btn.tier)
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
        // <TiersModal visible={props.visible}>
        //     <div className='end mt'>
        //         <img src={CloseButton} onClick={props.toggleModal} alt='Close modal button'></img>
        //     </div>
        //     <div className='title bold'>Filtra la ricerca</div>
        //     <div className='bold'>Abbonamento</div>
        //     <SubscriptionFilters subscriptions={props.subscriptions} buttons={buttons} handleClick={activateButton} />
        //     <div className='grow-container end'>
        //         <div className='end'><Button active={true} type='Generic' onClick={sendUpdate}>Conferma</Button></div>
        //     </div>
        // </TiersModal>
    )
}

export default SubTiersModal