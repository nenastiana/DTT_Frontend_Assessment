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
}

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
}

export { createHouseForm, isValidHouseForm };
