import { useMemo } from "react"
import ProductCard from "@/components/ProductCard/ProductCard"
import Autocomplete from "@/components/AutoComplete/AutoComplete"
import useAutoComplete from "@/components/AutoComplete/useAutoComplete"
import { SELECT_KEY, VALUE_KEY, LABEL_KEY } from "@/constants/autocomplete.constants"
import { PRODUCTS } from "./product.constants"
import './ProductSelection.scss'
import Badge from "@/components/Badge/Badge"
import Button from "@/components/Button/Button"
import { BUTTON_VARIANT } from "@/components/Button/Button.constants"

const INITIAL_STATE = (options) => options.map((option) => ({ ...option, isSelected: false }))
const AUTO_COMPLETE_PARAMS = { options: INITIAL_STATE(PRODUCTS), labelKey: LABEL_KEY, valueKey: VALUE_KEY, selectKey: SELECT_KEY }

const ProductSelection = () => {
  const { filteredOptions: selectedProducts, onSelect, onSearch, updateOptions } = useAutoComplete(AUTO_COMPLETE_PARAMS)
  const onRemoveProduct = (removedOption) => {
    const updatedOptions = selectedProducts.map((option) => option[VALUE_KEY] === removedOption[VALUE_KEY] ? { ...option, [SELECT_KEY]: false } : option)
    updateOptions(updatedOptions)
  }

  const sortedProducts = useMemo(() => {
    return [...selectedProducts].sort((a, b) => b[SELECT_KEY] - a[SELECT_KEY])
  }, [selectedProducts])

  const noOfProducts = () => selectedProducts.filter((product) => product[SELECT_KEY]).length
  return (
    <section className="flex production-selection-wrap h-100-p flex-ac m-lr-auto">
      <div className="flex-1">
        <ProductCard selectedProducts={sortedProducts} onRemoveProduct={onRemoveProduct} />
        <div className="text-center text-grey m-t-14">{`${noOfProducts()} products added`}</div>
      </div>
      <div className="flex-1">
        <div className="right-wrap m-lr-auto">
          <Badge text="1 of 3" classes='m-b-14'/>
          <div className="dialog-wrap">
            <div className="f-24 m-b-14">Let's add your internal tool</div>
            <div className="text-black-light f-lh-14 f-14 m-b-24">
              <div>Search to quickly add products your team uses today.</div>
              You'll be able to add as many as you need later but for now let's add four
            </div>
            </div>
          <Autocomplete  options={selectedProducts} onSelect={onSelect} onSearch={onSearch} valueKey={VALUE_KEY} selectKey={SELECT_KEY} labelKey={LABEL_KEY} />
          <Button disabled={!noOfProducts()} classes='w-100-p m-t-24' variant={BUTTON_VARIANT.DEFAULT}><Button.Text classes="w-100-p" text="Next" /></Button>
        </div>
      </div>
    </section>)
}

export default ProductSelection
