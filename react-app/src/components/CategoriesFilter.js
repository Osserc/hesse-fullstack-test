import { Button } from "./StyledComponents";

function CategoriesFilters(props) {
    function matchButton(id) {
        return props.buttons.find((button) => button.id === id).active
    }

    return (
        <div>
            {props.categories.map((cat) => {
                return <Button key={cat.id} active={matchButton(cat.id)} type={cat.attributes.name} onClick={props.handleClick} data-id={cat.id}>
                    {cat.attributes.name}
                </Button>
            })}
        </div>
    )
}

export default CategoriesFilters