enum General {
    yes = 'shopping-screen-dialog-text-yes',
    abort = 'shopping-screen-dialog-text-abort',
    askDeleteDescription = 'shopping-screen-dialog-ask-delete-description',
    askDeleteTitle = 'shopping-screen-dialog-ask-delete-title',
    emptyList = 'shopping-screen-empty-list',
}

enum LoginScreen {
    passwordText = 'login-screen-password-text',
    loginBtnText= 'login-screen-login-btn',
    registerBtnText= 'login-screen-register-btn'
}

enum RegisterScreen {
    firstNameText= 'register-screen-first-name-text',
    lastNameText= 'register-screen-last-name-text',
    passwordText= 'register-screen-password-text',
    repeatPasswordText= 'register-screen-repeat-password-text',
    alertText= 'register-screen-alert-text'
}

enum ShoppingItemForm {
    screenCaptionText= 'shopping-item-screen-screen-caption-text',
    productNameText= 'shopping-item-screen-product-name-text',
    placeholderProductNameText= 'shopping-item-screen-placeholder-product-name-text',
    productDescriptionLabelText= 'shopping-item-screen-product-description-label-text',
    productDescriptionPlaceholder= 'shopping-item-screen-product-description-placeholder',
    dropdownBtnText= 'shopping-item-screen-dropdown-btn-text',
    peripheralDropdownLabelText= 'shopping-item-screen-peripheral-dropdown-label-text',
    peripheralDropdownPlaceholderPriceText= 'shopping-item-screen-peripheral-dropdown-placeholder-text',
    integratedDropdownLabelText= 'shopping-item-screen-integrated-dropdown-label-text',
    integratedDropdownPlaceholderPriceText= 'shopping-item-screen-integrated-dropdown-placeholder-text',
    peripheralBtnText= 'shopping-item-screen-peripheral-btn-text',
    integratedBtnText= 'shopping-item-screen-integrated-btn-text',
    cancelBtnText= 'shopping-item-screen-cancel-btn-text',
    saveBtnText= 'shopping-item-screen-save-btn-text',
    update= 'shopping-item-screen-update',
    validationNameInvalid= 'shopping-item-screen-validation-name-invalid',
    validationDescriptionInvalid= 'shopping-item-screen-validation-description-invalid',
    validationAmountInvalid= 'shopping-item-screen-validation-amount-invalid',
}

export const tokens = {
    screens: {
        general: General,
        loginScreen: LoginScreen,
        registerScreen: RegisterScreen,
        shoppingItemForm: ShoppingItemForm
    }
}
