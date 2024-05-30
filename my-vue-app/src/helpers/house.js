function createHouseForm(house) {
  return {
    price: house ? house.value.price : '',
    bedrooms: house ? house.value.rooms.bedrooms : '',
    bathrooms: house ? house.value.rooms.bathrooms : '',
    size: house ? house.value.size : '',
    streetName: house ? house.value.location.street : '',
    houseNumber: house ? house.value.location.houseNumber : '',
    numberAddition: house ? house.value.location.houseNumberAddition : '',
    city: house ? house.value.location.city : '',
    zip: house ? house.value.location.zip : '',
    constructionYear: house ? house.value.constructionYear : '',
    hasGarage: house ? house.value.hasGarage : '',
    description: house ? house.value.description : ''
  };
}

function isValidHouse(house) {
  if (!house || !house.value) {
    return false;
  }
  const year = parseInt(house.value.constructionYear, 10);
  return (
    house.value.price &&
    house.value.rooms.bedrooms &&
    house.value.rooms.bathrooms &&
    house.value.size &&
    house.value.location.street &&
    house.value.location.houseNumber &&
    house.value.location.city &&
    house.value.location.zip &&
    house.value.constructionYear &&
    year >= 1901 && 
    house.value.description
  );
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

export { createHouseForm, isValidHouse, isValidHouseForm };
