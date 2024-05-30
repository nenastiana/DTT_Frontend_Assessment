import { ref } from 'vue';

const imageUrl = ref(null);
const imageFile = new FormData();

const handleImageUploadFromComputer = (event) => {
  const file = event.target.files[0];
  imageFile.append('image', file);
  const reader = new FileReader();
  reader.onload = (e) => {
    imageUrl.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

export { handleImageUploadFromComputer, imageUrl, imageFile };
