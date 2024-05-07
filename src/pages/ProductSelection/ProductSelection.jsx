import ProductCard from "@/components/ProductCard/ProductCard"
import { useState, useReducer } from "react"
import { PRODUCTS } from "./product.constants"
import Autocomplete from "@/components/AutoComplete/AutoComplete"
import { SELECT_KEY, VALUE_KEY, LABEL_KEY } from "@/constants/autocomplete.constants"
import './ProductSelection.scss'

//TOD0: make this constants to be use everywhere
// const SELECT_KEY = 'isSelected'
// const LABEL_KEY = 'label'
// const VALUE_KEY = 'value'

function autoCompleteReducer(state, action) {
  if (action.type === 'update') {
      console.log('update called', action)
    return action.payload;
  }
  throw Error('Unknown action.');
}

const INITIAL_STATE = (options) => options.map((option) => ({ ...option, isSelected: false }))
const ProductSelection = () => {
  const [selectedProducts, updateSelectedProducts] = useReducer(autoCompleteReducer, INITIAL_STATE(PRODUCTS));
  // const [selectedProducts, updateSelectedProducts] = useState(() => INITIAL_STATE(PRODUCTS))

  const onSelect = (valueKey, selectedOption) => {
    const payload = selectedProducts.map((product) => product[VALUE_KEY] === valueKey ? selectedOption: product)
    updateSelectedProducts({ type: 'update', payload})
    // updateSelectedProducts(selectedProducts.map((product) => product[VALUE_KEY] === valueKey ? selectedOption: product))
  }

  // the label key has to come from a constant
  const onRemoveProduct = (product) => {
    const newListOfProducts = selectedProducts.map((selectedProduct) => product.label === selectedProduct.label ? { ...selectedProduct, [SELECT_KEY]: !selectedProduct[SELECT_KEY] } : selectedProduct)
    updateSelectedProducts({ type: 'update', payload: newListOfProducts})
  }

  return (
    <section className="flex production-selection-wrap h-100-p flex-ac m-lr-auto">
      <div className="flex-1">
        <ProductCard selectedProducts={selectedProducts} onRemoveProduct={onRemoveProduct} />
        <div className="text-center text-grey m-t-14">{`${selectedProducts.length} products added`}</div>
      </div>
      <div className="flex-1">
        <div className="right-wrap m-lr-auto">
          <div className="dialog-wrap">
            <div className="f-24 m-b-14">Let's add your internal tool</div>
            <div className="f-14 ">Search to quickly add products your team uses today.</div>
            <div className="f-14 m-b-24 ">You'll be able to add as many as you need later but for now let's add four</div>
          </div>
          <Autocomplete options={selectedProducts} onSelect={onSelect} valueKey={VALUE_KEY} selectKey={SELECT_KEY} labelKey={LABEL_KEY} reducer={autoCompleteReducer} />
        </div>
      </div>
    </section>)
}

export default ProductSelection
