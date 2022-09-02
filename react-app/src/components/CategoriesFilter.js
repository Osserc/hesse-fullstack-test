import { Button } from "./StyledComponents";

function CategoriesFilters(props) {
    function matchButton(id) {
        return props.buttons.find((btn) => btn.id === id).active
    }

    function detectPresence() {
        return !props.buttons.some((btn) => btn.active === true)
    }

    return (
        <div>
            <Button active={detectPresence()} onClick={props.handleClick} data-id={null}>All</Button>
            {props.categories.map((cat) => {
                return <Button key={cat.id} active={matchButton(cat.id)} type={cat.attributes.name} onClick={props.handleClick} data-filter='Categories' data-id={cat.id}>
                    {cat.attributes.name}
                </Button>
            })}
        </div>
    )
}

export default CategoriesFilters