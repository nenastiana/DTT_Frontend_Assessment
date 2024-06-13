import { createStore } from 'vuex';
import { service } from './service';

export default createStore({
  state: {
    favoriteHouses: new Set(JSON.parse(localStorage.getItem('favoriteHouses'))) || new Set(),
    viewedHouses: new Set(JSON.parse(localStorage.getItem('viewedHouses'))) || new Set(),
    imageFile: new FormData(),
    housesData: null,
    selectedHouse: null,
    searchQuery: '',
    sortOrder: null,
    showModal: false,
    currentHouseId: null
  },
  mutations: {
    SET_HOUSES_DATA(state, data) {
      state.housesData = data;
    },
    DELETE_HOUSE(state, id) {
      state.housesData = state.housesData.filter((house) => house.id !== id);
      state.selectedHouse = null;
    },
    SET_SELECTED_HOUSE(state, houses) {
      const house = houses[0];
      const houseNewFormat = {
        id: house.id,
        image: house.image,
        price: house.price,
        bedrooms: house.rooms.bedrooms,
        bathrooms: house.rooms.bathrooms,
        size: house.size,
        streetName: house.location.street,
        houseNumber: house.location.houseNumber,
        numberAddition: house.location.houseNumberAddition,
        city: house.location.city,
        zip: house.location.zip,
        constructionYear: house.constructionYear,
        hasGarage: house.hasGarage,
        description: house.description,
        madeByMe: house.madeByMe
      };
      state.selectedHouse = houseNewFormat;
    },
    UPDATE_HOUSE_IMAGE(state, imageUrl) {
      if (state.selectedHouse) {
        state.selectedHouse.image = imageUrl;
      }
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
    SET_SEARCH_ORDER(state, order) {
      state.sortOrder = order;
    },
    OPEN_MODAL(state, houseId) {
      state.showModal = true;
      state.currentHouseId = houseId;
    },
    CLOSE_MODAL(state) {
      state.showModal = false;
      state.currentHouseId = null;
    },
    ADD_TO_FAVORITES(state, houseId) {
      state.favoriteHouses.add(houseId);
      localStorage.setItem('favoriteHouses', JSON.stringify(Array.from(state.favoriteHouses)));
    },
    REMOVE_FROM_FAVORITES(state, houseId) {
      state.favoriteHouses.delete(houseId);
      localStorage.setItem('favoriteHouses', JSON.stringify(Array.from(state.favoriteHouses)));
    },
    ADD_VIEWED_HOUSE(state, houseId) {
      state.viewedHouses.add(houseId);
      localStorage.setItem('viewedHouses', JSON.stringify(Array.from(state.viewedHouses)));
    },
    SET_IMAGE_FILE(state, file) {
      state.imageFile.append('image', file);
    },
    CLEAR_IMAGE_FILE(state) {
      state.imageFile = new FormData();
    }
  },
  actions: {
    async fetchHousesData({ commit }) {
      try {
        const data = await service.fetchHousesData();
        commit('SET_HOUSES_DATA', data);
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    },
    async deleteHouse({ commit }, id) {
      try {
        await service.deleteHouse(id);
        commit('DELETE_HOUSE', id);
      } catch (error) {
        console.error('Error deleting house:', error);
        throw error;
      }
    },
    async fetchHouseById({ commit }, id) {
      try {
        const data = await service.fetchHouseById(id);
        commit('SET_SELECTED_HOUSE', data);
      } catch (error) {
        console.error('Error fetching house by ID:', error);
        throw error;
      }
    },
    async updateHouse({ dispatch }, payload) {
      try {
        const data = await service.updateHouse(payload.id, payload.houseForm);
        if (payload.imageFile) {
          await dispatch('uploadImage', { imageFile: payload.imageFile, id: payload.id });
        }
        return data;
      } catch (error) {
        console.error('Error updating house:', error);
        throw error;
      }
    },
    async createHouse({ dispatch }, payload) {
      try {
        const data = await service.createHouse(payload.houseForm);
        const id = data.id;
        if (payload.imageFile) {
          await dispatch('uploadImage', { imageFile: payload.imageFile, id: id });
        }
        return id;
      } catch (error) {
        console.error('Error creating house:', error);
        throw error;
      }
    },
    async uploadImage({ commit }, imageUploadData) {
      try {
        const data = await service.uploadImage(imageUploadData.id, imageUploadData.imageFile);
        commit('UPDATE_HOUSE_IMAGE', data.imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
    },
    setSearchQuery({ commit }, query) {
      commit('SET_SEARCH_QUERY', query);
    },
    setSortOrder({ commit }, order) {
      commit('SET_SEARCH_ORDER', order);
    },
    openModal({ commit }, houseId) {
      commit('OPEN_MODAL', houseId);
    },
    addToFavorites({ commit }, houseId) {
      commit('ADD_TO_FAVORITES', houseId);
    },
    removeFromFavorites({ commit }, houseId) {
      commit('REMOVE_FROM_FAVORITES', houseId);
    },
    addToViewed({ commit }, houseId) {
      commit('ADD_VIEWED_HOUSE', houseId);
    },
    setImageFile({ commit }, imageFile) {
      commit('SET_IMAGE_FILE', imageFile);
    },
    clearImageFile({ commit }) {
      commit('CLEAR_IMAGE_FILE');
    }
  },
  getters: {
    housesData(state) {
      return state.housesData;
    },
    getHouseById: (state) => (id) => {
      return state.housesData.find((house) => house.id === id);
    },
    selectedHouse(state) {
      return state.selectedHouse;
    },
    showModal: (state) => state.showModal,
    searchQuery: (state) => state.searchQuery,
    sortOrder: (state) => state.sortOrder,
    filteredHouses(state) {
      let filtered = [];

      if (state.housesData !== null) {
        filtered = state.housesData.slice();

        if (state.searchQuery) {
          const query = state.searchQuery.toLowerCase();
          filtered = filtered.filter((house) => {
            return (
              house.location.houseNumber.toString().includes(query) ||
              house.location.street.toLowerCase().includes(query) ||
              house.location.city.toLowerCase().includes(query) ||
              house.price.toString().includes(query) ||
              house.size.toString().includes(query)
            );
          });
        }

        if (state.sortOrder === 'price') {
          filtered.sort((a, b) => a.price - b.price);
        } else if (state.sortOrder === 'size') {
          filtered.sort((a, b) => a.size - b.size);
        }
      }

      return filtered;
    },
    resultsCount(state, getters) {
      return getters.filteredHouses.length;
    },
    imageFile: (state) => state.imageFile
  }
});
