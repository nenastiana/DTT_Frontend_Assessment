<!--It's a form component for entering house information. Upon form submission, 
it checks if all required fields are completed and, if valid, calls the submitForm function,
otherwise validation error is shown. -->

<template>
    <form @submit.prevent="submitFormFunc">

        <div>
            <label for="street">Street name*</label>
            <input id="street" v-model="houseForm.streetName" placeholder="Enter street name"
                :class="{ 'error-input': !houseForm.streetName && showError }" />
            <span v-if="!houseForm.streetName && showError" class="error-message">Required field missing</span>
        </div>

        <div class="form-row">
            <div class="form-field">
                <label for="houseNumber">House number*</label>
                <input id="houseNumber" type="number" v-model="houseForm.houseNumber"
                    :class="{ 'error-input': !houseForm.houseNumber && showError }" placeholder="Enter house number" />
                <span v-if="!houseForm.houseNumber && showError" class="error-message">Required field missing</span>
            </div>
            <div class="form-field">
                <label for="houseNumberAddition">Addition (optional)</label>
                <input id="houseNumberAddition" v-model="houseForm.numberAddition" placeholder="eg.A" />
            </div>
        </div>

        <div>
            <label for="zip">Postal code*</label>
            <input id="zip" v-model="houseForm.zip" :class="{ 'error-input': !houseForm.zip && showError }"
                placeholder="eg. 1000 AA" />
            <span v-if="!houseForm.zip && showError" class="error-message">Required field missing</span>
        </div>

        <div>
            <label for="city">City*</label>
            <input id="city" v-model="houseForm.city" :class="{ 'error-input': !houseForm.city && showError }"
                placeholder="eg. Utrecht" />
            <span v-if="!houseForm.city && showError" class="error-message">Required field missing</span>
        </div>

        <UploadImage :initialImageUrl="houseForm.image" />

        <div>
            <label for="price">Price*</label>
            <input id="price" v-model="houseForm.price" :class="{ 'error-input': !houseForm.price && showError }"
                placeholder="eg. €150.000" />
            <span v-if="!houseForm.price && showError" class="error-message">Required field missing</span>
        </div>

        <div class="form-row">
            <div class="form-field">
                <label for="size">Size*</label>
                <input id="size" v-model="houseForm.size" :class="{ 'error-input': !houseForm.size && showError }"
                    placeholder="eg. 60m2" />
                <span v-if="!houseForm.size && showError" class="error-message">Required field missing</span>
            </div>

            <div class="form-field">
                <label for="hasGarage">Garage*</label>
                <select id="hasGarage" v-model="houseForm.hasGarage"
                    :class="{ 'error-input': !houseForm.hasGarage && showError }">
                    <option disabled value="">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                <span v-if="!houseForm.hasGarage && showError" class="error-message">Required field missing</span>
            </div>
        </div>

        <div class="form-row">
            <div class="form-field">
                <label for="bedrooms">Bedrooms*</label>
                <input id="bedrooms" v-model="houseForm.bedrooms"
                    :class="{ 'error-input': !houseForm.bedrooms && showError }" placeholder="Enter amount" />
                <span v-if="!houseForm.bedrooms && showError" class="error-message">Required field missing</span>
            </div>
            <div class="form-field">
                <label for="bathrooms">Bathrooms*</label>
                <input id="bathrooms" v-model="houseForm.bathrooms"
                    :class="{ 'error-input': !houseForm.bathrooms && showError }" placeholder="Enter amount" />
                <span v-if="!houseForm.bathrooms && showError" class="error-message">Required field missing</span>
            </div>
        </div>

        <div>
            <label for="constructionYear">Construction date*</label>
            <input id="constructionYear" v-model="houseForm.constructionYear"
                :class="{ 'error-input': (!houseForm.constructionYear && showError) }" placeholder="e.g. 1990" />
            <span v-if="(!houseForm.constructionYear || parseInt(houseForm.constructionYear) < 1901) && showError"
                class="error-message"> Invalid year, must be more than 1901 </span>
        </div>

        <div>
            <label for="description">Description:</label>
            <input id="description" v-model="houseForm.description"
                :class="{ 'error-input': !houseForm.description && showError }" placeholder="Enter description" />
            <span v-if="!houseForm.description && showError" class="error-message">Required field missing</span>
        </div>
        <div class="button-container">
            <button type="submit" :class="{ 'valid-form': isValidHouseForm(houseForm) }">
                {{ buttonText }}
            </button>
        </div>

    </form>
</template>

<script setup>
import { ref } from 'vue';

import UploadImage from '../components/UploadImage.vue';

const props = defineProps({
    buttonText: {
        type: String,
        default: null
    },
    submitForm: {
        type: Function,
        required: true
    },
    house: {
        type: Object
    }
});

const house = props.house;
const houseForm = ref(createHouseForm(house));
const showError = ref(false);

// Function that generates a form object for creating or editing house 
function createHouseForm(house) {
    return {
        price: house ? house.price : '',
        image: house ? house.image : '',
        bedrooms: house ? house.bedrooms : '',
        bathrooms: house ? house.bathrooms : '',
        size: house ? house.size : '',
        streetName: house ? house.streetName : '',
        houseNumber: house ? house.houseNumber : '',
        numberAddition: house ? house.numberAddition : '',
        city: house ? house.city : '',
        zip: house ? house.zip : '',
        constructionYear: house ? house.constructionYear : '',
        hasGarage: house ? house.hasGarage : '',
        description: house ? house.description : ''
    };
};

function isValidHouseForm(houseForm) {
    if (!houseForm || !houseForm.value) {
        return false;
    }
    const year = parseInt(houseForm.value.constructionYear, 10);
    return (
        houseForm.value.price &&
        houseForm.value.bedrooms &&
        houseForm.value.bathrooms &&
        houseForm.value.size &&
        houseForm.value.streetName &&
        houseForm.value.houseNumber &&
        houseForm.value.city &&
        houseForm.value.zip &&
        houseForm.value.constructionYear &&
        year >= 1901 &&
        houseForm.value.description
    );
};

const submitFormFunc = () => {
    showError.value = true;
    if (isValidHouseForm(houseForm)) {
        props.submitForm(houseForm);
    }
};

</script>
