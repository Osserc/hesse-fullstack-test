import { Button } from "./StyledComponents";
import { useState } from 'react'
import { ReactComponent as Silver } from '../assets/Silver.svg'
import { ReactComponent as Gold } from '../assets/Gold.svg'
import { ReactComponent as Platinum } from '../assets/Platinum.svg'

function SubscriptionFilters(props) {
    const [buttonsStatus, setButtonsStatus] = useState(generateActivity())

    function generateActivity() {
        return props.subscriptions.map((sub) => {
            return { id: sub.id, active: false }
        })
    }

    function handleClick(event) {
        console.log(+event.target.dataset.id)
        updateButton(+event.target.dataset.id)
    }

    function updateButton(id) {
        setButtonsStatus(prevState => {
            return prevState.map((button) => {
                return button.id === id ? { ...button, active: !button.active } : { ...button, active: false }
            })
        })
    }

    function matchButton(id) {
        return buttonsStatus.find((button) => button.id === id).active
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
        <div>
            {console.log(props.subscriptions)}
            {props.subscriptions.map((sub) => {
            return <Button key={sub.id} active={matchButton(sub.id)} type={sub.attributes.tier} onClick={handleClick} data-id={sub.id}>
                    {detectType(sub.attributes.tier)} {sub.attributes.subscription_price} €
            </Button>
            })}
        </div>
    )
}

export default SubscriptionFilters