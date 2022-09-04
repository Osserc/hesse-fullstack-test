import { returnSymbol, checkType } from "./SubscriptionSymbols"

function ProductCard(props) {
    return (
        <div className='card t-bold'>
            <img src={`http://localhost:1337${props.product.attributes.preview.data.attributes.url}`} alt='Product preview'></img>
            <div className='flex flex-c pad gap-5'>
                <div className='flex space-between'>
                    <div>{props.product.attributes.brand}</div>
                    <div style={{ color: `${checkType(props.product.attributes.subscription_type.data.attributes.tier)}` }}>{returnSymbol(props.product.attributes.subscription_type.data.attributes.tier)}</div>
                </div>
                <div className='flex gap-15'>
                    <div>{props.product.attributes.subscription_type.data.attributes.subscription_price}€ / mese</div>
                    <div className='greyed-out'>{props.product.attributes.subscription_type.data.attributes.retail_price}€</div>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default ProductCard

