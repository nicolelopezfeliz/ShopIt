import {IShoppingCartItem, ShoppingItemType} from "../../contexts/ShoppingContext";

export interface IShoppingValidator {
    amount: boolean,
    description: boolean,
    name: boolean,
    formValid: boolean,
}

export default class Validator {

    validateFields(item: IShoppingCartItem): IShoppingValidator {
        const amountIsValid = isValidAmount(item.type, item.amount)
        const nameIsValid = isValidName(item.title)


        console.log(amountIsValid)
        console.log(nameIsValid)

        const isFormValid = [amountIsValid, nameIsValid].filter(b => b === false).length === 0

        return {
            amount: amountIsValid,
            description: true,
            name: nameIsValid,
            formValid: isFormValid
        } as IShoppingValidator
    }

}

function isValidAmount(type: ShoppingItemType, amount: number): boolean {

    if (type === ShoppingItemType.integrated) {

        console.log(isBetween(amount, 1500, 2600))
        const boolArray = [isBetween(amount, 1500, 2600)]
        const isValid = boolArray.filter(b => b === false).length === 0
        return isValid

    } else {

        const boolArray = [isAboveMin(amount, 1)]
        const isValid = boolArray.filter(b => b === false).length === 0
        return isValid
    }
}

function isValidName(name: string): boolean {
    const boolArray = [isMinLength(name)]
    return boolArray.filter(b => b === false).length === 0
}

function isMinLength(value: any): boolean {
    return value.length >= 1
}

function isBetween(value: number, min: number, max: number): boolean {
    return value >= min && value <= max
}

function isAboveMin(value: number, min: number): boolean {
    return (value >= min)
}

