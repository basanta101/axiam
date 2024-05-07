import PropTypes from 'prop-types';
import { SELECT_KEY, VALUE_KEY, LABEL_KEY } from "@/constants/autocomplete.constants"
import Button from "../Button/Button"
import Icon from "../Icon/Icon"
import { ICON_TYPE } from "../Icon/Icon.constants"
import './ProductCard.scss'


const Product = ({ product = {}, onRemoveProduct = f => f }) => {
    // const { value: icon = 'VITE', label = '', } = product
    return (
        <>
            {product[SELECT_KEY] ? <div className="flex-cc h-100-p flex-js">
                <Icon icon={product[VALUE_KEY]} classes="preview-icon flex-cc" text={product[LABEL_KEY]} />
                <Button classes='bg-none' onClick={() => onRemoveProduct(product)}>
                    <Button.Icon icon={ICON_TYPE.CANCEL} />
                    <Button.Text text='Remove' classes='btn-text text-black' />
                </Button>
            </div> :
                <div className="default-view-wrap bg-anti-flash-white b-r4 p-12">
                    <Button classes="btn-wrap " >
                        <Button.Icon icon={ICON_TYPE.ADD} />
                    </Button>
                </div>}
        </>)
}

Product.propTypes = {
    product: PropTypes.object,
    onRemoveProduct: PropTypes.func,
}

const GridComponent = ({ numberOfItems = 4, onRemoveProduct = f => f, selectedProducts = [] }) => {
    const generateGridItems = () => {
        const items = [];
        for (let i = 0; i < numberOfItems; i++) {
            items.push(<div key={i} className='h-200 b-r12 flex-c box-shadow border-culture-white'><Product product={selectedProducts[i]} onRemoveProduct={onRemoveProduct} /></div>);
        }
        return items;
    };

    return (
        <div className='grid-container'>
            {generateGridItems()}
        </div>
    );
};

GridComponent.propTypes = {
    onRemoveProduct: PropTypes.func,
    selectedProducts: PropTypes.array,
    numberOfItems: PropTypes.number,
};

const ProductCard = ({ selectedProducts = [], onRemoveProduct = f => f, }) => {
    return (
        <div className="product-wrap flex-1 m-lr-auto flex flex-jc flex-ac b-r4">
            <GridComponent selectedProducts={selectedProducts} onRemoveProduct={onRemoveProduct} />
        </div>
    )
}

ProductCard.propTypes = {
    onRemoveProduct: PropTypes.func,
    selectedProducts: PropTypes.array,
};

export default ProductCard
