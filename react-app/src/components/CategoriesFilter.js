import { Button } from './StyledComponents';
import { useState, useEffect } from 'react'

function CategoriesFilters(props) {
    const [buttons, setButtons] = useState(generateCatStatus())

    useEffect(() => {
        props.update(detectCategory())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buttons])

    function matchButton(id) {
        return buttons.find((btn) => btn.id === id).active
    }

    function detectPresence() {
        return !buttons.some((btn) => btn.active === true)
    }

    function generateCatStatus() {
        return props.categories.map((cat) => {
          return { id: cat.id, type: cat.attributes.name, active: false }
        })
    }

    function activateButton(event) {
        setButtons(prevState => {
            return prevState.map((button) => {
                return button.id === +event.target.dataset.id ? { ...button, active: true } : { ...button, active: false }
            })
        })
    }

    function detectCategory() {
        let cat = 'all'
        if (!detectPresence()) {
            cat = buttons.find((btn) => btn.active === true)
            cat = cat.type
        }
        return cat
    }

    function horizontalScroll(event) {
        if (event.target.nodeName === 'BUTTON') {
            event.target.parentNode.scrollLeft += event.deltaY
        } else {
            event.target.scrollLeft += event.deltaY
        }
        console.log(event.target.nodeName)
    }

    return (
        <div className='all-categories flex gap-15' onWheel={horizontalScroll}>
            <Button active={detectPresence()} type='Category' onClick={activateButton} onWheel={horizontalScroll} data-filter='Category' data-id={null}>All</Button>
            {props.categories.map((cat) => {
                return <Button key={cat.id} active={matchButton(cat.id)} type='Category' onClick={activateButton} onWheel={horizontalScroll} data-filter='Category' data-id={cat.id}>
                    {cat.attributes.name.toUpperCase()}
                </Button>
            })}
        </div>
    )
}

export default CategoriesFilters