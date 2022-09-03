import { Button } from './StyledComponents';

function CategoriesFilters(props) {
    function matchButton(id) {
        return props.buttons.find((btn) => btn.id === id).active
    }

    function detectPresence() {
        return !props.buttons.some((btn) => btn.active === true)
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
            <Button active={detectPresence()} type='Category' onClick={props.handleClick} onWheel={horizontalScroll} data-id={null}>All</Button>
            {props.categories.map((cat) => {
                return <Button key={cat.id} active={matchButton(cat.id)} type='Category' onClick={props.handleClick} onWheel={horizontalScroll} data-filter='Categories' data-id={cat.id}>
                    {cat.attributes.name.toUpperCase()}
                </Button>
            })}
        </div>
    )
}

export default CategoriesFilters